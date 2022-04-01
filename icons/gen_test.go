package icons

import (
	"fmt"
	"io"
	"os"
	"testing"
)

func TestGenIconWin(t *testing.T) {

	var totalBytes uint64

	var outputStr = ""

	outputStr += fmt.Sprintf("package %s\n\n", "icons")
	outputStr += fmt.Sprintf("var %s []byte = []byte{", "Data")
	bytes, err := os.ReadFile("icon.ico")

	if err != nil && err != io.EOF {
		fmt.Errorf("Error: %v", err)
		return
	}
	for _, b := range bytes {
		if totalBytes%12 == 0 {
			outputStr += fmt.Sprintf("\n\t")
		}
		outputStr += fmt.Sprintf("0x%02x, ", b)
		totalBytes++
	}

	outputStr += fmt.Sprintf("\n}\n\n")

	fmt.Println(outputStr)

	os.WriteFile("iconwin.go", []byte(outputStr), 0777)
}
