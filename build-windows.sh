set -eux
rm -rf dist/gogo.exe
GOOS=windows go build -ldflags "-H windowsgui" -o dist/gogo.exe
