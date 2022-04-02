
set -eux

#rm -rf dist




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
fi


# end build python exe file

echo "$(date +%F\ %T)" >  static/time.txt

git add .
git commit -am "$1"

git push