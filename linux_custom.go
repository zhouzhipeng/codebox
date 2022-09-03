//go:build linux

package main

import (
	"log"
)

func TurnOnGlobalProxy(server string) {
	log.Println("Err : not implemented.")
}

func TurnOffGlobalProxy() {
	log.Println("Err : not implemented.")
}

func LoadUI() {
	log.Println("Linux Environment detected, no systray ui loaded.")

	select {}
}

func LoadConfigUI() {
}
