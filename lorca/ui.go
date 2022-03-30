package lorca

import (
	"fmt"
	"io/ioutil"
	"log"
)

// UI interface allows talking to the HTML5 UI from Go.
type UI interface {
	Done() <-chan struct{}
	Close() error
}

type ui struct {
	chrome *chrome
	done   chan struct{}
	tmpDir string
}

//https://peter.sh/experiments/chromium-command-line-switches/
var defaultChromeArgs = []string{
	"--disable-background-networking",
	"--disable-background-timer-throttling",
	"--disable-backgrounding-occluded-windows",
	"--disable-breakpad",
	"--disable-client-side-phishing-detection",
	"--disable-default-apps",
	"--disable-dev-shm-usage",
	"--disable-infobars",
	"--disable-extensions",
	"--disable-features=site-per-process",
	"--disable-hang-monitor",
	"--disable-ipc-flooding-protection",
	"--disable-popup-blocking",
	"--disable-prompt-on-repost",
	"--disable-renderer-backgrounding",
	"--disable-sync",
	"--disable-translate",
	"--disable-windows10-custom-titlebar",
	"--metrics-recording-only",
	"--no-first-run",
	"--no-default-browser-check",
	"--safebrowsing-disable-auto-update",
	//"--enable-automation",
	"--password-store=basic",
	"--use-mock-keychain",
	"--disk-cache-size=1",
	"--no-startup-window",
}

// New returns a new HTML5 UI for the given URL, user profile directory, window
// size and other options passed to the browser engine. If URL is an empty
// string - a blank page is displayed. If user profile directory is an empty
// string - a temporary directory is created and it will be removed on
// ui.Close(). You might want to use "--headless" custom CLI argument to test
// your UI code.
func New(url, dir string, width, height int, customArgs ...string) (UI, error) {
	if url == "" {
		url = "data:text/html,<html></html>"
	}
	tmpDir := ""
	if dir == "" {
		name, err := ioutil.TempDir("", "gogo")
		if err != nil {
			return nil, err
		}
		dir, tmpDir = name, name
	}
	args := append(defaultChromeArgs, fmt.Sprintf("--app=%s", url))
	args = append(args, fmt.Sprintf("--user-data-dir=%s", dir))
	args = append(args, fmt.Sprintf("--window-size=%d,%d", width, height))
	args = append(args, customArgs...)
	//args = append(args, "--remote-debugging-port=0")

	log.Println(args)

	chrome, err := newChromeWithArgs(ChromeExecutable(), args...)
	done := make(chan struct{})
	if err != nil {
		return nil, err
	}

	go func() {
		chrome.cmd.Wait()
		close(done)
	}()
	return &ui{chrome: chrome, done: done, tmpDir: tmpDir}, nil
}

func (u *ui) Done() <-chan struct{} {
	return u.done
}

func (u *ui) Close() error {
	log.Println("ui Close...")

	// ignore err, as the chrome process might be already dead, when user close the window.
	u.chrome.kill()

	//if u.tmpDir != "" {
	//	if err := os.RemoveAll(u.tmpDir); err != nil {
	//		return err
	//	}
	//
	//	log.Println("ui tmpDir removed : ", u.tmpDir)
	//
	//}

	<-u.done
	return nil
}
