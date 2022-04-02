//go:build linux

package main

import "log"

func LoadUI() {
	log.Println("Linux Environment detected, no systray ui loaded.")
}
