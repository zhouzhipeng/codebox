package main

import (
	"embed"
	"fmt"
	"gogo/lorca"
	"io/fs"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"runtime"
)

//go:embed www
var www embed.FS

//go:embed www/shell.html
var shellHtml string

func main() {

	// open ui window
	args := []string{}
	if runtime.GOOS == "linux" {
		args = append(args, "--class=gogo")
	}
	ui, err := lorca.New("data:text/html,"+shellHtml, "", 800, 600, args...)
	if err != nil {
		log.Fatal(err)
	}
	defer ui.Close()

	//http & file server
	fsys, _ := fs.Sub(www, "www")
	http.Handle("/", http.FileServer(http.FS(fsys)))

	//bind api
	http.HandleFunc("/api/window-close", func(w http.ResponseWriter, r *http.Request) {
		//bind browser window close event;
		fmt.Fprintf(w, "ok.")
		ui.Close()
	})

	//处理文件上传
	http.HandleFunc("/api/upload-file", fileUpload)

	//处理文件下载
	http.Handle("/files/", http.StripPrefix("/files/", http.FileServer(http.Dir("./files"))))

	ln, err := net.Listen("tcp", "0.0.0.0:61234")
	if err != nil {
		log.Fatal(err)
	}
	//get port
	fmt.Println("Using port:", ln.Addr().(*net.TCPAddr).Port)

	defer ln.Close()
	go http.Serve(ln, nil)

	// Wait until the interrupt signal arrives or browser window is closed
	sigc := make(chan os.Signal)
	signal.Notify(sigc, os.Interrupt)
	select {
	case <-sigc:
	case <-ui.Done():
	}

	log.Println("exiting...")
}
