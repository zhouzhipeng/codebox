package main

import (
	"embed"
	"github.com/skratchdot/open-golang/open"
	"io/fs"
	"log"
	"mime"
	"net"
	"net/http"
	"net/http/httputil"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
	"time"
)

//go:embed static
var static embed.FS

//go:embed static/shell.html
var shellHtml string

//存放临时上传的文件(窗口关闭后删除）
var TEMP_FILES_DIR = ""

func genTmpUploadFilesDir() {
	if os.Getenv("IN_DOCKER") == "" {
		TEMP_FILES_DIR = filepath.Join(os.TempDir(), "gogo_files")
	} else {
		//run in docker or linux , use /tmp
		TEMP_FILES_DIR = "/tmp"
	}

	os.Mkdir(TEMP_FILES_DIR, 0777)

	if os.Getenv("DISABLE_LOG_FILE") == "" {
		//设置log输出到文件
		file := filepath.Join(TEMP_FILES_DIR, "message.txt")
		logFile, err := os.OpenFile(file, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0777)
		if err != nil {
			log.Println(err)
			return
		}
		log.SetOutput(logFile) // 将文件设置为log输出的文件
		log.SetPrefix("[gogo]")
		log.SetFlags(log.LstdFlags | log.Lshortfile | log.LUTC)

	}

	log.Println("temp files dir :", TEMP_FILES_DIR)

}

func main() {

	mime.AddExtensionType(".js", "application/javascript")

	//创建临时文件目录
	genTmpUploadFilesDir()

	//首页
	http.HandleFunc("/", indexPage)

	//http & file server
	fsys, _ := fs.Sub(static, "static")
	http.Handle("/static/", NoCache(http.StripPrefix("/static/", http.FileServer(http.FS(fsys)))))

	//绑定视图模板
	http.HandleFunc("/views/", handleTemplates)

	//处理api请求
	http.HandleFunc("/api/", handleAPI)

	//反向代理请求到python服务器
	http.HandleFunc("/py/",
		func(writer http.ResponseWriter, request *http.Request) {
			proxy := httputil.ReverseProxy{
				Director: func(request *http.Request) {
					//rewrite url
					request.URL.Scheme = "http"
					request.URL.Host = "127.0.0.1:8086"
					//request.URL.Path = request.URL.Path[len("/py"):]

					// Delete any ETag headers that may have been set
					for _, v := range etagHeaders {
						if request.Header.Get(v) != "" {
							request.Header.Del(v)
						}
					}
				},
			}

			proxy.ModifyResponse = func(r *http.Response) error {

				// Set our NoCache headers
				for k, v := range noCacheHeaders {
					r.Header.Set(k, v)
				}

				return nil

			}

			proxy.ServeHTTP(writer, request)
		})

	//反向代理请求到python sqlite_web服务器
	http.HandleFunc("/sqlite-web/",
		func(writer http.ResponseWriter, request *http.Request) {
			proxy := httputil.ReverseProxy{
				Director: func(request *http.Request) {
					//rewrite url
					request.URL.Scheme = "http"
					request.URL.Host = "127.0.0.1:8087"
					//request.URL.Path = request.URL.Path[len("/sqlite-web"):]
				},
			}

			proxy.ModifyResponse = func(response *http.Response) error {
				if response.StatusCode == 301 || response.StatusCode == 302 {
					location := response.Header.Get("location")
					log.Println("location header is : " + location)
					response.Header.Set("location", strings.Replace(location, "http:", "https:", 1))
				}

				return nil
			}

			proxy.ServeHTTP(writer, request)

		})

	//处理文件下载
	http.Handle("/files/", NoCache(http.StripPrefix("/files/", http.FileServer(http.Dir(TEMP_FILES_DIR)))))

	ln, err := net.Listen("tcp", "0.0.0.0:9999")

	if err != nil {
		log.Println("cant startup ,because 9999 port is used by other app.")
		log.Println("port 9999 is using, sending kill command...")

		http.Get("http://127.0.0.1:9999/api/killself")

		ln, err = net.Listen("tcp", "0.0.0.0:9999")
	}

	if err != nil {
		log.Fatal("start failed, port is in using!")
	}

	//get port
	//log.Println("Using port:", ln.Addr().(*net.TCPAddr).Port)

	go http.Serve(ln, nil)

	// open web page
	open.Run("http://127.0.0.1:9999")

	//startup python web server
	startPythonServer()

	//load ui
	LoadUI()

}

func startPythonServer() {
	if os.Getenv("DONT_START_PY") != "" {
		log.Println("DONT_START_PY is true , ignored starting python server.")
		return
	}

	//kill python web server
	if IsPortInUse(8086) {
		log.Println("port 8086 is using, sending kill command...")
		http.Get("http://127.0.0.1:8086/py/api/killself")
	}

	ex, err := os.Executable()
	if err != nil {
		log.Println(err)
		return
	}
	cwd := filepath.Dir(ex)
	log.Println(" cwd is " + cwd)

	switch runtime.GOOS {
	case "darwin":
		pyWebPath := filepath.Join(cwd, "web")
		if os.Getenv("PY_WEB_PATH") != "" {
			pyWebPath = os.Getenv("PY_WEB_PATH")
		}
		cmd := exec.Command(pyWebPath)
		cmd.Stdout = log.Writer()
		cmd.Stderr = log.Writer()

		cmd.Env = os.Environ()
		cmd.Env = append(cmd.Env, "PYTHONUNBUFFERED=1")

		log.Println("python web server started")
		go cmd.Run()

	case "windows":
		pyWebPath := filepath.Join(cwd, "web.exe")
		if os.Getenv("PY_WEB_PATH") != "" {
			pyWebPath = os.Getenv("PY_WEB_PATH")
		}
		cmd := exec.Command(pyWebPath)
		cmd.Stdout = log.Writer()
		cmd.Stderr = log.Writer()

		cmd.Env = os.Environ()
		cmd.Env = append(cmd.Env, "PYTHONUNBUFFERED=1")

		log.Println("win python  web server started")
		go cmd.Run()
	default:
		cmd := exec.Command("python", "/app/web.py")
		cmd.Stdout = log.Writer()
		cmd.Stderr = log.Writer()

		log.Println("python web server started")
		go cmd.Run()

		//start sqlite_web server
		cmd2 := exec.Command("sqlite_web", "--port", "8087", "--url-prefix", "/sqlite-web", "/tmp/test.db")
		cmd2.Stdout = log.Writer()
		cmd2.Stderr = log.Writer()

		log.Println("sqlite_web server started")
		go cmd2.Run()

	}

}

var epoch = time.Unix(0, 0).Format(time.RFC1123)

var noCacheHeaders = map[string]string{
	"Expires":         epoch,
	"Cache-Control":   "no-cache, private, max-age=0",
	"Pragma":          "no-cache",
	"X-Accel-Expires": "0",
}

var etagHeaders = []string{
	"ETag",
	"If-Modified-Since",
	"If-Match",
	"If-None-Match",
	"If-Range",
	"If-Unmodified-Since",
}

func NoCache(h http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		// Delete any ETag headers that may have been set
		for _, v := range etagHeaders {
			if r.Header.Get(v) != "" {
				r.Header.Del(v)
			}
		}

		// Set our NoCache headers
		for k, v := range noCacheHeaders {
			w.Header().Set(k, v)
		}

		h.ServeHTTP(w, r)
	}

	return http.HandlerFunc(fn)
}

// 判断端口是否可以（未被占用）
func IsPortInUse(port int) bool {

	timeout := time.Second
	conn, err := net.DialTimeout("tcp", "127.0.0.1:"+strconv.Itoa(port), timeout)
	if err != nil {
		log.Println("Connecting error:", err)
		return false
	}
	if conn != nil {
		defer conn.Close()
	}

	return true
}
