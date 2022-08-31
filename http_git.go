package main

import (
	"log"
	"net/http"
	"net/http/cgi"
	"os"
	"os/exec"
	"path"
	"strings"
	"testing"
)

func ServeGitHTTP(response http.ResponseWriter, request *http.Request) {
	projectPath := os.Getenv("GIT_REPO_ROOT")

	if projectPath == "" {
		response.WriteHeader(500)
		response.Write([]byte("please specify GIT_REPO_ROOT firstly."))
		return
	}

	log.Println("git repo root path : ", projectPath)
	log.Println("In comming: " + request.Method)
	log.Println(request.URL)

	cmd := exec.Command("git", "--exec-path")
	stdout, err := cmd.Output()

	if err != nil {
		errStr := err.Error()
		log.Println(errStr)
		response.WriteHeader(500)
		response.Write([]byte(errStr))
		return
	}

	// Print the output
	gitCorePath := strings.TrimSuffix(string(stdout), "\n")
	log.Println(gitCorePath)

	//check dir if existed.
	folderInfo, err := os.Stat(path.Join(projectPath, "git"))
	if os.IsNotExist(err) {
		err = os.MkdirAll(path.Join(projectPath, "git"), 0777)
		if err != nil {
			log.Println(err)

			response.WriteHeader(500)
			response.Write([]byte(err.Error()))
			return
		}
	}

	subProjectPath := path.Join(projectPath, "git")
	log.Println(folderInfo)

	//check git clone path is existed or not.
	newprojectPath := strings.Split(request.RequestURI, "/")[2]
	folderInfo, err = os.Stat(path.Join(subProjectPath, newprojectPath))
	if os.IsNotExist(err) {
		//if !strings.Contains(newprojectPath, ".git") {
		//	newprojectPath += ".git"
		//}

		cmd = exec.Command("git", "init", "--bare", path.Join(subProjectPath, newprojectPath))

		stdout, err = cmd.Output()

		if err != nil {
			errStr := err.Error()
			log.Println(errStr)
			response.WriteHeader(500)
			response.Write([]byte(errStr))
			return
		}

		log.Println(string(stdout))
	}

	handler := new(cgi.Handler)
	handler.Path = path.Join(gitCorePath, "git-http-backend")

	handler.Env = append(handler.Env, "GIT_PROJECT_ROOT="+projectPath)
	handler.Env = append(handler.Env, "REMOTE_USER="+"zhou")
	handler.Env = append(handler.Env, "REMOTE_ADDR="+"localhost")
	handler.Env = append(handler.Env, "PGYER_UID="+"zhou")

	handler.Env = append(handler.Env, "GIT_HTTP_EXPORT_ALL=")
	request.Header.Del("REMOTE_USER")
	request.Header.Del("REMOTE_ADDR")
	request.Header.Del("PGYER-REPO")
	request.Header.Del("PGYER-REPO-USER")
	request.Header.Del("PGYER-REPO-ADDR")

	// net/http/cgi/host.go:122
	// Chunked request bodies are not supported by CGI.
	//
	// error: RPC failed; HTTP 400 curl 22 The requested URL returned error: 400
	// fatal: the remote end hung up unexpectedly
	//
	// https://github.com/git/git/blob/master/Documentation/config/http.txt#L216
	// https://gitlab.com/gitlab-org/gitlab/-/issues/17649
	// https://github.com/golang/go/issues/5613
	fixChunked(request)

	handler.ServeHTTP(response, request)

}

func fixChunked(req *http.Request) {
	if len(req.TransferEncoding) > 0 && req.TransferEncoding[0] == `chunked` {
		// hacking!
		req.TransferEncoding = nil
		req.Header.Set(`Transfer-Encoding`, `chunked`)

		// let cgi use Body.
		req.ContentLength = -1
	}
}

// 启动其他程序
// 参数1:targetapp,待启动程序路径+名称
// 参数2:arg,待启动程序传入参数
// 参数3:bsilence ,静默启动标识
func StartOtherApp(targetapp string, arg string, bsilence bool) {

	var temArg []string

	// 隐藏powershell窗口
	temArg = append(temArg, "-WindowStyle")
	temArg = append(temArg, "Hidden")

	// 启动目标程序
	temArg = append(temArg, "-Command")
	temArg = append(temArg, "Start-Process")
	temArg = append(temArg, targetapp)
	// 目标程序参数
	if len(arg) > 0 {
		temArg = append(temArg, "-ArgumentList")
		temArg = append(temArg, arg)
	}

	// 静默启动参数
	if bsilence {
		temArg = append(temArg, "-WindowStyle")
		temArg = append(temArg, "Hidden")

	}
	cmd := exec.Command("PowerShell.exe", temArg...)

	// 启动时隐藏powershell窗口,没有这句会闪一下powershell窗口
	//cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}

	err := cmd.Run()
	if nil != err {
		log.Println(err)
		return
	}

	log.Println("start exe:", targetapp)
}

func TestGitServer(t *testing.T) {

	http.HandleFunc("/git/", ServeGitHTTP)
	err := http.ListenAndServe("0.0.0.0:8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err.Error())
	}
}
