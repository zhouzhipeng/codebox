set -eux

cd pytool
./buildWin.sh
cd ..


rm -rf dist/gogo.exe
CGO_ENABLED=1 GOOS=windows go build -ldflags "-H windowsgui" -o dist/gogo.exe

cp pytool/dist/web.exe dist/web.exe

#cd dist && zip -r gogo_win.zip *.exe && rm -rf *.exe