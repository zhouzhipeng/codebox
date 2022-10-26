//https://github.com/emersion/go-smtp
package main

import (
	"bytes"
	"errors"
	"github.com/emersion/go-smtp"
	"github.com/emirpasic/gods/lists/arraylist"
	"io"
	"io/ioutil"
	"log"
	"mime"
	"net/mail"
	"net/url"
	"strings"
	"time"
)

// The Backend implements SMTP server methods.
type Backend struct{}

func (bkd *Backend) Login(state *smtp.ConnectionState, username, password string) (smtp.Session, error) {
	//TODO implement me
	return &Session{}, nil
}

func (bkd *Backend) AnonymousLogin(state *smtp.ConnectionState) (smtp.Session, error) {
	//TODO implement me
	return &Session{}, nil
}

// A Session is returned after EHLO.
type Session struct {
	From string
	To   string
}

func isInBlackList(fromMail string) bool {
	ss := staticCache["__blacklist_names"].Body
	if ss != "" {
		for _, name := range strings.Split(ss, ",") {
			name = strings.TrimSpace(name)
			if strings.Contains(fromMail, name) {
				log.Println("hit blacklist , ignore : ", fromMail)
				return true
			}
		}
	}

	return false
}

func (s *Session) Mail(from string, opts smtp.MailOptions) error {
	log.Println("Mail from:", from)
	//check if in blacklist
	if isInBlackList(from) {
		return errors.New("smtp: invalid from mail.")
	}

	s.From = from
	return nil
}

func (s *Session) Rcpt(to string) error {
	log.Println("Rcpt to:", to)
	s.To = to
	return nil
}

func (s *Session) Data(r io.Reader) error {
	bodyBytes, err := ioutil.ReadAll(r)
	if err != nil {
		return err
	}

	log.Println("body lens >>>>>> ", len(bodyBytes))
	if len(bodyBytes) <= 1024 {
		log.Println("Body str : ", string(bodyBytes))
	}

	go func() {

		m, err := mail.ReadMessage(bytes.NewReader(bodyBytes))
		if err != nil {
			log.Println("Err : Parse mail KO -", err)
			return
		}

		//parse headers
		dec := new(mime.WordDecoder)
		from := s.From
		to := s.To

		subject, _ := dec.DecodeHeader(m.Header.Get("Subject"))
		log.Println("From:", from)
		log.Println("To:", to)
		log.Println("Date:", m.Header.Get("Date"))
		log.Println("Subject:", subject)
		log.Println("Content-Type:", m.Header.Get("Content-Type"))
		log.Println("Content-Transfer-Encoding:", m.Header.Get("Content-Transfer-Encoding"))
		log.Println("--------")

		//parse body.
		mediaType, m_params, err := mime.ParseMediaType(m.Header.Get("Content-Type"))
		log.Println("debug >>>  parse media", mediaType, ", err = ", err)

		list := arraylist.New()
		if err == nil && strings.HasPrefix(mediaType, "multipart/") {
			log.Println("Ready to parse multipart MIME message")

			ParsePart(m.Body, m_params["boundary"], 1, list)
			log.Println("ParsePart result >> list.size: ", list.Size())
		} else {
			fallbackContentType := m.Header.Get("Content-Type")
			if fallbackContentType == "" {
				fallbackContentType = "text/plain; charset=UTF-8"
			}

			tmpBodyPart := BodyPart{}

			bodyBytes, err = ioutil.ReadAll(m.Body)
			if err != nil {
				log.Println("Err reading body : ", err)
				return
			}

			DecodeContent(m.Header.Get("Content-Transfer-Encoding"), bodyBytes, false, &tmpBodyPart, "")

			log.Println("not multipart content-type , so use plain string.")
			list.Add(BodyPart{
				IsFile:        false,
				ContentType:   fallbackContentType,
				ContentOrPath: tmpBodyPart.ContentOrPath,
			})
		}

		//save a backup for raw body bytes
		//list.Add(BodyPart{
		//	IsFile:        true,
		//	ContentType:   m.Header.Get("Content-Type"),
		//	ContentOrPath: hex.EncodeToString(bodyBytes),
		//})

		//save to db
		params := url.Values{}
		params.Add("from_mail", from)
		params.Add("to_mail", to)
		params.Add("send_date", m.Header.Get("Date"))
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
	}()
	return nil
}

func (s *Session) Reset() {}

func (s *Session) Logout() error {
	return nil
}

func StartNewMailServer() {
	be := &Backend{}

	s := smtp.NewServer(be)

	s.Addr = ":25"
	s.Domain = "zhouzhipeng.com"
	s.ReadTimeout = 10 * time.Second
	s.WriteTimeout = 10 * time.Second
	s.MaxMessageBytes = 1024 * 1024 * 100
	s.MaxRecipients = 50
	s.AllowInsecureAuth = true
	s.AuthDisabled = true

	log.Println("Starting server at", s.Addr)
	if err := s.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
