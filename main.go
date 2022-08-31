package main

import (
	"bufio"
	"context"
	"crypto/tls"
	"embed"
	"fmt"
	"github.com/asaskevich/govalidator"
	"github.com/p4gefau1t/trojan-go/common"
	"github.com/p4gefau1t/trojan-go/tunnel"
	"golang.org/x/crypto/acme/autocert"
	"io"
	"log"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
	"time"
)

//go:embed bin/gogo.db
var gogoDB embed.FS

//存放临时上传的文件(窗口关闭后删除）
var BASE_DIR = ""

var accessLogger *log.Logger

func genereateBasePath() {

	if os.Getenv("BASE_DIR") != "" {
		BASE_DIR = os.Getenv("BASE_DIR")
	} else {
		switch runtime.GOOS {
		case "darwin":
			BASE_DIR = filepath.Join("/tmp", "gogo_files")
		case "windows":
			BASE_DIR = filepath.Join(os.TempDir(), "gogo_files")
		default:
			BASE_DIR = "/tmp"
		}
	}

	//if os.Getenv("IN_DOCKER") == "" {
	//	BASE_DIR = filepath.Join(os.TempDir(), "gogo_files")
	//} else {
	//	//run in docker or linux , use /tmp
	//	BASE_DIR = "/tmp"
	//}

	os.Mkdir(BASE_DIR, 0777)

	if os.Getenv("DISABLE_LOG_FILE") == "" {
		//设置log输出到文件
		file := filepath.Join(BASE_DIR, "message.txt")
		logFile, err := os.OpenFile(file, os.O_APPEND|os.O_RDWR|os.O_CREATE /*|os.O_TRUNC*/, 0777)
		if err != nil {
			log.Println(err)
			return
		}
		log.SetOutput(logFile) // 将文件设置为log输出的文件
		log.SetPrefix("[gogo]")
		log.SetFlags(log.LstdFlags | log.Lshortfile | log.LUTC)

		accessLogFilePath := filepath.Join(BASE_DIR, "access_log.txt")
		accesslogFile, err := os.OpenFile(accessLogFilePath, os.O_APPEND|os.O_RDWR|os.O_CREATE /*|os.O_TRUNC*/, 0777)
		if err != nil {
			log.Println(err)
			return
		}
		accessLogger = log.New(accesslogFile, "[gogo]", log.LstdFlags|log.Lshortfile|log.LUTC)
	}

	log.Println("temp files dir :", BASE_DIR)

	//update sqlite db path
	var dbpath = filepath.Join(BASE_DIR, "gogo.db")

	if _, err := os.Stat(dbpath); err == nil {
		log.Println("db File exists , ignore init db.")
	} else {
		log.Println("File does not exist, begin to copy db file to tmp path.")
		bytes, _ := gogoDB.ReadFile("bin/gogo.db")
		os.WriteFile(dbpath, bytes, 0777)
	}
}

type TimingRoundtripper struct {
	transport http.RoundTripper
}

func NewTimingRoundtripper(transport http.RoundTripper) http.RoundTripper {
	return TimingRoundtripper{transport: transport}
}

func (rt TimingRoundtripper) RoundTrip(r *http.Request) (resp *http.Response, err error) {
	start := time.Now()
	resp, err = rt.transport.RoundTrip(r)
	//log.Println("request ", r.URL, time.Since(start))
	if err == nil {
		resp.Header.Set("X-Time", time.Since(start).String())

	}
	return resp, err
}

var staticCache = map[string]Resp{}

func cachedProxyPy(uri string, writer http.ResponseWriter) {
	if _, ok := staticCache[uri]; !ok {
		resp, err := doGet("http://127.0.0.1:8086" + uri)
		if err == nil {
			staticCache[uri] = resp
		} else {
			log.Println("cachedProxyPy.error", err)
		}
	}

	if val, ok := staticCache[uri]; ok {

		for k, v := range val.Headers {
			writer.Header().Set(k, v)
		}
		writer.Header().Set("x-go-cache", "1")
		// Set our NoCache headers
		for k, v := range noCacheHeaders {
			writer.Header().Set(k, v)
		}

		writer.WriteHeader(val.Status)
		writer.Write([]byte(val.Body))

	} else {
		writer.WriteHeader(502)
		writer.Write([]byte("resource error."))
	}

}

func proxyPy(writer http.ResponseWriter, request *http.Request) {

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
		Transport: NewTimingRoundtripper(http.DefaultTransport),
		ModifyResponse: func(r *http.Response) error {

			// Set our NoCache headers
			for k, v := range noCacheHeaders {
				r.Header.Set(k, v)
			}

			return nil

		},
	}

	proxy.ServeHTTP(writer, request)
}

func commonReverseProxy(writer http.ResponseWriter, request *http.Request, server string) {

	proxy := httputil.ReverseProxy{
		Director: func(request *http.Request) {
			//rewrite url
			request.URL.Scheme = "http"
			request.URL.Host = server

			//request.URL.Path = request.URL.Path[len("/py"):]

			// Delete any ETag headers that may have been set
			//for _, v := range etagHeaders {
			//	if request.Header.Get(v) != "" {
			//		request.Header.Del(v)
			//	}
			//}

			////websocket headers
			//if ws {
			//	request.Header.Set("Upgrade", "websocket")
			//	request.Header.Set("Connection", "Upgrade")
			//
			//}
		},
		Transport: NewTimingRoundtripper(http.DefaultTransport),
		ModifyResponse: func(r *http.Response) error {

			// Set our NoCache headers
			//for k, v := range noCacheHeaders {
			//	r.Header.Set(k, v)
			//}

			return nil
		},
	}

	proxy.ServeHTTP(writer, request)
}

func GetMainPort() string {
	var port = os.Getenv("MAIN_PORT")
	if port == "" {
		port = "80"
	}
	return port
}

func GetTrojanPassword() string {
	var pwd = os.Getenv("TROJAN_PASSWORD")
	if pwd == "" {
		pwd = "123456"
	}
	return pwd
}

func GetHTTPSPort() string {
	var port = os.Getenv("HTTPS_PORT")
	if port == "" {
		port = "443"
	}
	return port
}

func ShouldStart443Server() bool {
	var env = os.Getenv("START_443_SERVER")
	if env == "" {
		env = "false"
	}
	return env == "true"
}

func ShouldStartMailServer() bool {
	var env = os.Getenv("START_MAIL_SERVER")
	if env == "" {
		env = "false"
	}
	return env == "true"
}

func ShouldStartLocalProxyServer() bool {
	var env = os.Getenv("START_TROJAN_PROXY")
	if env == "" {
		env = "true"
	}
	return env == "true"
}

func getWhitelistRootDomains() []string {
	var domains = os.Getenv("WHITELIST_ROOT_DOMAINS")
	if domains == "" {
		domains = "zhouzhipeng.com"
	}

	return strings.Split(domains, ",")
}

func getWhitelistMailDomain() string {
	var domains = os.Getenv("WHITELIST_MAIL_DOMAIN")
	if domains == "" {
		domains = "@zhouzhipeng.com"
	}

	return domains
}

func getCertCacheDir() string {
	return filepath.Join(BASE_DIR, "cert_cache")
}

var tlsConfig *tls.Config

const (
	Connect   tunnel.Command = 1
	Associate tunnel.Command = 3
	Mux       tunnel.Command = 0x7f
)

//go:embed ssl_err_res.txt
var errHttpResponse []byte

func handleHTTPSConnection(conn net.Conn) {

	//log.Println("tls connection from", conn.RemoteAddr())

	handshakeRewindConn := common.NewRewindConn(conn)
	handshakeRewindConn.SetBufferSize(2048)

	tlsConn := tls.Server(handshakeRewindConn, tlsConfig)
	err := tlsConn.Handshake()
	handshakeRewindConn.StopBuffering()

	if err != nil {
		if strings.Contains(err.Error(), "first record does not look like a TLS handshake") {
			// not a valid tls client hello
			handshakeRewindConn.Rewind()
			log.Println(common.NewError("failed to perform tls handshake with " + tlsConn.RemoteAddr().String() + ", redirecting").Base(err))
			handshakeRewindConn.Write(errHttpResponse)
			handshakeRewindConn.Close()
			//defer handshakeRewindConn.Close()
			//redirectTo(handshakeRewindConn, "127.0.0.1:8086")

		} else {
			// in other cases, simply close it
			tlsConn.Close()
			log.Println(common.NewError("tls handshake failed").Base(err))
		}
		return
	}

	//log.Println("tls connection from", conn.RemoteAddr())
	//state := tlsConn.ConnectionState()
	//log.Println("tls handshake", tls.CipherSuiteName(state.CipherSuite), state.DidResume, state.NegotiatedProtocol)

	// we use a real http header parser to mimic a real http server
	rewindConn := common.NewRewindConn(tlsConn)
	rewindConn.SetBufferSize(1024)
	r := bufio.NewReader(rewindConn)
	httpReq, err := http.ReadRequest(r)
	rewindConn.Rewind()
	rewindConn.StopBuffering()

	defer rewindConn.Close()

	if err != nil {
		// this is not a http request. pass it to trojan protocol layer for further inspection
		//log.Println("ReadRequest Err:", err)

		//handle trojan request

		handleTrojanRequest(rewindConn)
	} else {
		//normal https website
		//stats user agent and ip
		log.Println("[stats] url :", httpReq.URL.Path)
		if strings.HasPrefix(httpReq.URL.Path, "/pages/") {
			go func() {
				ua := httpReq.UserAgent()
				accessLogger.Println("[access stats] ", httpReq.URL.Path, "  >>> ua : ", ua, " , ip: ", rewindConn.RemoteAddr())
			}()
		}

		redirectTo(rewindConn, "127.0.0.1:"+GetMainPort())
	}

}

func handleTrojanRequest(rewindConn *common.RewindConn) {
	//trojan protocol:  https://trojan-gfw.github.io/trojan/protocol.html
	//trojan auth

	auth := func() (*tunnel.Metadata, error) {

		//read 56 bytes
		userHash := [56]byte{}
		n, err := rewindConn.Read(userHash[:])
		if err != nil || n != 56 {
			log.Println("failed to read hash, err:", err)
			return nil, common.NewError("failed to read hash").Base(err)
		}

		hash := common.SHA224String(GetTrojanPassword())
		valid := hash == string(userHash[:])
		//log.Println("trojan auth is valid or not : ", valid)
		if !valid {
			log.Println("Err: invalid trojan auth hash : ", string(userHash[:]))
			return nil, common.NewError("invalid hash:" + string(userHash[:]))
		}

		// CRLF
		crlf := [2]byte{}
		_, err = io.ReadFull(rewindConn, crlf[:])
		if err != nil {
			log.Println("CRLF read err: ", err)
			return nil, err
		}

		//read metadata
		metadata := &tunnel.Metadata{}
		if err := metadata.ReadFrom(rewindConn); err != nil {
			log.Println("metadata read err: ", err)
			return nil, err
		}

		_, err = io.ReadFull(rewindConn, crlf[:])
		if err != nil {
			log.Println("CRLF read err: ", err)
			return nil, err
		}

		return metadata, nil
	}

	metadata, err := auth()

	if err != nil {
		log.Println("invalid trojan protocol , fallback to normal http request.")

		rewindConn.Rewind()
		//rewindConn.StopBuffering()
		//
		//redirectTo(rewindConn, "127.0.0.1:8086")
		rewindConn.Write(errHttpResponse)
		rewindConn.Close()
		return
	}

	//log.Println("it's a trojan request")

	switch metadata.Command {
	case Connect:
		//if metadata.DomainName == "MUX_CONN" {
		//	s.muxChan <- inboundConn
		//	log.Debug("mux(r) connection")
		//} else {
		//s.connChan <- inboundConn
		//log.Println("normal trojan connection")
		//log.Println("meta to addrress: ", metadata.Address.String())

		redirectTo(rewindConn, metadata.Address.String())
		//}

	//case Associate:
	//	s.packetChan <- &PacketConn{
	//		Conn: inboundConn,
	//	}
	//	log.Debug("trojan udp connection")
	//case Mux:
	//	s.muxChan <- inboundConn
	//	log.Debug("mux connection")
	default:
		log.Println(common.NewError(fmt.Sprintf("unknown trojan command %d, ip : %s", metadata.Command, rewindConn.RemoteAddr())))
	}

}

func redirectTo(conn net.Conn, toAddr string) {

	outboundConn, err := net.Dial("tcp", toAddr)
	if err != nil {
		log.Println("redirect err:", err)
		return
	}
	defer outboundConn.Close()

	errChan := make(chan error, 2)
	copyConn := func(a, b net.Conn) {
		_, err := io.Copy(a, b)
		errChan <- err
	}
	go copyConn(outboundConn, conn)
	go copyConn(conn, outboundConn)

	select {
	case err := <-errChan:
		if err != nil {
			log.Println("Redirect err:", err)
		}
		//log.Println("redirection done")
	}
}

func postInit() {
	//startup python web server
	StartPythonServer()

	//start a ticker for python crontab
	ticker := time.NewTicker(59 * time.Second)
	//defer ticker.Stop()
	go func() {
		for range ticker.C {
			//log.Println("Ticker tick.")
			CallPyFunc("SYS_CRONTAB_MASTER", url.Values{})
		}
	}()

	//load ui
	LoadUI()
}

func tryOpenPort() net.Listener {
	ln, err := net.Listen("tcp", "0.0.0.0:"+GetMainPort())

	if err != nil {
		log.Println("cant startup ,because 9999 port is used by other app.")
		log.Println("port 9999 is using, sending kill command...")

		client := http.Client{
			Timeout: 1 * time.Second,
		}
		client.Get("http://127.0.0.1:" + GetMainPort() + "/api/killself")

		ln, err = net.Listen("tcp", "0.0.0.0:"+GetMainPort())

	}

	if err != nil {
		log.Println(err)
		log.Fatal("start failed, port is in using!")
	}
	return ln
}

func injectEnv(cmd *exec.Cmd) {
	cmd.Stdout = log.Writer()
	cmd.Stderr = log.Writer()

	cmd.Env = os.Environ()
	cmd.Env = append(cmd.Env,
		"PYTHONUNBUFFERED=1", "PYTHONIOENCODING=utf8",
		"MAIN_PORT="+GetMainPort(),
		"BASE_DIR="+BASE_DIR,
		"FILE_UPLOAD_PATH="+BASE_DIR)

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

func listen443() {
	ln, err := net.Listen("tcp", ":"+GetHTTPSPort()) //tls.Listen("tcp", ":"+GetHTTPSPort(), tlsConfig)
	if err != nil {
		log.Println(err)
		log.Fatal("start failed, https  port is in using!")
	}

	go func() {
		for {
			conn, err := ln.Accept()
			if err != nil {
				log.Println(err)
				continue
			}
			if conn != nil {
				go handleHTTPSConnection(conn)
			}
		}
	}()

}

func main() {
	//创建临时文件目录
	genereateBasePath()

	//尝试开启http端口
	ln80 := tryOpenPort()

	m := autocert.Manager{
		Prompt: autocert.AcceptTOS,
		HostPolicy: func(ctx context.Context, host string) error {
			if !govalidator.IsDNSName(host) {
				return fmt.Errorf("my acme/autocert: host %q not support", host)
			}

			for _, domain := range getWhitelistRootDomains() {
				if strings.HasSuffix(host, domain) {
					return nil
				}
			}

			return fmt.Errorf("my acme/autocert: host %q not in whitelist", host)
		},
		Cache: autocert.DirCache(getCertCacheDir()),
	}

	httpHandler := m.HTTPHandler(http.HandlerFunc(router))

	//listen 80
	go http.Serve(ln80, httpHandler)

	if ShouldStart443Server() {
		tlsConfig = &tls.Config{GetCertificate: m.GetCertificate}
		///*net.Listen("tcp", ":"+GetHTTPSPort()) /*/;

		//listen 443
		listen443()
	}

	if ShouldStartMailServer() {
		//listen 25 (mail server)
		log.Println("starting mail server...")

		os.Mkdir(path.Join(BASE_DIR, "mail_attachments"), 0777)

		go StartNewMailServer()

	}

	if ShouldStartLocalProxyServer() {
		//listen 25 (mail server)
		log.Println("starting trojan client proxy  server...")
		go StartLocalProxyServer()
	}

	log.Println("main server started.")

	postInit()

}
