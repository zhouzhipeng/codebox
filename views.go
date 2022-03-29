package main

import (
	"embed"
	"fmt"
	"github.com/skip2/go-qrcode"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

type Todo struct {
	Title string
	Done  bool
}

type TodoPageData struct {
	PageTitle string
	Todos     []Todo
}

//go:embed views
var views embed.FS

var MEDIA_PATH = ""

func handleTemplates(w http.ResponseWriter, r *http.Request) {

	switch r.URL.Path {
	case "/views/test":
		data := TodoPageData{
			PageTitle: "My TODO list",
			Todos: []Todo{
				{Title: "Task 1", Done: false},
				{Title: "Task 2", Done: true},
				{Title: "Task 3", Done: true},
			},
		}

		tmpl := template.Must(template.ParseFS(views, "views/test.html"))
		tmpl.Execute(w, data)
	case "/views/media_open":
		data := map[string]interface{}{}

		if r.Method == "POST" {
			if MEDIA_PATH == "" {

				r.ParseForm()
				MEDIA_PATH = r.FormValue("path")
				log.Println("media path is " + MEDIA_PATH)

				if _, err := os.Stat(MEDIA_PATH); os.IsNotExist(err) {
					// path/to/whatever does not exist
					data["showlink"] = false
					data["msg"] = "invalid path!"
				} else {

					http.Handle("/media/", http.StripPrefix("/media/", http.FileServer(http.Dir(MEDIA_PATH))))
					http.HandleFunc("/media/index", func(writer http.ResponseWriter, request *http.Request) {
						dirs, _ := ioutil.ReadDir(MEDIA_PATH)
						html := ""
						for _, info := range dirs {
							if !info.IsDir() || strings.HasPrefix(info.Name(), ".") {
								continue
							}
							html += fmt.Sprintf(`
				
<a href="%s" style="
    display: inline-block;    width: 200px;text-align: center;
">
					<img src="/static/img/folder.jpg" style="
    width: 200px;
    display: inline-block;
">
					<span style="
">%s</span>
					</a>
`, "/media/"+info.Name(), info.Name())
						}

						fmt.Fprintf(writer, html)
					})

					data["msg"] = "open ok!"

				}

			} else {
				data["msg"] = "already set, restart app to reset!"
			}

		} else {
			data["showlink"] = false

		}

		data["path"] = MEDIA_PATH
		link := "http://" + getLocalIPInternal() + ":9999" + "/media/index"
		data["link"] = link
		data["showlink"] = true

		output := filepath.Join(TEMP_FILES_DIR, "qr.png")
		err := qrcode.WriteFile(link, qrcode.Medium, 256, output)

		data["qrcode"] = "/files/qr.png"

		log.Println(err)
		tmpl := template.Must(template.ParseFS(views, "views/media_open.html"))
		tmpl.Execute(w, data)

	case "/views/video_thumbnail":
		data := map[string]interface{}{}

		if r.Method == "POST" {
			ExecPath := r.FormValue("ExecPath")
			VideoPath := r.FormValue("VideoPath")
			SecondsInput := r.FormValue("SecondsInput")

			//回显数据
			data["ExecPath"] = ExecPath
			data["VideoPath"] = VideoPath
			data["SecondsInput"] = SecondsInput

			go func() {
				os.Mkdir(filepath.Join(VideoPath, "images"), 0777)
				files, _ := ioutil.ReadDir(VideoPath)

				for _, fi := range files {

					if !fi.IsDir() && !strings.HasPrefix(fi.Name(), ".") && strings.HasSuffix(fi.Name(), ".mp4") {

						outputFile := filepath.Join(VideoPath, "images", fi.Name()+".jpg")

						if FileExist(outputFile) {
							log.Println("file " + fi.Name() + "  has already generated thumbnails. skipped!")
							return
						}
						cmd := exec.Command(ExecPath,
							"-i", filepath.Join(VideoPath, fi.Name()),
							"-ss", "00:"+SecondsInput+".000",
							"-vframes", "1",
							outputFile,
						)
						cmd.Stdout = log.Writer()
						cmd.Stderr = log.Writer()
						cmd.Run()

					}
				}

				//生成html
				ghtml := ""
				for _, fi := range files {
					if !fi.IsDir() && !strings.HasPrefix(fi.Name(), ".") && strings.HasSuffix(fi.Name(), ".mp4") {
						ghtml += fmt.Sprintf(`  
						<a href="%s" >
						<img src="%s" style="width: 600px" />
						</a>`, fi.Name(), filepath.Join("images", fi.Name()+".jpg"))
					}
				}

				os.WriteFile(filepath.Join(VideoPath, "index.html"), []byte(ghtml), 0777)

				log.Println("=========== completed generating video thumbnails =============")
			}()

			data["Msg"] = "处理中，请通过日志观察进度!"

		}

		tmpl := template.Must(template.ParseFS(views, "views/video_thumbnail.html"))
		tmpl.Execute(w, data)

	default:
		w.WriteHeader(404)
	}

}

func indexPage(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		data := map[string]interface{}{
			"IsLocal": os.Getenv("IN_DOCKER") == "",
		}

		tmpl := template.Must(template.ParseFS(views, "views/index.html"))
		tmpl.Execute(w, data)
	} else {
		w.WriteHeader(404)
	}
}

func FileExist(path string) bool {
	_, err := os.Lstat(path)
	return !os.IsNotExist(err)
}
