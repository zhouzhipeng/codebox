package main

import (
	"bufio"
	"context"
	"crypto/tls"
	_ "embed"
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
	"path"
	"strconv"
	"strings"
	"time"
)

var accessLogger *log.Logger

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
		if err == nil && resp.Status == 200 {
			staticCache[uri] = resp
		} else {
			log.Println("cachedProxyPy.error", err)
			writer.WriteHeader(resp.Status)
			writer.Write([]byte(resp.Body))
			return
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
		writer.WriteHeader(500)
		writer.Write([]byte("resource error."))
	}

}

func proxyConfig(writer http.ResponseWriter, request *http.Request) {

	proxy := httputil.ReverseProxy{
		Director: func(request *http.Request) {
			//rewrite url
			request.URL.Scheme = "http"
			request.URL.Host = "127.0.0.1:28888"

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

func commonProxyPass(writer http.ResponseWriter, request *http.Request, server string) {

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
	log.Println("home>>>", os.Getenv("HOME"))

	StartConfigServer()

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
