package main

import (
	_ "embed"
	"fmt"
	"github.com/asaskevich/govalidator"
	"github.com/skip2/go-qrcode"
	"html/template"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"strconv"
	"strings"
	"time"
)

type Todo struct {
	Name        string
	Description string
}

type TodoPageData struct {
	PageTitle string
	Todos     []Todo
}

////go:embed views
//var views embed.FS

var MEDIA_PATH = ""

func handleTemplates(w http.ResponseWriter, r *http.Request) {

	switch r.URL.Path {

	case "/views/media_open":
		data := map[string]interface{}{}

		if r.Method == "POST" {
			if MEDIA_PATH == "" {

				r.ParseForm()
				MEDIA_PATH = r.FormValue("path")
				log.Println("media path is " + MEDIA_PATH)

				if _, err := os.Stat(MEDIA_PATH); os.IsNotExist(err) {
					// path/to/whatever does not exist
					data["showlink"] = false
					data["msg"] = "invalid path!"
				} else {

					http.Handle("/media/", http.StripPrefix("/media/", http.FileServer(http.Dir(MEDIA_PATH))))
					http.HandleFunc("/media/index", func(writer http.ResponseWriter, request *http.Request) {
						dirs, _ := ioutil.ReadDir(MEDIA_PATH)
						html := ""
						for _, info := range dirs {
							if !info.IsDir() || strings.HasPrefix(info.Name(), ".") {
								continue
							}
							html += fmt.Sprintf(`
				
<a href="%s" style="
    display: inline-block;    width: 200px;text-align: center;
">
					<img src="/static/img/folder.jpg" style="
    width: 200px;
    display: inline-block;
">
					<span style="
">%s</span>
					</a>
`, "/media/"+info.Name(), info.Name())
						}

						fmt.Fprintf(writer, html)
					})

					data["msg"] = "open ok!"

				}

			} else {
				data["msg"] = "already set, restart app to reset!"
			}

		} else {
			data["showlink"] = false

		}

		data["path"] = MEDIA_PATH
		link := "http://" + getLocalIPInternal() + ":" + GetMainPort() + "/media/index"
		data["link"] = link
		data["showlink"] = true

		output := filepath.Join(BASE_DIR, "qr.png")
		err := qrcode.WriteFile(link, qrcode.Medium, 256, output)

		data["qrcode"] = "/files/qr.png"

		log.Println(err)
		client := http.Client{
			Timeout: 2 * time.Second,
		}
		resp, err := client.Get("http://127.0.0.1:8086/pages/media_open")
		content, _ := ioutil.ReadAll(resp.Body)
		tmpl, err := template.New("test").Parse(string(content))
		tmpl.Execute(w, data)

	case "/views/video_thumbnail":
		data := map[string]interface{}{}

		if r.Method == "POST" {
			ExecPath := r.FormValue("ExecPath")
			VideoPath := r.FormValue("VideoPath")
			SecondsInput := r.FormValue("SecondsInput")

			//回显数据
			data["ExecPath"] = ExecPath
			data["VideoPath"] = VideoPath
			data["SecondsInput"] = SecondsInput

			go func() {
				os.Mkdir(filepath.Join(VideoPath, "images"), 0777)
				files, _ := ioutil.ReadDir(VideoPath)

				for _, fi := range files {

					if !fi.IsDir() && !strings.HasPrefix(fi.Name(), ".") && strings.HasSuffix(fi.Name(), ".mp4") {

						outputFile := filepath.Join(VideoPath, "images", fi.Name()+".jpg")

						if FileExist(outputFile) {
							log.Println("file " + fi.Name() + "  has already generated thumbnails. skipped!")
							return
						}
						cmd := exec.Command(ExecPath,
							"-i", filepath.Join(VideoPath, fi.Name()),
							"-ss", "00:"+SecondsInput+".000",
							"-vframes", "1",
							outputFile,
						)
						cmd.Stdout = log.Writer()
						cmd.Stderr = log.Writer()
						cmd.Run()

					}
				}

				//生成html
				ghtml := ""
				for _, fi := range files {
					if !fi.IsDir() && !strings.HasPrefix(fi.Name(), ".") && strings.HasSuffix(fi.Name(), ".mp4") {
						ghtml += fmt.Sprintf(`  
						<a href="%s" >
						<img src="%s" style="width: 600px" />
						</a>`, fi.Name(), filepath.Join("images", fi.Name()+".jpg"))
					}
				}

				os.WriteFile(filepath.Join(VideoPath, "index.html"), []byte(ghtml), 0777)

				log.Println("=========== completed generating video thumbnails =============")
			}()

			data["Msg"] = "处理中，请通过日志观察进度!"

		}

		client := http.Client{
			Timeout: 2 * time.Second,
		}
		resp, _ := client.Get("http://127.0.0.1:8086/pages/video_thumbnail")
		content, _ := ioutil.ReadAll(resp.Body)
		tmpl, _ := template.New("test").Parse(string(content))
		tmpl.Execute(w, data)

	default:
		w.WriteHeader(404)
	}

}

//go:embed index.html
var staticPage string

var requestMap = make(map[string]*http.Request)
var responseMap = make(map[string]chan Resp)

var dnsTxtCache = make(map[string]string)

func router(w http.ResponseWriter, r *http.Request) {

	//check if ssl cert is ready , then redirect to https port

	if handle301(w, r) {
		return
	}

	//common reverse proxy.
	if govalidator.IsDNSName(r.Host) {
		//query txt

		toServer, has := dnsTxtCache[r.Host]

		if !has {
			resp, _ := CallPyFuncRaw("parse_dns_txt", "domain="+r.Host)
			log.Println("parse-dns-txt response: ", resp)

			if resp.Status == 200 {
				log.Println("txt record for : ", r.Host, ", txt :  ", resp.Body)

				toServer = resp.Body

				toServer = strings.TrimSpace(toServer)

				if toServer != "" {

					//check valid config
					conn, err := net.DialTimeout("tcp", toServer, time.Millisecond*time.Duration(1000))

					if err != nil {
						log.Println("to server dial error ", toServer, " --> ", err)
						toServer = ""
					} else {
						conn.Close()
					}

				}

				dnsTxtCache[r.Host] = toServer
			}
		}

		if toServer != "" {
			commonReverseProxy(w, r, toServer)
			return
		}
	}

	//handle NAT for *.proxy.*  domains.
	if handleNAT(w, r) {
		return
	}

	//normal http handling.
	handleNormalHTTP(w, r)
}

func handle301(w http.ResponseWriter, r *http.Request) bool {
	if getAutoRedirectHTTPS() &&
		!strings.HasPrefix(r.RemoteAddr, "127.0.0.1") &&
		(r.Header.Get("x-request-from") != "local") &&
		r.TLS == nil && (r.Method == "GET" || r.Method == "HEAD") && govalidator.IsDNSName(r.Host) {

		if _, err := os.Stat(filepath.Join(getCertCacheDir(), r.Host)); err == nil {
			r.URL.String()
			httpsUrl := "https://" + r.Host + r.URL.RequestURI()
			log.Println("domain cert file  exists, ready to redirect to :", httpsUrl)

			http.Redirect(w, r, httpsUrl, 301)
			return true
		}
	}
	return false
}

func handleNormalHTTP(w http.ResponseWriter, r *http.Request) {
	//log.Println("request in >>  url : ", r.URL.Path)
	if r.URL.Path == "/" {
		handleIndexPage(w)
	} else if r.URL.Path == "/files/message.txt" {
		dat, _ := os.ReadFile(path.Join(BASE_DIR, "message.txt"))
		dat2, _ := os.ReadFile(path.Join(BASE_DIR, "python.txt"))
		w.Write(append(dat, dat2...))
	} else if strings.HasPrefix(r.URL.Path, "/api/") {
		handleAPI(w, r)
	} else if strings.HasPrefix(r.URL.Path, "/views/") {
		handleTemplates(w, r)
	} else if strings.HasPrefix(r.URL.Path, "/git/") {
		ServeGitHTTP(w, r)
	} else if strings.HasPrefix(r.URL.Path, "/pages/private/") ||
		strings.HasPrefix(r.URL.Path, "/static/private/") ||
		strings.HasPrefix(r.URL.Path, "/functions/") ||
		strings.HasPrefix(r.URL.Path, "/tables/") ||
		strings.HasPrefix(r.URL.Path, "/files/") {
		proxyPy(w, r)
	} else if strings.HasPrefix(r.URL.Path, "/pages/") ||
		strings.HasPrefix(r.URL.Path, "/static/") {

		cachedProxyPy(r.URL.Path, w)
	} else {
		w.WriteHeader(404)
		w.Write([]byte("404 Not Found. path : " + r.URL.Path))

	}
}

func handleNAT(w http.ResponseWriter, r *http.Request) bool {
	if strings.Contains(r.Host, ".proxy.") {
		//use NAT
		domain := strings.Split(r.Host, ":")[0]
		reqId := domain + "/" + strconv.FormatInt(time.Now().UnixNano(), 10)

		c := make(chan Resp)

		requestMap[reqId] = r
		responseMap[reqId] = c

		//log.Println("requestmap >> ", requestMap)

		defer delete(requestMap, reqId)
		defer delete(responseMap, reqId)

		//t1 := time.Now()
		timerC := time.After(10 * time.Second)

		select {
		case res := <-c:
			//log.Println("request proxy finished")
			for k, v := range res.Headers {
				w.Header().Set(k, v)
			}

			w.Header().Set("x-nat", "1")
			w.WriteHeader(res.Status)
			w.Write([]byte(res.Body))
		case <-timerC:
			//t2 := time.Now()
			log.Println("Timed out waiting for  uri: ", r.URL.Path)
			w.WriteHeader(502)
			w.Write([]byte("timeout."))
		}
		return true
	}
	//else if r.Host != "gogo.zhouzhipeng.com" && r.Host != "127.0.0.1:9999" && strings.Contains(r.RequestURI, "://") {
	//	proxy.ServeHTTP(w, r)
	//	return true
	//}
	return false
}

func handleIndexPage(w http.ResponseWriter) {
	uri := "/pages/index"
	if _, ok := staticCache[uri]; !ok {
		resp, err := doGet("http://127.0.0.1:8086" + uri)
		if err == nil {
			if resp.Status != 200 {
				w.Write([]byte(staticPage))
				return
			}
			staticCache[uri] = resp
		} else {
			log.Println("cachedProxyPy.error", err)
			w.Write([]byte(staticPage))
			return
		}
	}

	cachedProxyPy(uri, w)
}

func FileExist(path string) bool {
	_, err := os.Lstat(path)
	return !os.IsNotExist(err)
}
