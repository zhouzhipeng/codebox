@echo off
go generate
GOOS=windows go build -ldflags "-H windowsgui" -o lorca-example.exe
