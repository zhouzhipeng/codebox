
mkdir -p dist

CGO_ENABLED=1 GOOS=windows go build -ldflags "-H windowsgui" -o dist/gogo.exe
