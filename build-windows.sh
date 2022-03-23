set -eux
rm -rf dist/gogo.exe
CGO_ENABLED=0 GOOS=windows go build -ldflags "-H windowsgui" -o dist/gogo.exe
