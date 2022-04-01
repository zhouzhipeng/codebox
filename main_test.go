package main

import (
	"fmt"
	"github.com/getlantern/systray/example/icon"
	"github.com/skratchdot/open-golang/open"

	"gogo/systray"
	"io"
	"io/fs"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

func onReady() {
	systray.SetTemplateIcon(icon.Data, icon.Data)
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
		systray.SetTemplateIcon(icon.Data, icon.Data)
		systray.SetTitle("Awesome App")
		systray.SetTooltip("Pretty awesome棒棒嗒")
		mChange := systray.AddMenuItem("Change Me", "Change Me")
		mChecked := systray.AddMenuItemCheckbox("Unchecked", "Check Me", true)
		mEnabled := systray.AddMenuItem("Enabled", "Enabled")
		// Sets the icon of a menu item. Only available on Mac.
		mEnabled.SetTemplateIcon(icon.Data, icon.Data)

		systray.AddMenuItem("Ignored", "Ignored")

		subMenuTop := systray.AddMenuItem("SubMenuTop", "SubMenu Test (top)")
		subMenuMiddle := subMenuTop.AddSubMenuItem("SubMenuMiddle", "SubMenu Test (middle)")
		subMenuBottom := subMenuMiddle.AddSubMenuItemCheckbox("SubMenuBottom - Toggle Panic!", "SubMenu Test (bottom) - Hide/Show Panic!", false)
		subMenuBottom2 := subMenuMiddle.AddSubMenuItem("SubMenuBottom - Panic!", "SubMenu Test (bottom)")

		mUrl := systray.AddMenuItem("Open UI", "my home")
		mQuit := systray.AddMenuItem("退出", "Quit the whole app")

		// Sets the icon of a menu item. Only available on Mac.
		mQuit.SetIcon(icon.Data)

		systray.AddSeparator()
		mToggle := systray.AddMenuItem("Toggle", "Toggle the Quit button")
		shown := true
		toggle := func() {
			if shown {
				subMenuBottom.Check()
				subMenuBottom2.Hide()
				mQuitOrig.Hide()
				mEnabled.Hide()
				shown = false
			} else {
				subMenuBottom.Uncheck()
				subMenuBottom2.Show()
				mQuitOrig.Show()
				mEnabled.Show()
				shown = true
			}
		}

		for {
			select {
			case <-mChange.ClickedCh:
				mChange.SetTitle("I've Changed")
			case <-mChecked.ClickedCh:
				if mChecked.Checked() {
					mChecked.Uncheck()
					mChecked.SetTitle("Unchecked")
				} else {
					mChecked.Check()
					mChecked.SetTitle("Checked")
				}
			case <-mEnabled.ClickedCh:
				mEnabled.SetTitle("Disabled")
				mEnabled.Disable()
			case <-mUrl.ClickedCh:
				open.Run("https://www.getlantern.org")
			case <-subMenuBottom2.ClickedCh:
				panic("panic button pressed")
			case <-subMenuBottom.ClickedCh:
				toggle()
			case <-mToggle.ClickedCh:
				toggle()
			case <-mQuit.ClickedCh:
				systray.Quit()
				fmt.Println("Quit2 now...")
				return
			}
		}
	}()
}

func TestSysTray(t *testing.T) {
	onExit := func() {
		now := time.Now()
		ioutil.WriteFile(fmt.Sprintf(`on_exit_%d.txt`, now.UnixNano()), []byte(now.String()), 0644)
	}

	systray.Run(onReady, onExit)
}
func TestMysql(t *testing.T) {
	println(writeSql("create table p(name varchar(255),age integer)", "root:123456@tcp(127.0.0.1:3306)/mysql"))
	println(writeSql("insert into p(name,age) values('zz',1)", "root:123456@tcp(127.0.0.1:3306)/mysql"))

	println(querySql("select * from p", "root:123456@tcp(127.0.0.1:3306)/mysql"))

}
func TestGrabDownload(t *testing.T) {
	//resp, err := grab.Get(".", "https://evermeet.cx/ffmpeg/ffmpeg-5.0.zip")
	//if err != nil {
	//	log.Fatal(err)
	//}
	//
	//fmt.Println("Download saved to", resp.Filename)

	//ddTest()
	out, _ := os.Create("mac_ffmpeg-5.0.zip")
	resp, _ := http.Get("https://gitee.com/zzp/files/raw/master/mac_ffmpeg-5.0.zip")
	io.Copy(out, resp.Body)

}
func TestGenStringTemplate(t *testing.T) {

	src := "/Volumes/UNTITLED/VR/所有照片"
	output := "/Volumes/UNTITLED/VR/所有照片"
	ghtml := `<?xml version="1.0" encoding="UTF-8"?>
						<juiceboxgallery
							galleryTitle="Juicebox Lite Gallery"
						>`

	count := 0
	filepath.Walk(src, func(path string, info fs.FileInfo, err error) error {
		if strings.HasSuffix(info.Name(), ".HEIC") || strings.HasSuffix(info.Name(), ".jpg") || strings.HasSuffix(info.Name(), ".png") {
			count++
			ghtml += fmt.Sprintf(strings.ReplaceAll(`  
						
						  <image imageURL="$link"
							thumbURL="$link"
							linkURL="$link"
							linkTarget="_blank">
							<title>Welcome to Juicebox!</title>
						  </image>
						
						`, "$link", strings.TrimLeft(path, "/Volumes/UNTITLED/VR/所有照片/")))

			//tmpl, _ := template.New("").Parse(`
			//
			//			  <image imageURL="images/wide.jpeg"
			//				thumbURL="thumbs/wide.jpeg"
			//				linkURL="images/wide.jpeg"
			//				linkTarget="_blank">
			//				<title>Welcome to Juicebox!</title>
			//			  </image>
			//
			//			`)
			//
			//b := new(strings.Builder)
			//
			//data := map[string]interface{}{
			//	"IsLocal": os.Getenv("IN_DOCKER") == "",
			//}
			//
			//tmpl.Execute(b, data)

		}

		return nil
	})

	fmt.Printf("count: %d", count)
	ghtml += `</juiceboxgallery>`

	os.WriteFile(filepath.Join(output, "config.xml"), []byte(ghtml), 0777)

}
func TestTest(t *testing.T) {
	var files []string

	root := "/Users/zhouzhipeng/Downloads"

	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {

		if err != nil {

			fmt.Println(err)
			return nil
		}

		if !info.IsDir() && (filepath.Base(path) == "ffmpeg" || filepath.Base(path) == "ffmpeg.exe") {
			files = append(files, path)
			println(path)
			return nil
		}

		return nil
	})

	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		fmt.Println(file)
	}
}

//func TestClipboard(t *testing.T) {
//	// Init returns an error if the package is not ready for use.
//	err := clipboard.Init()
//	if err != nil {
//		panic(err)
//	}
//
//	// write/read text format data of the clipboard, and
//	// the byte buffer regarding the text are UTF8 encoded.
//	//clipboard.Write(clipboard.FmtText, []byte("text datasdf"))
//	print(string(clipboard.Read(clipboard.FmtText)))
//
//	// write/read image format data of the clipboard, and
//	// the byte buffer regarding the image are PNG encoded.
//	//clipboard.Write(clipboard.FmtImage, []byte("image data"))
//	//clipboard.Read(clipboard.FmtImage)
//}
