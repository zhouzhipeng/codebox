package main

import (
	"fmt"
	"io"
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
