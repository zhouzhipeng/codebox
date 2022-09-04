package main

import (
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
)

func StartPythonServer() {

	//kill python web server
	if IsPortInUse(8086) {
		log.Println("pyserver is already running, ignore.")
		return
	}

	ex, err := os.Executable()
	if err != nil {
		log.Println(err)
		return
	}
	cwd := filepath.Dir(ex)
	log.Println(" cwd is " + cwd)
	pyWebPath := filepath.Join(cwd, "web")

	if runtime.GOOS == "windows" {
		pyWebPath = filepath.Join(cwd, "web.exe")
	}

	cmd := exec.Command(pyWebPath)
	injectEnv(cmd)
	log.Println("python  web server started")
	go func() {
		err := cmd.Run()
		if err != nil {
			log.Println("python webserver error : {}", err)
		}
	}()

}
