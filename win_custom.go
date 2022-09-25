//go:build windows

package main

func TurnOnGlobalProxy(server string) {
	//err := gosysproxy.SetGlobalProxy(server, "192.*", "172.*", "127.*")
	//if err != nil {
	//	log.Println(err)
	//}
}

func TurnOffGlobalProxy() {
	//err := gosysproxy.Off()
	//if err != nil {
	//	log.Println(err)
	//}
}
