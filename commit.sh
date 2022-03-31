
set -eux


# start build python exe file
cd pytool

if [ "$(uname)"=="Darwin" ] ; then
# Mac OS X 操作系统
./buildMac.sh
elif [ "$(expr substr $(uname -s) 1 5)"=="Linux" ] ; then
# GNU/Linux操作系统
echo "not supported yet!"
elif [ "$(expr substr $(uname -s) 1 10)"=="MINGW32_NT" ] ; then
# Windows NT操作系统
./buildWin.sh
fi
cd ..

# end build python exe file

echo "$(date +%F\ %T)" >  static/time.txt

git add .
git commit -am "$1"

git push