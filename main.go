package main

import (
	"embed"
	"fmt"
	"gogo/lorca"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"runtime"
	"sync"
)

//go:embed www
var fs embed.FS

// Go types that are bound to the UI must be thread-safe, because each binding
// is executed in its own goroutine. In this simple case we may use atomic
// operations, but for more complex cases one should use proper synchronization.
type counter struct {
	sync.Mutex
	count int
}

func (c *counter) Add(n int) {
	c.Lock()
	defer c.Unlock()
	c.count = c.count + n
}

func (c *counter) Value() int {
	c.Lock()
	defer c.Unlock()
	return c.count
}

func main() {
	args := []string{}
	if runtime.GOOS == "linux" {
		args = append(args, "--class=Lorca")
	}
	ui, err := lorca.New(`data:text/html,
			<html>
				<head>
					<title>GoGo!</title>
				</head>
				<body>
					<h1 style="text-align:center;vertical-align:middle">Loading...</h1>
					<script type="text/javascript">
					//window.location.href="http://127.0.0.1:59989/www"
window.addEventListener('beforeunload',async function (e) {
    e.preventDefault();
    e.returnValue = '';
	console.log("browser close...");
	await fetch("http://127.0.0.1:8000/window-close")
});
					</script>
				</body>
			</html>`,
		"", 480, 320, args...)
	if err != nil {
		log.Fatal(err)
	}
	defer ui.Close()

	//bind browser window close event;

	ln_http, err_http := net.Listen("tcp", "127.0.0.1:8000")
	if err_http != nil {
		log.Fatal(err_http)
	}
	defer ln_http.Close()
	go http.Serve(ln_http, nil)
	http.HandleFunc("/window-close", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "hello world")
		ui.Close()
	})

	// Load HTML.
	// You may also use `data:text/html,<base64>` approach to load initial HTML,
	// e.g: ui.Load("data:text/html," + url.PathEscape(html))

	ln, err := net.Listen("tcp", "127.0.0.1:59989")
	if err != nil {
		log.Fatal(err)
	}
	defer ln.Close()
	go http.Serve(ln, http.FileServer(http.FS(fs)))

	// Wait until the interrupt signal arrives or browser window is closed
	sigc := make(chan os.Signal)
	signal.Notify(sigc, os.Interrupt)
	select {
	case <-sigc:
	case <-ui.Done():
	}

	log.Println("exiting...")
}
