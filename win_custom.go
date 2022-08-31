//go:build windows

package main

import (
	"github.com/Trisia/gosysproxy"
	"log"
)

func TurnOnGlobalProxy(server string) {
	err := gosysproxy.SetGlobalProxy(server, "192.*", "172.*", "127.*")
	if err != nil {
		log.Println(err)
	}
}

func TurnOffGlobalProxy() {
	err := gosysproxy.Off()
	if err != nil {
		log.Println(err)
	}
}
