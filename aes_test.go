package main

import (
	"encoding/base64"
	"fmt"
	"testing"
)

func TestAES(t *testing.T) {
	text := "今晚打老虎"
	AesKey := []byte("@zhouzhipeng.com") //秘钥长度为16的倍数
	fmt.Printf("明文: %s\n秘钥: %s\n", text, string(AesKey))
	encrypted, err := AesEncrypt([]byte(text), AesKey)
	if err != nil {
		panic(err)
	}
	fmt.Printf("加密后: %s\n", base64.StdEncoding.EncodeToString(encrypted))
	origin, err := AesDecrypt(encrypted, AesKey)
	if err != nil {
		panic(err)
	}
	fmt.Printf("解密后明文: %s\n", string(origin))
}
