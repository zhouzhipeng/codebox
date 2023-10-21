package main

import (
	_ "embed"
	"fmt"
	"github.com/asaskevich/govalidator"
	"github.com/skip2/go-qrcode"
	"net/url"
	"path"

	"github.com/gorilla/websocket"
	"html/template"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"os"
	"os/exec"
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

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

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
					data["msg"] = "open ok!"
				}

			} else {
				data["msg"] = "already set, restart app to reset!"
			}

		} else {
			data["showlink"] = false

		}

		data["path"] = MEDIA_PATH
		link := "/media/index"
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

	//common  proxy pass.
	if isEnableProxyPassTxt() {
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
				commonProxyPass(w, r, toServer)
				return
			}
		}
	}

	//handle NAT for *.proxy.*  domains.
	if isEnableNATProxy() {
		if handleNAT(w, r) {
			return
		}
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

type WSMessage struct {
	From string
	To   string
	Data string
}

var wsConnMap = make(map[string]*websocket.Conn)

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	// upgrade this connection to a WebSocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	log.Println("Client Connected")
	err = conn.WriteJSON(WSMessage{From: "{your unique id}", To: "{msg to whom,keep empty if broadcast}", Data: "{use the whole json template to send or receive messages}"})
	if err != nil {
		log.Println(err)
		return
	}

	msg := WSMessage{}
	err = conn.ReadJSON(&msg)
	if err != nil {
		log.Println(err)
		return
	}

	if msg.From == "" {
		log.Println("ws: From is empty , cant go on.")
		return
	}

	wsConnMap[msg.From] = conn

	conn.SetCloseHandler(func(code int, text string) error {
		log.Println("ws close : code = ", code, "text=", text)
		delete(wsConnMap, msg.From)
		return conn.Close()
	})
	for {
		// read in a message
		msg := WSMessage{}
		err := conn.ReadJSON(&msg)
		if err != nil {
			log.Println(err)
			continue
		}

		//resp, err := CallPyFuncWithJSON("sys_receive_ws_msg", msg)
		//log.Println("sys_receive_ws_msg : ", resp, " , err: ", err)

		if msg.To == "" {
			//broadcast msg
			for _, c := range wsConnMap {
				err := c.WriteJSON(msg)
				if err != nil {
					log.Println(err)
					continue
				}
			}

		} else {
			//forward msg to 'To'
			c, ok := wsConnMap[msg.To]
			if ok {
				err := c.WriteJSON(msg)
				if err != nil {
					log.Println(err)
					continue
				}
			} else {
				log.Println("msg.To not found:" + msg.To)
			}

		}

	}
}

func handleNormalHTTP(w http.ResponseWriter, r *http.Request) {
	//log.Println("request in >>  url : ", r.URL.Path)
	if r.URL.Path == "/" {
		handleIndexPage(w)
	} else if r.URL.Path == "/ws" {
		handleWebSocket(w, r)
	} else if strings.HasPrefix(r.URL.Path, "/config") {
		proxyConfig(w, r)
	} else if r.URL.Path == "/files/message.txt" {
		dat, _ := os.ReadFile(path.Join(BASE_DIR, "message.txt"))
		w.Write(dat)
	} else if r.URL.Path == "/files/python.txt" {
		dat2, _ := os.ReadFile(path.Join(BASE_DIR, "python.txt"))
		w.Write(dat2)
	} else if strings.HasPrefix(r.URL.Path, "/api/") {
		//check permission
		if checkPermission(w, r) {
			return
		}

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
		fullPath := r.URL.Path
		if r.URL.RawQuery != "" {
			fullPath += "?" + r.URL.RawQuery
		}
		cachedProxyPy(fullPath, w)
	} else if strings.HasPrefix(r.URL.Path, "/media/") {
		if r.URL.Path == "/media/index" {
			func(writer http.ResponseWriter, request *http.Request) {
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
			}(w, r)
		} else {
			http.StripPrefix("/media/", http.FileServer(http.Dir(MEDIA_PATH))).ServeHTTP(w, r)
		}

	} else {
		w.WriteHeader(404)
		w.Write([]byte("404 Not Found. path : " + r.URL.Path))

	}
}

func checkPermission(w http.ResponseWriter, r *http.Request) bool {
	token := ""
	cookie, err := r.Cookie("token")
	if err == nil {
		token = cookie.Value
	}

	params := url.Values{}
	params.Add("token", token)
	resp, err := CallPyFunc("check_login_token", params)
	log.Println("check_login_token result : ", resp, " , err: ", err)
	hasPermission, _ := strconv.ParseBool(resp.Body)
	if !hasPermission {
		w.WriteHeader(403)
		w.Write([]byte("you have no permissions."))
		return true
	}
	return false
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
	uri := os.Getenv("HOME_PAGE_URI")
	if uri == "" {
		uri = "/pages/index"
	}

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
