package main

import (
	"fmt"
	"os"
	"path/filepath"
	"testing"
)

func TestClipboard2(t *testing.T) {
	//os.Setenv("CGO_ENABLED", "0")
	//print(clipboard.ReadAll())

	filepath.Walk("/", func(name string, info os.FileInfo, err error) error {
		fmt.Println(name)
		return nil
	})
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
