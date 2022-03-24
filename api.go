package main

import (
	"embed"
	"fmt"
	"github.com/atotto/clipboard"
	"html/template"
	"io"
	"net"
	"net/http"
	"os"
	"path/filepath"
)

func fileUpload(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(32 << 20) //maxMemory

	file, handler, err := r.FormFile("upfile")

	if err != nil {

		fmt.Println(err)

		return

	}

	defer file.Close()

	//os.Mkdir("./files/", 0777)
	f, err := os.OpenFile(filepath.Join(TEMP_FILES_DIR, handler.Filename), os.O_WRONLY|os.O_CREATE, 0666)

	if err != nil {

		fmt.Println(err)

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

type Todo struct {
	Title string
	Done  bool
}

type TodoPageData struct {
	PageTitle string
	Todos     []Todo
}

//go:embed www/views
var views embed.FS

func handleTemplate(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFS(views, "www/views/test_template.html"))

	data := TodoPageData{
		PageTitle: "My TODO list",
		Todos: []Todo{
			{Title: "Task 1", Done: false},
			{Title: "Task 2", Done: true},
			{Title: "Task 3", Done: true},
		},
	}
	tmpl.Execute(w, data)
}

func getLocalIP(w http.ResponseWriter, r *http.Request) {

	//获取ip
	addrs, err := net.InterfaceAddrs()

	if err != nil {
		fmt.Println(err)
		fmt.Fprintf(w, "127.0.0.1")
	}
	for _, address := range addrs {

		// 检查ip地址判断是否回环地址
		if ipnet, ok := address.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() != nil {
				fmt.Println(ipnet.IP.String())
				fmt.Fprintf(w, ipnet.IP.String())
				break
			}

		}
	}

}
