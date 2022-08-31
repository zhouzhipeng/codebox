package main

import (
	"fmt"
	"golang.org/x/sys/windows"
	"io"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"syscall"
	"testing"
)

func runMeElevated() {
	verb := "runas"
	exe, _ := os.Executable()
	cwd, _ := os.Getwd()
	args := strings.Join(os.Args[1:], " ")

	verbPtr, _ := syscall.UTF16PtrFromString(verb)
	exePtr, _ := syscall.UTF16PtrFromString(exe)
	cwdPtr, _ := syscall.UTF16PtrFromString(cwd)
	argPtr, _ := syscall.UTF16PtrFromString(args)

	var showCmd int32 = 1 //SW_NORMAL

	err := windows.ShellExecute(0, verbPtr, exePtr, argPtr, cwdPtr, showCmd)
	if err != nil {
		fmt.Println(err)
	}
}

func amAdmin() bool {
	_, err := os.Open("\\\\.\\PHYSICALDRIVE0")
	if err != nil {
		fmt.Println("admin no")
		return false
	}
	fmt.Println("admin yes")
	return true
}
func TestModifyHosts(t *testing.T) {
	log.Println(strings.Contains("www.youtube.com:443", "youtube"))

}

// with go modules enabled (GO111MODULE=on or outside GOPATH)

func TestMysql(t *testing.T) {
	println(writeSql("create table p(name varchar(255),age integer)", "root:123456@tcp(127.0.0.1:3306)/mysql"))
	println(writeSql("insert into p(name,age) values('zz',1)", "root:123456@tcp(127.0.0.1:3306)/mysql"))

	println(querySql("select * from p", "root:123456@tcp(127.0.0.1:3306)/mysql"))

}
func TestGrabDownload(t *testing.T) {
	//resp, err := grab.Get(".", "https://evermeet.cx/ffmpeg/ffmpeg-5.0.zip")
	//if err != nil {
	//	log.Fatal(err)
	//}
	//
	//fmt.Println("Download saved to", resp.Filename)

	//ddTest()
	out, _ := os.Create("mac_ffmpeg-5.0.zip")
	resp, _ := http.Get("https://gitee.com/zzp/files/raw/master/mac_ffmpeg-5.0.zip")
	io.Copy(out, resp.Body)

}
func TestGenStringTemplate(t *testing.T) {

	src := "/Volumes/UNTITLED/VR/所有照片"
	output := "/Volumes/UNTITLED/VR/所有照片"
	ghtml := `<?xml version="1.0" encoding="UTF-8"?>
						<juiceboxgallery
							galleryTitle="Juicebox Lite Gallery"
						>`

	count := 0
	filepath.Walk(src, func(path string, info fs.FileInfo, err error) error {
		if strings.HasSuffix(info.Name(), ".HEIC") || strings.HasSuffix(info.Name(), ".jpg") || strings.HasSuffix(info.Name(), ".png") {
			count++
			ghtml += fmt.Sprintf(strings.ReplaceAll(`  
						
						  <image imageURL="$link"
							thumbURL="$link"
							linkURL="$link"
							linkTarget="_blank">
							<title>Welcome to Juicebox!</title>
						  </image>
						
						`, "$link", strings.TrimLeft(path, "/Volumes/UNTITLED/VR/所有照片/")))

			//tmpl, _ := template.New("").Parse(`
			//
			//			  <image imageURL="images/wide.jpeg"
			//				thumbURL="thumbs/wide.jpeg"
			//				linkURL="images/wide.jpeg"
			//				linkTarget="_blank">
			//				<title>Welcome to Juicebox!</title>
			//			  </image>
			//
			//			`)
			//
			//b := new(strings.Builder)
			//
			//data := map[string]interface{}{
			//	"IsLocal": os.Getenv("IN_DOCKER") == "",
			//}
			//
			//tmpl.Execute(b, data)

		}

		return nil
	})

	fmt.Printf("count: %d", count)
	ghtml += `</juiceboxgallery>`

	os.WriteFile(filepath.Join(output, "config.xml"), []byte(ghtml), 0777)

}
func TestTest(t *testing.T) {

	//proxy := goproxy.NewProxyHttpServer()
	//proxy.Verbose = true
	//log.Fatal(http.ListenAndServe(":8080", proxy))

}

func TestRawHTTPRequest(t *testing.T) {

	resp, err := doRequestWithoutRedirect("http://127.0.0.1:9999/functions/test7", "GET", "", nil)
	log.Println(resp)
	log.Println(err)

}

//func TestClipboard(t *testing.T) {
//	// Init returns an error if the package is not ready for use.
//	err := clipboard.Init()
//	if err != nil {
//		panic(err)
//	}
//
//	// write/read text format data of the clipboard, and
//	// the byte buffer regarding the text are UTF8 encoded.
//	//clipboard.Write(clipboard.FmtText, []byte("text datasdf"))
//	print(string(clipboard.Read(clipboard.FmtText)))
//
//	// write/read image format data of the clipboard, and
//	// the byte buffer regarding the image are PNG encoded.
//	//clipboard.Write(clipboard.FmtImage, []byte("image data"))
//	//clipboard.Read(clipboard.FmtImage)
//}
