package main

import (
	"bytes"
	_ "embed"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"
)

func fileUpload(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(32 << 20) //maxMemory

	file, handler, err := r.FormFile("upfile")

	filename := r.FormValue("filename")

	if err != nil {

		log.Println(err)
		w.WriteHeader(500)
		fmt.Fprintf(w, "SERVER ERROR!"+err.Error())

		return

	}

	defer file.Close()

	//os.Mkdir("./files/", 0777)
	fname := handler.Filename
	if filename != "" {
		fname = filename
	}
	f, err := os.OpenFile(filepath.Join(BASE_DIR, fname), os.O_WRONLY|os.O_CREATE, 0666)

	if err != nil {

		log.Println(err)
		w.WriteHeader(500)
		fmt.Fprintf(w, "SERVER ERROR!"+err.Error())

		return

	}

	io.Copy(f, file)

	fmt.Fprintf(w, "%s", "/files/"+fname)
}

//func getClipboardData(w http.ResponseWriter, r *http.Request) {
//	// Init returns an error if the package is not ready for use.
//	//err := clipboard.Init()
//	//if err != nil {
//	//	panic(err)
//	//}
//
//	data, _ := clipboard.ReadAll()
//	fmt.Fprintf(w, "%s", data)
//
//	/*
//		// write/read image format data of the clipboard, and
//		// the byte buffer regarding the image are PNG encoded.
//		clipboard.Write(clipboard.FmtImage, []byte("image data"))
//		clipboard.Read(clipboard.FmtImage)
//	*/
//}

func getLocalIP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, getLocalIPInternal())
}

func getLocalIPInternal() string {
	//获取ip
	addrs, err := net.InterfaceAddrs()

	if err != nil {
		log.Println(err)
		return "127.0.0.1"
	}
	for _, address := range addrs {

		// 检查ip地址判断是否回环地址
		if ipnet, ok := address.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				log.Println(ipnet.IP.String())
				return ipnet.IP.String()
			}

		}
	}
	return "127.0.0.1"
}

var natTicker = time.NewTicker(1 * time.Second)
var natIsRunning = false
var lastPulledDataTime = time.Now()
var natTickerDone = make(chan bool, 1)

//go:embed pytool/requirements.txt
var requirementsTxt string

func handleAPI(w http.ResponseWriter, r *http.Request) {
	//log.Println(r.URL.Path)

	switch r.URL.Path {
	case "/api/dump-static-cache":
		keys := make([]string, 0, len(staticCache))
		for k := range staticCache {
			keys = append(keys, k)
		}

		bb, _ := json.Marshal(keys)
		w.Write(bb)
	case "/api/clear-static-cache":
		uri := r.FormValue("uri")
		delete(staticCache, uri)
		// pre-warm
		go doGet("http://127.0.0.1:" + GetMainPort() + uri)
		w.Write([]byte("Ok."))
	case "/api/set-mail-blacklist-names":
		names := r.FormValue("names")
		staticCache["__blacklist_names"] = Resp{Body: names}
		log.Println("set mail blacklist names : ", names)
		w.Write([]byte("Ok."))
	case "/api/set-cross-wall-names":
		names := r.FormValue("names")
		staticCache["__cross_wall_names"] = Resp{Body: names}
		log.Println("set cross wall names : ", names)
		w.Write([]byte("Ok."))
	case "/api/set-cross-wall-server-config":
		names := r.FormValue("names")
		staticCache["__cross_wall_server_config"] = Resp{Body: names}
		log.Println("set cross wall server-config : ", names)
		w.Write([]byte("Ok."))
	case "/api/set-cross-wall-proxy-switch":
		names := r.FormValue("names")

		if names == "on" {
			TurnOnGlobalProxy("127.0.0.1:11088")
		} else {
			TurnOffGlobalProxy()
		}

		log.Println("set-cross-wall-windows-proxy-switch  : ", names)
		w.Write([]byte("Ok."))
	case "/api/nat-client-status":
		w.Write([]byte("Running: " + strconv.FormatBool(natIsRunning) + ", lastPulledDataTime : " + lastPulledDataTime.String()))
	case "/api/nat-stop-client":
		if natIsRunning {
			close(natTickerDone)
			natTicker.Stop()
			natIsRunning = false
		}
		w.Write([]byte("ok."))
	case "/api/nat-start-client":
		//start a ticker for python crontab
		if natIsRunning {
			w.Write([]byte("already running."))
			return
		}

		remoteServer := r.FormValue("remoteServer")
		localServer := r.FormValue("localServer")
		bindDomain := r.FormValue("bindDomain")
		pullMillSecs := r.FormValue("pullMillSecs")
		autoStopAfterMinutes := r.FormValue("autoStopAfterMinutes")
		natUseCompressStr := r.FormValue("useCompress")
		useCompress, _ := strconv.ParseBool(natUseCompressStr)

		// test remote server
		test_resp, err := doGet(remoteServer + "/api/nat-pull-req?domain=" + bindDomain)
		if err != nil || test_resp.Status != 200 {
			log.Println("[NAT]nat-start-client  Error: ", err, "  resp: ", test_resp)
			w.Write([]byte("err. check the log."))
			return
		}

		natIsRunning = true

		millSecs, _ := strconv.Atoi(pullMillSecs)
		afterMinutes, _ := strconv.ParseFloat(autoStopAfterMinutes, 64)

		natTicker.Reset(time.Duration(millSecs) * time.Millisecond)
		natTickerDone = make(chan bool, 1)

		go func() {
			log.Println("[NAT] ticker start running.")
			lastPulledDataTime = time.Now()
			for {
				select {
				case <-natTickerDone:
					log.Println("[NAT] ticker stop for signal done.")
					return
				case <-natTicker.C:

					//log.Println("NAT Ticker tick.")
					resp, err := doGet(remoteServer + "/api/nat-pull-req?domain=" + bindDomain)
					if err != nil {
						log.Println("[NAT] Error: ", err)
						continue
					}
					jsonStr := resp.Body
					//log.Println("nat-pull-req >> ", jsonStr)
					var reqList []Req
					json.Unmarshal([]byte(jsonStr), &reqList)

					//record time
					if len(reqList) > 0 {
						lastPulledDataTime = time.Now()
					} else {
						//check if need to stop ticker for long time no pulled data.
						if natIsRunning && time.Now().Sub(lastPulledDataTime).Minutes() > afterMinutes {
							log.Println("[NAT] warning: ready to stop ticker for long time no  pulled data .")

							natIsRunning = false
							close(natTickerDone)
							natTicker.Stop()

						}
					}

					for _, req := range reqList {

						req := req
						go func() {
							log.Println("[NAT] local request: ", localServer+req.URI)
							resp, e := doRequest(localServer+req.URI, req.Method, req.Body, req.Headers)
							if e != nil {
								log.Println("[NAT] Error: ", err)
								return
							}
							rr, _ := json.Marshal(resp.Headers)

							params := url.Values{}
							params.Add("reqId", req.ReqId)
							params.Add("status", strconv.Itoa(resp.Status))
							params.Add("useCompress", strconv.FormatBool(useCompress))
							if useCompress {
								params.Add("body", string(compress(resp.Body)))
							} else {
								params.Add("body", resp.Body)
							}

							params.Add("headers", string(rr))
							//fmt.Println(params.Encode())
							doRequest(remoteServer+"/api/nat-push-resp", "POST", params.Encode(), map[string]string{
								"Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
							})
						}()
					}

				}

			}

		}()

		w.Write([]byte("ok."))
	case "/api/nat-pull-req":
		domain := r.FormValue("domain")

		reqList := []Req{}
		for reqId, req := range requestMap {
			if strings.HasPrefix(reqId, domain) {
				body, _ := ioutil.ReadAll(req.Body) //把	body 内容读入字符串 s
				headers := map[string]string{}
				for k, v := range req.Header {
					headers[k] = v[0]
				}
				reqList = append(reqList, Req{
					ReqId:   reqId,
					URI:     req.RequestURI,
					Method:  req.Method,
					Body:    string(body),
					Headers: headers,
				})

				if len(reqList) >= 3 {
					break
				}
			}
		}

		result, _ := json.Marshal(reqList)
		w.Write(result)

		//clear map to avoid duplcated handle in local.
		for _, req := range reqList {
			delete(requestMap, req.ReqId)
		}
	case "/api/py-requirements":
		w.Write([]byte(requirementsTxt))
	case "/api/nat-push-resp":
		reqId := r.FormValue("reqId")

		if _, ok := responseMap[reqId]; !ok {
			//reqId not existed.
			w.Write([]byte("reqId not existed."))
			return
		}

		status := r.FormValue("status")

		headers := r.FormValue("headers")
		natUseCompressStr := r.FormValue("useCompress")
		useCompress, _ := strconv.ParseBool(natUseCompressStr)

		body := ""
		if useCompress {
			body = decompress([]byte(r.FormValue("body")))
		} else {
			body = r.FormValue("body")
		}

		m := make(map[string]string)
		json.Unmarshal([]byte(headers), &m)
		statusCode, _ := strconv.Atoi(status)
		responseMap[reqId] <- Resp{
			Status:  statusCode,
			Headers: m,
			Body:    body,
		}
		w.Write([]byte("ok."))
	case "/api/set-git-root-path":
		path := r.FormValue("gitRepoPath")
		log.Println("set-git-root-path : " + path)
		os.Setenv("GIT_REPO_ROOT", path)
		log.Println("set-git-root-path ok")
	//case "/api/delete-uploaded-files":
	//	err := os.RemoveAll(BASE_DIR)
	//	genereateBasePath()
	//	log.Println(err)
	//	log.Println("DELETE upload files")
	case "/api/killself":
		fmt.Fprintf(w, "ok")
		TurnOffGlobalProxy()
		//通知py server 关闭
		client := http.Client{
			Timeout: 1 * time.Second,
		}
		client.Get("http://127.0.0.1:8086/py/api/killself")

		os.Exit(0)
	case "/api/version":
		fmt.Fprintf(w, "go: "+"2022.10.07 \n"+"py: 2022.10.07")
	case "/api/aes-encrypt":
		text := r.FormValue("text")
		AesKey := []byte(r.FormValue("key")) //秘钥长度为16的倍数
		encrypted, err := AesEncrypt([]byte(text), AesKey)
		if err != nil {
			log.Println(err)
			w.WriteHeader(500)
			w.Write([]byte(err.Error()))
			return
		}

		fmt.Fprintf(w, hex.EncodeToString(encrypted))

	case "/api/aes-decrypt":
		text := r.FormValue("text")
		text_b, _ := hex.DecodeString(text)
		AesKey := []byte(r.FormValue("key")) //秘钥长度为16的倍数
		raw, err := AesDecrypt(text_b, AesKey)
		if err != nil {
			log.Println(err)
			w.WriteHeader(500)
			w.Write([]byte(err.Error()))
			return
		}

		fmt.Fprintf(w, string(raw))
	case "/api/async-call-func":
		w.Write([]byte("done."))

		func_name := r.FormValue("func_name")
		params := r.FormValue("params")
		log.Println(params)
		go func() {
			CallPyFuncRaw(func_name, params)
		}()

	case "/api/run-http-request":
		url := r.FormValue("url")
		method := r.FormValue("method")
		data := r.FormValue("body")
		headers := r.FormValue("headers")

		m := make(map[string]string)
		err := json.Unmarshal([]byte(headers), &m)
		if err != nil {
			log.Println(err)
			w.WriteHeader(500)
			w.Write([]byte("headers json parse error"))
			return
		}

		resp, err := doRequestWithoutRedirect(url, method, data, m)
		if err != nil {
			log.Println("ERROR", err.Error())
			w.WriteHeader(500)
			w.Write([]byte(err.Error()))
			return
		}

		jsonStr, _ := json.Marshal(resp)
		w.Write(jsonStr)

	//case "/api/upload-file":
	//	fileUpload(w, r)
	//case "/api/get-clipboard-data":
	//	getClipboardData(w, r)
	case "/api/get-local-ip":
		getLocalIP(w, r)
	//case "/api/window-close":
	//	//bind browser window close event;
	//	go http.Get("http://127.0.0.1:8086/py/api/killself")
	//
	//	fmt.Fprintf(w, "ok.")
	//	ui.Close()

	case "/api/search-ffmpeg":
		var files []string

		root := "/Users/zhouzhipeng"

		err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {

			if err != nil {

				fmt.Println(err)
				return nil
			}

			if !info.IsDir() && filepath.Ext(path) == ".txt" {
				files = append(files, path)
			}

			return nil
		})

		if err != nil {
			log.Fatal(err)
		}

		for _, file := range files {
			fmt.Println(file)
		}
	case "/api/run-sql":
		sql := r.FormValue("sql")
		log.Println(sql)

		lines := strings.Split(strings.ReplaceAll(sql, "\r", ""), "\n")
		log.Println(lines)
		ds := ""
		rawSql := ""
		result := ""
		for _, l := range lines {
			if strings.Contains(l, "@ds") {
				if ds == "" {
					//first ds
					ds = strings.TrimSpace(strings.Split(l, "=")[1])
					dbName := strings.Split(ds, "@")[0]
					other := strings.Split(ds, "@")[1]
					hostPort := strings.Split(other, "/")[0]
					userPwd := strings.Split(other, "/")[1]
					ds = userPwd + "@tcp(" + hostPort + ")/" + dbName
					rawSql = ""
					log.Println("ds >>>  " + ds)
				} else { //another ds

					//execute last sql
					result += querySql(rawSql, ds) + "<br/>"

					ds = strings.TrimSpace(strings.Split(l, "=")[1])
					dbName := strings.Split(ds, "@")[0]
					other := strings.Split(ds, "@")[1]
					hostPort := strings.Split(other, "/")[0]
					userPwd := strings.Split(other, "/")[1]
					ds = userPwd + "@tcp(" + hostPort + ")/" + dbName
					rawSql = ""
					log.Println("ds >>>  " + ds)
					//then begin a new ds recording
				}
			} else {
				//sql
				//connect with whitespace
				trimedSql := strings.TrimSpace(l)
				if !strings.HasPrefix(trimedSql, "--") {
					rawSql += trimedSql + " "
				}

			}
		}

		rawSql = strings.TrimSpace(rawSql)

		//last
		if rawSql != "" && ds != "" {
			//execute last sql
			result += querySql(rawSql, ds) + "<br/>"
		} else {
			if ds == "" {
				result += " Error: No @ds selected!"
			} else if rawSql == "" {
				result += " Error: No sql selected!"
			}
		}

		fmt.Fprintf(w, result)
	//case "/api/run-shell":
	//	shell := r.FormValue("shell")
	//	log.Println(shell)
	//	out, err := exec.Command("bash", "-c", shell).Output()
	//	result := "no result"
	//	if err == nil {
	//		result = string(out)
	//	} else {
	//		log.Println(err)
	//		result = err.Error()
	//	}
	//	fmt.Fprintf(w, result)
	default:
		w.WriteHeader(404)
	}
}

type Req struct {
	ReqId   string
	URI     string
	Method  string
	Body    string
	Headers map[string]string
}

type Resp struct {
	Status    int
	StatusMsg string
	Body      string
	Headers   map[string]string
}

func CallPyFuncRaw(funcName string, body string) (Resp, error) {
	return doRequest("http://127.0.0.1:8086/py/functions/"+funcName, "POST", body, map[string]string{
		"Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
	})
}

func CallPyFunc(funcName string, params url.Values) (Resp, error) {
	return CallPyFuncRaw(funcName, params.Encode())
}

func doRequest(url, method string, data string, headers map[string]string) (Resp, error) {

	request, err := http.NewRequest(method, url, bytes.NewBufferString(data))

	if err != nil {
		return Resp{}, err
	}

	if headers != nil {
		for k, v := range headers {
			request.Header.Set(k, v)
		}
	}

	request.Header.Set("Host", "127.0.0.1:"+GetMainPort())

	//client := new(http.Client)
	client := http.Client{
		//Timeout: 10 * time.Second,
	}

	response, err := client.Do(request)
	if response != nil {
		defer response.Body.Close()
	}
	if err != nil {
		return Resp{}, err
	}

	content, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return Resp{}, err
	}

	var respHeaders = map[string]string{}
	for k, v := range response.Header {
		respHeaders[k] = v[0]
	}

	return Resp{Body: string(content), Status: response.StatusCode, Headers: respHeaders}, nil
}

func doRequestWithoutRedirect(url, method string, data string, headers map[string]string) (Resp, error) {
	request, err := http.NewRequest(method, url, bytes.NewBufferString(data))
	if err != nil {
		return Resp{}, err
	}

	if headers != nil {
		for k, v := range headers {
			request.Header.Set(k, v)
		}
	}

	request.Header.Set("Host", "127.0.0.1:"+GetMainPort())

	client := &http.Client{
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			return http.ErrUseLastResponse
		},
	}

	response, err := client.Do(request)
	if response != nil {
		defer response.Body.Close()
	}
	if err != nil {
		return Resp{}, err
	}

	content, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return Resp{}, err
	}

	var respHeaders = map[string]string{}
	for k, v := range response.Header {
		respHeaders[k] = v[0]
	}

	return Resp{Body: string(content), Status: response.StatusCode, StatusMsg: response.Status, Headers: respHeaders}, nil
}

func doGet(url string) (Resp, error) {
	return doRequest(url, "GET", "", nil)
}
