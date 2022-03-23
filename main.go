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

//存放临时上传的文件(窗口关闭后删除）
var TEMP_FILES_DIR = ""

func genTmpUploadFilesDir() {

	tmp, err := os.MkdirTemp("", "gogo_files")
	if err != nil {
		log.Println("getTmpUploadFilesDir error", err)
		return
	}
	TEMP_FILES_DIR = tmp
	log.Println("temp files dir :", TEMP_FILES_DIR)

}

func main() {
	var ui lorca.UI
	if os.Getenv("DISABLE_UI") == "" {
		// open ui window
		args := []string{}
		if runtime.GOOS == "linux" {
			args = append(args, "--class=gogo")
		}
		tmpui, err := lorca.New("data:text/html,"+shellHtml, "", 800, 600, args...)
		if err != nil {
			log.Fatal(err)
			return
		}
		ui = tmpui
	}

	//http & file server
	fsys, _ := fs.Sub(www, "www")
	http.Handle("/", http.FileServer(http.FS(fsys)))

	//bind window close api
	if ui != nil {
		http.HandleFunc("/api/window-close", func(w http.ResponseWriter, r *http.Request) {
			//bind browser window close event;
			fmt.Fprintf(w, "ok.")

			ui.Close()

		})
	}

	genTmpUploadFilesDir()
	//处理文件上传
	http.HandleFunc("/api/upload-file", fileUpload)
	//处理文件下载
	http.Handle("/files/", http.StripPrefix("/files/", http.FileServer(http.Dir(TEMP_FILES_DIR))))

	//剪贴板
	http.HandleFunc("/api/get-clipboard-data", getClipboardData)

	ln, err := net.Listen("tcp", "0.0.0.0:9999")
	if err != nil {
		log.Fatal(err)
		ui.Close()
	}
	//get port
	fmt.Println("Using port:", ln.Addr().(*net.TCPAddr).Port)

	go http.Serve(ln, nil)

	// Wait until the interrupt signal arrives or browser window is closed
	sigc := make(chan os.Signal)
	signal.Notify(sigc, os.Interrupt)
	if ui != nil {
		select {
		case <-sigc:
		case <-ui.Done():
		}
	} else {
		select {
		case <-sigc:
		}
	}

	log.Println("exiting...")

	//关闭服务器
	ln.Close()
	log.Println("server existed...")

	if ui != nil {
		//关闭ui窗口
		ui.Close()
		log.Println("ui window existed...")
	}

	//CLEAN temp files dir
	os.RemoveAll(TEMP_FILES_DIR)
	log.Println("removed TEMP_FILES_DIR: ", TEMP_FILES_DIR)

}
