package main

import (
	"embed"
	"html/template"
	"net/http"
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
	default:
		w.WriteHeader(404)
	}

}
