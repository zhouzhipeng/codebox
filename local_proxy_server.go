package main

import (
	"crypto/tls"
	"io"
	"log"
	"net"
	"net/http"
	"strconv"
	"strings"
	"time"
)

func handleTunneling(w http.ResponseWriter, r *http.Request) {

	w.WriteHeader(http.StatusOK)
	hijacker, ok := w.(http.Hijacker)
	if !ok {
		log.Println("Err >>>>>>>>>>>>>", "Hijacking not supported")
		http.Error(w, "Hijacking not supported", http.StatusInternalServerError)
		return
	}
	client_conn, _, err := hijacker.Hijack()
	if err != nil {
		log.Println("Err >>>>>>>>>>>>> Hijack err : ", err)
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}

	//judge if needs to cross wall.
	// 域名白名单
	log.Println("debug >>> host: ", r.Host)
	if isOutsideOfWall(r.Host) {
		arr := strings.Split(r.Host, ":")
		port := 80
		if len(arr) > 1 {
			port, err = strconv.Atoi(arr[1])
			if err != nil {
				log.Println("Err >>>>>>>>>>>>>", err)
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		}

		sendToTrojanServer(client_conn, arr[0], port, false, "")
	} else {
		dest_conn, err := net.DialTimeout("tcp", r.Host, 10*time.Second)
		if err != nil {
			log.Println("Err >>>>>>>>>>>>> domain:  DialTimeout : ", err)
			http.Error(w, err.Error(), http.StatusServiceUnavailable)
			return
		}

		go transfer(dest_conn, client_conn)
		go transfer(client_conn, dest_conn)
	}

}
func transfer(destination io.WriteCloser, source io.ReadCloser) {
	defer destination.Close()
	defer source.Close()
	io.Copy(destination, source)
}
func handleHTTP(w http.ResponseWriter, req *http.Request) {
	resp, err := http.DefaultTransport.RoundTrip(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()
	copyHeader(w.Header(), resp.Header)
	w.WriteHeader(resp.StatusCode)
	io.Copy(w, resp.Body)
}
func copyHeader(dst, src http.Header) {
	for k, vv := range src {
		for _, v := range vv {
			dst.Add(k, v)
		}
	}
}

// StartLocalProxyServer see doc: https://medium.com/@mlowicki/http-s-proxy-in-golang-in-less-than-100-lines-of-code-6a51c2f2c38c
func StartLocalProxyServer() {
	server := &http.Server{
		Addr: ":11088",
		Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.Method == http.MethodConnect {
				handleTunneling(w, r)
			} else {
				handleHTTP(w, r)
			}
		}),
		// Disable HTTP/2.
		TLSNextProto: make(map[string]func(*http.Server, *tls.Conn, http.Handler)),
	}

	log.Fatal(server.ListenAndServe())

}
