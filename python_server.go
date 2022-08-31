package main

import (
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"time"
)

func StartPythonServer() {
	if os.Getenv("DONT_START_PY") != "" {
		log.Println("DONT_START_PY is true , ignored starting python server.")
		return
	}

	//kill python web server
	if IsPortInUse(8086) {
		log.Println("port 8086 is using, sending kill command...")
		client := http.Client{
			Timeout: 1 * time.Second,
		}
		client.Get("http://127.0.0.1:8086/py/api/killself")
	}

	ex, err := os.Executable()
	if err != nil {
		log.Println(err)
		return
	}
	cwd := filepath.Dir(ex)
	log.Println(" cwd is " + cwd)

	switch runtime.GOOS {
	case "darwin":
		pyWebPath := filepath.Join(cwd, "web")

		cmd := exec.Command(pyWebPath)

		injectEnv(cmd)

		log.Println("python web server started")
		go cmd.Run()

	case "windows":
		pyWebPath := filepath.Join(cwd, "web.exe")
		if os.Getenv("PY_WEB_PATH") != "" {
			pyWebPath = os.Getenv("PY_WEB_PATH")
		}
		cmd := exec.Command(pyWebPath)
		injectEnv(cmd)
		log.Println("win python  web server started")
		go func() {
			err := cmd.Run()
			if err != nil {
				log.Println("python web "+
					"server error : {}", err)
			}
		}()
	default:
		pyWebPath := filepath.Join(cwd, "web")
		cmd := exec.Command(pyWebPath)

		injectEnv(cmd)

		log.Println("python web server started")
		go cmd.Run()

	}

}
