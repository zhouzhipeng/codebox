package main

import (
	"bytes"
	"compress/gzip"
	"io/ioutil"
)

func compress(data string) []byte {
	var buf bytes.Buffer
	zw := gzip.NewWriter(&buf)

	zw.Write([]byte(data))
	zw.Close()
	return buf.Bytes()
}

func decompress(data []byte) string {
	zr, _ := gzip.NewReader(bytes.NewReader(data))
	output, _ := ioutil.ReadAll(zr)

	return string(output)
}
