package main

import (
	"embed"
	"gogo/lorca"
	"io/fs"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"runtime"
	"time"
)

//go:embed www
var www embed.FS

//go:embed www/shell.html
var shellHtml string

//存放临时上传的文件(窗口关闭后删除）
var TEMP_FILES_DIR = ""

func genTmpUploadFilesDir() {
	if os.Getenv("DISABLE_UI") == "" {
		tmp, err := os.MkdirTemp("", "gogo_files")
		if err != nil {
			log.Println("getTmpUploadFilesDir error", err)
			return
		}
		TEMP_FILES_DIR = tmp
	} else {
		//run in docker or linux , use /tmp
		TEMP_FILES_DIR = "/tmp"
		os.Mkdir(TEMP_FILES_DIR, 0777)

	}

	if os.Getenv("NO_LOG_FILE") == "" {
		//设置log输出到文件
		file := filepath.Join(TEMP_FILES_DIR, "message.txt")
		logFile, err := os.OpenFile(file, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0777)
		if err != nil {
			log.Println(err)
			return
		}
		log.SetOutput(logFile) // 将文件设置为log输出的文件
		log.SetPrefix("[gogo]")
		log.SetFlags(log.LstdFlags | log.Lshortfile | log.LUTC)

	}

	log.Println("temp files dir :", TEMP_FILES_DIR)

}

var ui lorca.UI

func main() {

	//open browser window.
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

	//创建临时文件目录
	genTmpUploadFilesDir()

	//http & file server
	fsys, _ := fs.Sub(www, "www")
	http.Handle("/", NoCache(http.FileServer(http.FS(fsys))))

	//绑定视图模板
	http.HandleFunc("/views/", handleTemplates)

	//处理api请求
	http.HandleFunc("/api/", handleAPI)

	//处理文件下载
	http.Handle("/files/", NoCache(http.StripPrefix("/files/", http.FileServer(http.Dir(TEMP_FILES_DIR)))))

	ln, err := net.Listen("tcp", "0.0.0.0:9999")
	if err != nil {
		log.Fatal(err)
		ui.Close()
	}
	//get port
	log.Println("Using port:", ln.Addr().(*net.TCPAddr).Port)

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
