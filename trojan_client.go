package main

import (
	"bufio"
	"bytes"
	"crypto/tls"
	"encoding/binary"
	"fmt"
	"github.com/asaskevich/govalidator"
	"github.com/p4gefau1t/trojan-go/common"
	"io"
	"log"
	"net"
	"net/textproto"
	"net/url"
	"strconv"
	"strings"
)

type conn struct {
	rwc net.Conn
	brc *bufio.Reader
}

type BadRequestError struct {
	what string
}

func (b *BadRequestError) Error() string {
	return b.what
}
func StartTrojanClient() {
	l, err := net.Listen("tcp", "0.0.0.0:11088")
	if err != nil {
		panic(err)
	}
	defer l.Close()

	logInfo("Listening 11088")

	for {
		c, err := l.Accept()

		if err != nil {
			log.Println("Trojan Client Err : ", err)
			continue
		}

		go handleProxyConn(conn{rwc: c, brc: bufio.NewReader(c)})
	}
}

func parseRequestLine(line string) (method, requestURI, proto string, ok bool) {
	s1 := strings.Index(line, " ")
	s2 := strings.Index(line[s1+1:], " ")
	if s1 < 0 || s2 < 0 {
		return
	}
	s2 += s1 + 1
	return line[:s1], line[s1+1 : s2], line[s2+1:], true
}

func handleProxyConn(c conn) {
	defer c.rwc.Close()

	needWriteLine := false
	rawHttpRequestHeader, address, _, isHttps, err := c.getTunnelInfo()
	line := rawHttpRequestHeader.String()

	if err != nil {
		log.Println("Err >>>>>>>>>> ", err)
		return
	}

	if isHttps {
		// if https, should sent 200 to client
		_, err = c.rwc.Write([]byte("HTTP/1.1 200 Connection established\r\n\r\n"))
		if err != nil {
			log.Println("Err >>>>>>>>>> ", err)
			return
		}
	} else {
		// if not https, should sent the request header to remote
		needWriteLine = true
	}

	log.Println("remote address : ", address)

	if !strings.Contains(address, ":") {
		log.Println("err address , no colon ", address)
		return
	}

	//进行转发
	arr := strings.Split(address, ":")
	port, err := strconv.Atoi(arr[1])
	if err != nil {
		log.Println(err)
		return
	}

	// 域名白名单
	if isOutsideOfWall(address) {
		sendToTrojanServer(c.rwc, arr[0], port, needWriteLine, line)
	} else {

		outboundConn, err := net.Dial("tcp", address)
		if err != nil {
			log.Println("address : ", address, "   >>>  dial err:", err)
			return
		}
		defer outboundConn.Close()
		//local redirect
		if needWriteLine {
			outboundConn.Write([]byte(line))
		}
		//body, err := ioutil.ReadAll(c.conn)

		//log.Println("body>>", body, " ,,, err ::", err)

		go io.Copy(outboundConn, c.rwc)
		io.Copy(c.rwc, outboundConn)
	}

}

// getClientInfo parse client request header to get some information:
func (c *conn) getTunnelInfo() (rawReqHeader bytes.Buffer, host, credential string, isHttps bool, err error) {
	tp := textproto.NewReader(c.brc)

	// First line: GET /index.html HTTP/1.0
	var requestLine string
	if requestLine, err = tp.ReadLine(); err != nil {
		return
	}

	method, requestURI, _, ok := parseRequestLine(requestLine)
	if !ok {
		err = &BadRequestError{"malformed HTTP request"}
		return
	}

	// https request
	if method == "CONNECT" {
		isHttps = true
		requestURI = "http://" + requestURI
	}

	// get remote host
	uriInfo, err := url.ParseRequestURI(requestURI)
	if err != nil {
		return
	}

	// Subsequent lines: Key: value.
	mimeHeader, err := tp.ReadMIMEHeader()
	if err != nil {
		return
	}

	credential = mimeHeader.Get("Proxy-Authorization")

	if uriInfo.Host == "" {
		host = mimeHeader.Get("Host")
	} else {
		if strings.Index(uriInfo.Host, ":") == -1 {
			host = uriInfo.Host + ":80"
		} else {
			host = uriInfo.Host
		}
	}

	if !isHttps {
		requestLine = strings.Replace(requestLine, "http://"+host, "", 1)
	}

	// rebuild http request header
	rawReqHeader.WriteString(requestLine + "\r\n")
	for k, vs := range mimeHeader {
		for _, v := range vs {
			rawReqHeader.WriteString(fmt.Sprintf("%s: %s\r\n", k, v))
		}
	}
	rawReqHeader.WriteString("\r\n")

	//if !isHttps {
	log.Println("raw headers >>> ", rawReqHeader.String())
	//}

	return
}

func isOutsideOfWall(domain string) bool {
	ss := staticCache["__cross_wall_names"].Body

	if ss != "" {
		if ss == "all" {
			return true
		}

		if ss == "none" {
			return false
		}

		for _, name := range strings.Split(ss, ",") {
			name = strings.TrimSpace(name)
			if strings.Contains(domain, name) {
				log.Println("hit, need to cross wall , domain : ", domain)
				return true
			}
		}
	}

	return false
}

func getVpnServerConfig() []string {
	ss := staticCache["__cross_wall_server_config"].Body
	if ss != "" {
		return strings.Split(ss, ",")

	}

	return nil
}

//整形转换成字节
func IntToBytes(n int16) []byte {
	x := n

	bytesBuffer := bytes.NewBuffer([]byte{})
	binary.Write(bytesBuffer, binary.BigEndian, x)
	return bytesBuffer.Bytes()
}

func sendToTrojanServer(conn net.Conn, ipOrDomain string, port int, needWriteLine bool, line string) {
	vpnServer := getVpnServerConfig()
	if vpnServer == nil {
		log.Println("Err >> vpn server not configured.")
		return
	}

	conf := &tls.Config{
		InsecureSkipVerify: true,
	}
	//shakehands with trojan server
	trojanConn, err := tls.Dial("tcp", vpnServer[0], conf)
	defer trojanConn.Close()
	if err != nil {
		log.Println("Trojan Client Err : ", err, ", server: ", vpnServer)
		return
	}

	// write trojan header

	CRLF := "\r\n"
	hash := common.SHA224String(vpnServer[1])
	trojanConn.Write([]byte(hash + CRLF))

	//CMD: CONNECT
	trojanConn.Write([]byte{1})

	if govalidator.IsDNSName(ipOrDomain) {
		//set address type
		trojanConn.Write([]byte{3})
		//need to tell the length of the domain name
		trojanConn.Write([]byte{byte(len(ipOrDomain))})
		trojanConn.Write([]byte(ipOrDomain))
	} else if ip := net.ParseIP(ipOrDomain); ip != nil {
		if ip.To4() != nil {
			//ipv4
			//set address type
			trojanConn.Write([]byte{1})

		} else {
			//ipv6
			//set address type
			trojanConn.Write([]byte{4})
		}
		trojanConn.Write(ip)
	} else {
		log.Println("err >>>>>  ipOrDomain: ", ipOrDomain)
		return
	}

	trojanConn.Write(IntToBytes(int16(port)))

	trojanConn.Write([]byte(CRLF))

	if needWriteLine {
		trojanConn.Write([]byte(line))
	}

	go io.Copy(trojanConn, conn)
	io.Copy(conn, trojanConn)

}
