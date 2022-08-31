
set -eux

#rm -rf dist

#echo "$(date +%F\ %T)" >  static/time.txt

# end build python exe file

git pull

cp -r "C:\Users\zhouzhipeng\AppData\Local\Temp\gogo_files\gogo.db" bin/gogo.db
cp -r "C:\Users\zhouzhipeng\AppData\Local\Temp\gogo_files\userdata.db.zip" bin/userdata.db.zip



git add .
git commit -am "$1"

git push




# start build python exe file


if [ "$(uname)" == "Darwin" ] ; then
# Mac OS X 操作系统
./build-macos.sh
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ] ; then
# GNU/Linux操作系统
echo "not supported yet!"
elif [ "$(expr substr $(uname -s) 1 5)" == "MINGW" ] ; then
# Windows NT操作系统
./build-windows.sh


# pack remote mac
./remote_mac_pack.sh
fi


git pull
git add .
git commit -am "$1"

git push
