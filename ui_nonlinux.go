//go:build !linux

package main

import (
	"github.com/skratchdot/open-golang/open"
	"gogo/icons"
	"gogo/systray"
	"golang.design/x/hotkey"
	"log"
	"net/http"
	"time"
)

func onReady() {

	hk := hotkey.New([]hotkey.Modifier{hotkey.ModCtrl, hotkey.ModShift}, hotkey.KeyW)
	err := hk.Register()
	if err != nil {
		log.Println("register hot key failed", err)
	}

	// We can manipulate the systray in other goroutines
	go func() {
		systray.SetTemplateIcon(icons.Data, icons.Data)
		systray.SetTitle("GoGo!")
		systray.SetTooltip("A great tool for developers.")

		mUrl := systray.AddMenuItem("Open UI(Ctrl+Shift+W)", "my home")
		mQuitOrig := systray.AddMenuItem("Quit", "Quit the whole app")

		for {
			select {
			case <-mQuitOrig.ClickedCh:
				log.Println("Requesting quit")
				systray.Quit()
				log.Println("Finished quitting")
			case <-mUrl.ClickedCh:
				open.Run("http://127.0.0.1:" + GetMainPort())
			case <-hk.Keydown():
				log.Printf("hotkey: %v is down\n", hk)
				//open ui
				open.Run("http://127.0.0.1:" + GetMainPort())
			case <-hk.Keyup():
				log.Printf("hotkey: %v is up\n", hk)

			}
		}
	}()
}

func onExit() {
	//now := time.Now()
	//ioutil.WriteFile(fmt.Sprintf(`on_exit_%d.txt`, now.UnixNano()), []byte(now.String()), 0644)
	log.Println("menu exited!")

	log.Println("exiting...")

	//通知py server 关闭
	client := http.Client{
		Timeout: 1 * time.Second,
	}
	client.Get("http://127.0.0.1:8086/py/api/killself")

	log.Println("server existed...")

}

func LoadUI() {
	go open.Run("http://127.0.0.1:" + GetMainPort())
	//go mainthread.Init(fn)
	systray.Run(onReady, onExit)
	// register global hot key

}

func fn() {

}