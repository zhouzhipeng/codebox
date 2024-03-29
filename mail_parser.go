package main

import (
	"bytes"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"github.com/emirpasic/gods/lists/arraylist"
	"io"
	"io/ioutil"
	"log"
	"mime"
	"mime/multipart"
	"mime/quotedprintable"
	"net/mail"
	"path"
	"strings"
)

// BuildFileName builds a file name for a MIME part, using information extracted from
// the part itself, as well as a radix and an index given as parameters.
func BuildFileName(part *multipart.Part, radix string, index int) (filename string) {

	// 1st try to get the true file name if there is one in Content-Disposition
	filename = part.FileName()
	if len(filename) > 0 {
		return
	}

	// If no defaut filename defined, try to build one of the following format :
	// "radix-index.ext" where extension is comuputed from the Content-Type of the part
	mediaType, _, err := mime.ParseMediaType(part.Header.Get("Content-Type"))
	if err == nil {
		mime_type, e := mime.ExtensionsByType(mediaType)
		if e == nil {
			return fmt.Sprintf("%s-%d%s", radix, index, mime_type[0])
		}
	}

	return

}

type BodyPart struct {
	IsFile        bool
	ContentType   string
	ContentOrPath string
}

// WitePart decodes the data of MIME part and writes it to the file filename.
func WritePart(part *multipart.Part, filename string, list *arraylist.List) {

	// Read the data for this MIME part
	part_data, err := ioutil.ReadAll(part)
	if err != nil {
		log.Println("Error reading MIME part data -", err)
		return
	}

	content_transfer_encoding := strings.ToUpper(part.Header.Get("Content-Transfer-Encoding"))
	content_disposition := strings.ToLower(part.Header.Get("Content-Disposition"))

	is_file := strings.Contains(content_disposition, "attachment")

	bodyPart := BodyPart{}
	bodyPart.IsFile = is_file
	bodyPart.ContentType = part.Header.Get("Content-Type")

	DecodeContent(content_transfer_encoding, part_data, is_file, &bodyPart, filename)

	list.Add(bodyPart)

}

func DecodeContent(content_transfer_encoding string, part_data []byte, is_file bool, bodyPart *BodyPart, filename string) {
	content_transfer_encoding = strings.ToUpper(content_transfer_encoding)
	switch {

	case strings.Compare(content_transfer_encoding, "BASE64") == 0:
		decoded_content, err := base64.StdEncoding.DecodeString(string(part_data))
		if err != nil {
			log.Println("Error decoding base64 -", err)
		} else {
			if !is_file {
				hexStr := hex.EncodeToString(decoded_content)
				//log.Println("Body(hex)>>>  ", hexStr)
				bodyPart.ContentOrPath = hexStr
			} else {
				ioutil.WriteFile(filename, decoded_content, 0644)
				bodyPart.ContentOrPath = filename
			}

		}

	case strings.Compare(content_transfer_encoding, "QUOTED-PRINTABLE") == 0:
		decoded_content, err := ioutil.ReadAll(quotedprintable.NewReader(bytes.NewReader(part_data)))
		if err != nil {
			log.Println("Error decoding quoted-printable -", err)
		} else {
			if !is_file {
				hexStr := hex.EncodeToString(decoded_content)
				//log.Println("Body(hex) >>>  ", hexStr)
				bodyPart.ContentOrPath = hexStr
			} else {
				ioutil.WriteFile(filename, decoded_content, 0644)
				bodyPart.ContentOrPath = filename
			}

		}

	default:

		if !is_file {
			hexStr := hex.EncodeToString(part_data)

			//log.Println("Body(hex)>>>  ", hexStr)
			bodyPart.ContentOrPath = hexStr
		} else {
			ioutil.WriteFile(filename, part_data, 0644)
			bodyPart.ContentOrPath = filename
		}

	}
}

// ParsePart parses the MIME part from mime_data, each part being separated by
// boundary. If one of the part read is itself a multipart MIME part, the
// function calls itself to recursively parse all the parts. The parts read
// are decoded and written to separate files, named uppon their Content-Descrption
// (or boundary if no Content-Description available) with the appropriate
// file extension. Index is incremented at each recursive level and is used in
// building the filename where the part is written, as to ensure all filenames
// are distinct.
func ParsePart(mime_data io.Reader, boundary string, index int, list *arraylist.List) {

	// Instantiate a new io.Reader dedicated to MIME multipart parsing
	// using multipart.NewReader()
	reader := multipart.NewReader(mime_data, boundary)
	if reader == nil {
		return
	}

	log.Println(strings.Repeat("  ", 2*(index-1)), ">>>>>>>>>>>>> ", boundary)

	// Go through each of the MIME part of the message Body with NextPart(),
	// and read the content of the MIME part with ioutil.ReadAll()
	for {

		new_part, err := reader.NextPart()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Println("Error going through the MIME parts -", err)
			break
		}

		//for key, value := range new_part.Header {
		//	log.Println("%s Key: (%+v) - %d Value: (%#v)\n", strings.Repeat("  ", 2*(index-1)), key, len(value), value)
		//}
		log.Println(strings.Repeat("  ", 2*(index-1)), "------------")

		mediaType, params, err := mime.ParseMediaType(new_part.Header.Get("Content-Type"))
		if err == nil && strings.HasPrefix(mediaType, "multipart/") {
			ParsePart(new_part, params["boundary"], index+1, list)
		} else {
			filename := BuildFileName(new_part, boundary, 1)
			filename = path.Join(BASE_DIR, "mail_attachments", filename)
			WritePart(new_part, filename, list)
		}

	}

	log.Println(strings.Repeat("  ", 2*(index-1)), "<<<<<<<<<<<<< ", boundary)

}

// Read a MIME multipart email from stdio and explode its MIME parts into
// separated files, one for each part.
func ParseMail(r io.Reader) {
	m, err := mail.ReadMessage(r)

	if err != nil {
		log.Fatalln("Parse mail KO -", err)
	}

	// Display only the main headers of the message. The "From","To" and "Subject" headers
	// have to be decoded if they were encoded using RFC 2047 to allow non ASCII characters.
	// We use a mime.WordDecode for that.
	dec := new(mime.WordDecoder)
	from, _ := dec.DecodeHeader(m.Header.Get("From"))
	to, _ := dec.DecodeHeader(m.Header.Get("To"))
	subject, _ := dec.DecodeHeader(m.Header.Get("Subject"))
	fmt.Println("From:", from)
	fmt.Println("To:", to)
	fmt.Println("Date:", m.Header.Get("Date"))
	fmt.Println("Subject:", subject)
	fmt.Println("Content-Type:", m.Header.Get("Content-Type"))
	fmt.Println()

	mediaType, params, err := mime.ParseMediaType(m.Header.Get("Content-Type"))
	if err != nil {
		log.Fatal(err)
	}

	if !strings.HasPrefix(mediaType, "multipart/") {
		log.Fatalf("Not a multipart MIME message\n")
	}

	// Recursivey parsed the MIME parts of the Body, starting with the first
	// level where the MIME parts are separated with params["boundary"].
	ParsePart(m.Body, params["boundary"], 1, nil)

}
