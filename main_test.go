package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"testing"
)

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
func TestTest2(t *testing.T) {

	testDownload()
}
func TestTest(t *testing.T) {
	var files []string

	root := "/Users/zhouzhipeng/Downloads"

	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {

		if err != nil {

			fmt.Println(err)
			return nil
		}

		if !info.IsDir() && (filepath.Base(path) == "ffmpeg" || filepath.Base(path) == "ffmpeg.exe") {
			files = append(files, path)
			println(path)
			return nil
		}

		return nil
	})

	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		fmt.Println(file)
	}
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
