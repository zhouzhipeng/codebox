package main

import (
	"errors"
	"github.com/emirpasic/gods/lists/arraylist"
	"io/ioutil"
	"log"
	"mime"
	"net"
	"net/url"
	"path"
	"strings"
	"time"
)

func logError(err error) {
	log.Printf("[ERROR] %s\n", err)
}

func logInfo(msg string) {
	log.Printf("[INFO] %s\n", msg)
}

type message struct {
	clientDomain string
	smtpCommands map[string]string
	atmHeaders   map[string]string
	body         string
	from         string
	date         string
	subject      string
	to           string
}

type connection struct {
	conn net.Conn
	id   int
	buf  []byte
}

func (c *connection) logInfo(msg string, args ...interface{}) {
	args = append([]interface{}{c.id, c.conn.RemoteAddr().String()}, args...)
	log.Printf("[INFO] [%d: %s] "+msg+"\n", args...)
}

func (c *connection) logError(err error) {
	log.Printf("[ERROR] [%d: %s] %s\n", c.id, c.conn.RemoteAddr().String(), err)
}

func (c *connection) readLine() (string, error) {
	for {
		b := make([]byte, 1024)
		n, err := c.conn.Read(b)
		if err != nil {
			return "", err
		}

		c.buf = append(c.buf, b[:n]...)
		for i, b := range c.buf {
			// If end of line
			if b == '\n' && i > 0 && c.buf[i-1] == '\r' {
				// i-1 because drop the CRLF, no one cares after this
				line := string(c.buf[:i-1])
				c.buf = c.buf[i+1:]
				return line, nil
			}
		}
	}
}

func (c *connection) readMultiLine() (string, error) {
	for {
		noMoreReads := false
		for i, b := range c.buf {
			if i > 1 &&
				b != ' ' &&
				b != '\t' &&
				c.buf[i-2] == '\r' &&
				c.buf[i-1] == '\n' {
				// i-2 because drop the CRLF, no one cares after this
				line := string(c.buf[:i-2])
				c.buf = c.buf[i:]
				return line, nil
			}

			noMoreReads = c.isBodyClose(i)
		}

		if !noMoreReads {
			b := make([]byte, 1024)
			n, err := c.conn.Read(b)
			if err != nil {
				return "", err
			}
			log.Println("debug >> ", string(b[:n]))
			c.buf = append(c.buf, b[:n]...)

			// If this gets here more than once it's going to be an infinite loop
		}
	}
}

func (c *connection) isBodyClose(i int) bool {
	return i > 4 &&
		c.buf[i-4] == '\r' &&
		c.buf[i-3] == '\n' &&
		c.buf[i-2] == '.' &&
		c.buf[i-1] == '\r' &&
		c.buf[i-0] == '\n'
}

func (c *connection) readToEndOfBody() (string, error) {
	for {
		for i := range c.buf {
			if c.isBodyClose(i) {
				return string(c.buf[:i-4]), nil
			}
		}

		b := make([]byte, 1024)
		n, err := c.conn.Read(b)
		if err != nil {
			return "", err
		}

		c.buf = append(c.buf, b[:n]...)
	}
}

func (c *connection) writeLine(msg string) error {
	msg += "\r\n"
	for len(msg) > 0 {
		n, err := c.conn.Write([]byte(msg))
		if err != nil {
			return err
		}

		msg = msg[n:]
	}

	return nil
}

func (c *connection) handle() {
	defer c.conn.Close()
	c.logInfo("Connection accepted")

	err := c.writeLine("220 ESMTP")
	if err != nil {
		c.logError(err)
		return
	}

	c.logInfo("Awaiting EHLO")

	line, err := c.readLine()
	if err != nil {
		c.logError(err)
		return
	}

	if !strings.HasPrefix(line, "EHLO") && !strings.HasPrefix(line, "ehlo") && !strings.HasPrefix(line, "HELO") {
		c.logError(errors.New("Expected EHLO got: " + line))
		return
	}

	msg := message{
		smtpCommands: map[string]string{},
		atmHeaders:   map[string]string{},
	}
	msg.clientDomain = line[len("EHLO "):]

	c.logInfo("Received EHLO")

	c.writeLine("250-SIZE 157286400")
	c.writeLine("250-8BITMIME")
	err = c.writeLine("250 SMTPUTF8")
	if err != nil {
		c.logError(err)
		return
	}

	c.logInfo("Done EHLO")

	for line != "" {
		line, err = c.readLine()
		if err != nil {
			c.logError(err)
			return
		}

		if strings.ToUpper(line) == "AUTH LOGIN" {
			log.Println("unsupported command : ", line)
			return
		}

		pieces := strings.SplitN(line, ":", 2)

		smtpCommand := ""
		if len(pieces) > 0 {
			smtpCommand = strings.ToUpper(pieces[0])
		}

		// Special header without a value
		if smtpCommand == "DATA" {
			err = c.writeLine("354")
			if err != nil {
				c.logError(err)
				return
			}

			break
		} else if smtpCommand == "MAIL FROM" {
			//check if in blacklist
			if isInBlackList(smtpCommand) {
				return
			}
		}

		smtpValue := ""
		if len(pieces) > 1 {
			smtpValue = pieces[1]
		}
		msg.smtpCommands[smtpCommand] = smtpValue

		c.logInfo("Got header: " + line)

		err = c.writeLine("250 OK")
		if err != nil {
			c.logError(err)
			return
		}
	}

	c.logInfo("Done SMTP headers, reading ARPA text message headers")

	for {
		line, err = c.readMultiLine()
		if err != nil {
			c.logError(err)
			return
		}

		if strings.TrimSpace(line) == "" {
			break
		}

		pieces := strings.SplitN(line, ": ", 2)
		atmHeader := ""
		atmValue := ""

		if len(pieces) > 0 {
			atmHeader = strings.ToUpper(pieces[0])
		}

		if len(pieces) > 1 {
			atmValue = pieces[1]
		}
		msg.atmHeaders[atmHeader] = atmValue

		c.logInfo("atmHeaders >>  key: %s,  value :  %s \n", atmHeader, atmValue)

		if atmHeader == "SUBJECT" {
			msg.subject = atmValue
		}
		if atmHeader == "TO" {
			msg.to = atmValue

			//if !strings.Contains(atmValue, getWhitelistMailDomain()) {
			//	log.Println("Warning:  to email not in whitelist , ignored to email: ", atmValue)
			//	return
			//}

		}
		if atmHeader == "FROM" {
			msg.from = atmValue
		}
		if atmHeader == "DATE" {
			msg.date = atmValue
		}
	}

	c.logInfo("Done ARPA text message headers, reading body")

	msg.body, err = c.readToEndOfBody()
	if err != nil {
		c.logError(err)
		return
	}

	c.logInfo("Got body (%d bytes)", len(msg.body))

	if len(msg.body) < 1024 {
		log.Println("Body string : ", msg.body)
	}

	go func() {
		body_file := path.Join(BASE_DIR, "mail_attachments", time.Now().Format("20060102150405")+".txt")
		log.Println("ready to write body to file :", body_file)
		err := ioutil.WriteFile(body_file, []byte(msg.body), 0644)
		if err != nil {
			log.Println("ERR:  Write body file err, ", err)
		}
	}()

	err = c.writeLine("250 OK")
	if err != nil {
		c.logError(err)
		return
	}

	c.conn.Close()
	c.logInfo("Connection closed, completed.")

	//post proces
	go func() {

		//decode headers
		dec := new(mime.WordDecoder)
		from, _ := dec.DecodeHeader(msg.from)
		to, _ := dec.DecodeHeader(msg.to)
		subject, _ := dec.DecodeHeader(msg.subject)

		if strings.TrimSpace(from) == "" {
			from = msg.smtpCommands["MAIL FROM"]
		}

		if strings.TrimSpace(to) == "" {
			to = msg.smtpCommands["RCPT TO"]
		}

		c.logInfo("Date: %s\n", msg.date)
		c.logInfo("From : %s\n", from)
		c.logInfo("To: %s\n", to)
		c.logInfo("Subject: %s\n", subject)

		//parse body.
		mediaType, m_params, err := mime.ParseMediaType(msg.atmHeaders["CONTENT-TYPE"])
		log.Println("debug >>>  parse media", mediaType, ", err = ", err)

		list := arraylist.New()
		if err == nil && strings.HasPrefix(mediaType, "multipart/") {
			log.Println("Ready to parse multipart MIME message")

			ParsePart(strings.NewReader(msg.body), m_params["boundary"], 1, list)

			log.Println("ParsePart result >> list.size: ", list.Size())
		} else {
			fallbackContentType := msg.atmHeaders["CONTENT-TYPE"]
			if fallbackContentType == "" {
				fallbackContentType = "text/plain; charset=UTF-8"
			}

			tmpBodyPart := BodyPart{}
			DecodeContent(msg.atmHeaders["CONTENT-TRANSFER-ENCODING"], []byte(msg.body), false, &tmpBodyPart, "")

			log.Println("unknown body content-type , so use plain string.")
			list.Add(BodyPart{
				IsFile:        false,
				ContentType:   fallbackContentType,
				ContentOrPath: tmpBodyPart.ContentOrPath,
			})
		}

		//save to db
		params := url.Values{}
		params.Add("from_mail", from)
		params.Add("to_mail", to)
		params.Add("send_date", msg.date)
		params.Add("subject", subject)
		bb, err := list.ToJSON()
		if err != nil {
			log.Println("body to json string error:", err)
			bb = []byte("<to json err>")
		}
		params.Add("full_body", string(bb))

		//fmt.Println(params.Encode())
		resp, err := CallPyFunc("sys_save_email", params)
		log.Println("/tables/email_inbox/save result : ", resp, " , err: ", err)

		log.Println("parse email body complete.")

		//c.logInfo("Message:\n%s\n", msg.body)

	}()
}

func StartMailServer() {
	l, err := net.Listen("tcp", "0.0.0.0:25")
	if err != nil {
		panic(err)
	}
	defer l.Close()

	logInfo("Listening 25")

	id := 0
	for {
		conn, err := l.Accept()
		if err != nil {
			logError(err)
			continue
		}

		id += 1
		c := connection{conn, id, nil}
		go c.handle()
	}
}
