package main

import (
	"embed"
	"gogo/lorca"
	"io/fs"
	"log"
	"mime"
	"net"
	"net/http"
	"net/http/httputil"
	"os"
	"os/exec"
	"os/signal"
	"path/filepath"
	"runtime"
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
		//tmp, err := os.MkdirTemp("", "gogo_files")
		//if err != nil {
		//	log.Println("getTmpUploadFilesDir error", err)
		//	return
		//}
		//TEMP_FILES_DIR = tmp

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

var ui lorca.UI

func main() {

	mime.AddExtensionType(".js", "application/javascript")

	//open browser window.
	if os.Getenv("IN_DOCKER") == "" {
		//check if there is another app running

		// open ui window
		args := []string{}
		if runtime.GOOS == "linux" {
			args = append(args, "--class=gogo")
		}
		tmpui, err := lorca.New("data:text/html,"+shellHtml, filepath.Join(os.TempDir(), "gogo"), 800, 600, args...)
		if err != nil {
			log.Fatal(err)
			return
		}
		ui = tmpui
	}

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
		//already has a app running , notify him to kill himself.
		http.Get("http://127.0.0.1:9999/api/killself")
		ln, err = net.Listen("tcp", "0.0.0.0:9999")

	}
	if err != nil {
		log.Println("cant startup ,because 9999 port is used by other app.")
		ui.Close()
		log.Fatal(err)
	}

	//get port
	log.Println("Using port:", ln.Addr().(*net.TCPAddr).Port)

	go http.Serve(ln, nil)

	//startup python web server
	if os.Getenv("START_PYTHON_SERVER") == "1" {
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

	// Wait until the interrupt signal arrives or browser window is closed
	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc, os.Interrupt, os.Kill)
	if ui != nil {
		select {
		case <-sigc:
		case <-ui.Done():
		}
	} else {
		select {
		case <-sigc:
		}
	}

	log.Println("exiting...")

	//关闭服务器
	ln.Close()
	log.Println("server existed...")

	if ui != nil {
		//关闭ui窗口
		ui.Close()
		log.Println("ui window existed...")
	}

	//CLEAN temp files dir
	//os.RemoveAll(TEMP_FILES_DIR)
	//log.Println("removed TEMP_FILES_DIR: ", TEMP_FILES_DIR)

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
