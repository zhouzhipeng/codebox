set -eux
rm -rf dist/gogo.exe
CGO_ENABLED=0 GOOS=windows go build -ldflags "-H windowsgui" -o dist/gogo.exe

cp pytool/dist/web.exe dist/web.exe

cd dist && zip -r gogo_win.zip *.exe && rm -rf *.exe