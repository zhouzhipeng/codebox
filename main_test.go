package main

import "testing"
import "golang.design/x/clipboard"

func TestClipboard(t *testing.T) {
	// Init returns an error if the package is not ready for use.
	err := clipboard.Init()
	if err != nil {
		panic(err)
	}

	// write/read text format data of the clipboard, and
	// the byte buffer regarding the text are UTF8 encoded.
	//clipboard.Write(clipboard.FmtText, []byte("text datasdf"))
	print(string(clipboard.Read(clipboard.FmtText)))

	// write/read image format data of the clipboard, and
	// the byte buffer regarding the image are PNG encoded.
	//clipboard.Write(clipboard.FmtImage, []byte("image data"))
	//clipboard.Read(clipboard.FmtImage)
}
