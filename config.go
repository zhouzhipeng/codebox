package main

import (
	"embed"
	_ "embed"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"text/template"
)

//go:embed env.txt
var envTxt string

//go:embed config.html
var configHtml string

//go:embed bin/gogo.db
var gogoDB embed.FS

var BASE_DIR = ""

func configureLogPath(parentPath string) {
	//设置log输出到文件
	file := filepath.Join(parentPath, "message.txt")
	//os.Setenv("LOG_FILE", file)
	logFile, err := os.OpenFile(file, os.O_CREATE|os.O_APPEND|os.O_RDWR|os.O_TRUNC, 0777)
	if err != nil {
		log.Println(err)
		return
	}

	//mw := io.MultiWriter(os.Stdout, logFile)
	log.SetOutput(logFile)

	log.SetPrefix("[codebox]")
	log.SetFlags(log.LstdFlags | log.Lshortfile | log.LUTC)

	accessLogFilePath := filepath.Join(parentPath, "access_log.txt")
	accesslogFile, err := os.OpenFile(accessLogFilePath, os.O_CREATE|os.O_APPEND|os.O_RDWR|os.O_TRUNC, 0777)
	if err != nil {
		log.Println(err)
		return
	}
	accessLogger = log.New(accesslogFile, "[codebox]", log.LstdFlags|log.Lshortfile|log.LUTC)

}

var envMap = make(map[string]string)

func StartConfigServer() {
	BASE_DIR = os.Getenv("BASE_DIR")
	if BASE_DIR == "" {
		BASE_DIR = getFixedTempPath()
	}

	os.Setenv("BASE_DIR", BASE_DIR)

	configureLogPath(BASE_DIR)

	//check if existed env.txt
	envTxtPath := filepath.Join(BASE_DIR, "env.txt")

	if _, err := os.Stat(envTxtPath); err == nil {
		log.Println("env.txt File exists ,use it.")
		content, err := os.ReadFile(envTxtPath)
		if err != nil {
			log.Println("read env file error! using default ", err)
		}

		envTxt = string(content)
	} else {
		log.Println("env.txt does not exist,use default.")
	}

	log.Println("base dir :", BASE_DIR)

	//parse  envTxt
	for _, s := range strings.Split(envTxt, "\n") {
		s = strings.TrimSpace(s)
		if s != "" && !strings.HasPrefix(s, "#") {
			cols := strings.SplitN(s, "=", 2)
			if len(cols) != 2 {
				log.Println("warning : env line not valid : ", s)
				continue
			}

			log.Println("env line : ", s)

			//priority : global env > env.txt
			key := strings.TrimSpace(cols[0])
			val := strings.TrimSpace(cols[1])

			if os.Getenv(key) == "" {
				err := os.Setenv(key, val)
				envMap[key] = val
				log.Println("set env : key = ", key, ", val=", val, ", err= ", err)
			} else {
				envMap[key] = os.Getenv(key)
			}

		}
	}

	//update sqlite db path
	var dbpath = filepath.Join(BASE_DIR, "gogo.db")

	if _, err := os.Stat(dbpath); err == nil {
		log.Println("db File exists , ignore init db.")
	} else {
		log.Println("File does not exist, begin to copy db file to tmp path.")
		bytes, _ := gogoDB.ReadFile("bin/gogo.db")
		os.WriteFile(dbpath, bytes, 0777)
	}

	go func() {
		http.ListenAndServe(":28888", http.HandlerFunc(func(w http.ResponseWriter, request *http.Request) {

			if request.URL.Path == "/config" {

				td := Todo{envTxt, "Let's test a template to see the magic."}

				t, err := template.New("todos").Parse(configHtml)
				if err != nil {
					panic(err)
				}
				err = t.Execute(w, td)
				if err != nil {
					panic(err)
				}

			} else if request.URL.Path == "/config/save" {
				s := request.FormValue("s")
				envTxt = s
				err := os.WriteFile(envTxtPath, []byte(s), 0777)
				if err != nil {
					io.WriteString(w, "Save Error :"+err.Error())
				} else {
					io.WriteString(w, "Save Ok.")
				}
			} else if request.URL.Path == "/config/getenv" {
				io.WriteString(w, strings.Join(os.Environ(), "\n"))
			} else {
				io.WriteString(w, "404 not found.")
			}

		}))
	}()

	LoadConfigUI()
}

func getFromEnvMap(key string) string {
	if val, ok := envMap[key]; ok {
		return val
	}
	return ""
}

func ShouldStart443Server() bool {
	return getFromEnvMap("START_443_SERVER") == "true"
}

func ShouldStartMailServer() bool {
	return getFromEnvMap("START_MAIL_SERVER") == "true"
}

func ShouldStartLocalProxyServer() bool {
	return getFromEnvMap("START_TROJAN_PROXY") == "true"
}

func getWhitelistRootDomains() []string {
	return strings.Split(getFromEnvMap("WHITELIST_ROOT_DOMAINS"), ",")
}

func GetMainPort() string {
	return getFromEnvMap("MAIN_PORT")
}

func GetTrojanPassword() string {
	return getFromEnvMap("TROJAN_PASSWORD")
}

func GetHTTPSPort() string {
	return getFromEnvMap("HTTPS_PORT")
}

func getCertCacheDir() string {
	return filepath.Join(BASE_DIR, "cert_cache")
}

func getAutoRedirectHTTPS() bool {
	return getFromEnvMap("AUTO_REDIRECT_TO_HTTPS") == "true"
}

func isEnableProxyPassTxt() bool {
	return getFromEnvMap("ENABLE_PROXY_PASS_TXT") == "true"
}

func isEnableNATProxy() bool {
	return getFromEnvMap("ENABLE_NAT_PROXY") == "true"
}

func getFixedTempPath() string {

	var baseDir string
	configDir, err := os.UserConfigDir()
	baseDir = filepath.Join(configDir, "gogo_files")
	if err != nil {
		log.Println("getFixedTempPath err", err)
		log.Println("using /tmp")
		configDir = "/tmp"
	}
	log.Println("baseDir >>>", baseDir)
	err = os.MkdirAll(baseDir, 0777)
	if err != nil {
		log.Println("getFixedTempPath err", err)
	}

	return baseDir
}
