package main

import (
	"fmt"
	"github.com/atotto/clipboard"
	"io"
	"log"
	"net"
	"net/http"
	"os"
	"path/filepath"
)

func fileUpload(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(32 << 20) //maxMemory

	file, handler, err := r.FormFile("upfile")

	if err != nil {

		log.Println(err)
		w.WriteHeader(500)
		fmt.Fprintf(w, "SERVER ERROR!"+err.Error())

		return

	}

	defer file.Close()

	//os.Mkdir("./files/", 0777)
	f, err := os.OpenFile(filepath.Join(TEMP_FILES_DIR, handler.Filename), os.O_WRONLY|os.O_CREATE, 0666)

	if err != nil {

		log.Println(err)
		w.WriteHeader(500)
		fmt.Fprintf(w, "SERVER ERROR!"+err.Error())

		return

	}

	io.Copy(f, file)

	fmt.Fprintf(w, "%s", "/files/"+handler.Filename)
}

func getClipboardData(w http.ResponseWriter, r *http.Request) {
	// Init returns an error if the package is not ready for use.
	//err := clipboard.Init()
	//if err != nil {
	//	panic(err)
	//}

	data, _ := clipboard.ReadAll()
	fmt.Fprintf(w, "%s", data)

	/*
		// write/read image format data of the clipboard, and
		// the byte buffer regarding the image are PNG encoded.
		clipboard.Write(clipboard.FmtImage, []byte("image data"))
		clipboard.Read(clipboard.FmtImage)
	*/
}

func getLocalIP(w http.ResponseWriter, r *http.Request) {

	//获取ip
	addrs, err := net.InterfaceAddrs()

	if err != nil {
		log.Println(err)
		fmt.Fprintf(w, "127.0.0.1")
	}
	for _, address := range addrs {

		// 检查ip地址判断是否回环地址
		if ipnet, ok := address.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				log.Println(ipnet.IP.String())
				fmt.Fprintf(w, ipnet.IP.String())
				break
			}

		}
	}

}

func handleAPI(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL.Path)

	switch r.URL.Path {
	case "/api/upload-file":
		fileUpload(w, r)
	case "/api/get-clipboard-data":
		getClipboardData(w, r)
	case "/api/get-local-ip":
		getLocalIP(w, r)
	case "/api/window-close":
		//bind browser window close event;
		fmt.Fprintf(w, "ok.")
		ui.Close()
	default:
		w.WriteHeader(404)
	}
}
