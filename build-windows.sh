set -eux

cd pytool
./buildWin.sh
cd ..

mkdir -p dist

rm -rf dist/gogo.exe
CGO_ENABLED=1 GOOS=windows go build -ldflags "-H windowsgui" -o dist/gogo.exe

cp pytool/dist/web.exe dist/web.exe

cp dist/web.exe F:/gogo_bin/web.exe
cp dist/gogo.exe F:/gogo_bin/gogo.exe
#cd dist && zip -r gogo_win.zip *.exe && rm -rf *.exe

# copy db
cp -r "C:\Users\zhouzhipeng\AppData\Local\Temp\gogo_files\gogo.db" bin/gogo.db
cp dist/web.exe bin/win/
cp dist/gogo.exe bin/win/