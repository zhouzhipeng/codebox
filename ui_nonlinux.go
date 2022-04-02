//go:build !linux

package main

import (
	"fmt"
	"github.com/skratchdot/open-golang/open"
	"gogo/icons"
	"gogo/systray"
	"log"
	"net/http"
)

func onReady() {
	systray.SetTemplateIcon(icons.Data, icons.Data)
	systray.SetTitle("Awesome App")
	systray.SetTooltip("Lantern")
	mQuitOrig := systray.AddMenuItem("Quit", "Quit the whole app")
	go func() {
		<-mQuitOrig.ClickedCh
		fmt.Println("Requesting quit")
		systray.Quit()
		fmt.Println("Finished quitting")
	}()

	// We can manipulate the systray in other goroutines
	go func() {
		systray.SetTemplateIcon(icons.Data, icons.Data)
		systray.SetTitle("GoGO!")
		systray.SetTooltip("A great tool for developers.")

		mUrl := systray.AddMenuItem("Open UI", "my home")

		for {
			select {
			case <-mUrl.ClickedCh:
				open.Run("http://127.0.0.1:9999")
			}
		}
	}()
}

func LoadUI() {

	onExit := func() {
		//now := time.Now()
		//ioutil.WriteFile(fmt.Sprintf(`on_exit_%d.txt`, now.UnixNano()), []byte(now.String()), 0644)
		log.Println("menu exited!")

		log.Println("exiting...")

		//通知py server 关闭
		http.Get("http://127.0.0.1:8086/py/api/killself")

		log.Println("server existed...")
	}
	systray.Run(onReady, onExit)

}
