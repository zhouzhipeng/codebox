package main

import (
	"embed"
	"html/template"
	"log"
	"net/http"
	"os"
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
			r.ParseForm()
			MEDIA_PATH = r.FormValue("path")
			log.Println("media path is " + MEDIA_PATH)

			if _, err := os.Stat(MEDIA_PATH); os.IsNotExist(err) {
				// path/to/whatever does not exist
				data["showlink"] = false
				data["msg"] = "invalid path!"
			} else {

				http.Handle("/media/", http.StripPrefix("/media/", http.FileServer(http.Dir(MEDIA_PATH))))

				data["msg"] = "open ok!"
				data["link"] = "/media/"
				data["showlink"] = true
			}

		} else {
			data["showlink"] = false

		}

		tmpl := template.Must(template.ParseFS(views, "views/media_open.html"))
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
