
set -eux

rm -rf dist


if [ "$(git status  | grep pytool)" != "" ] ; then
  echo "pytool change"


  # start build python exe file
  cd pytool

  if [ "$(uname)" == "Darwin" ] ; then
  # Mac OS X 操作系统
  ./buildMac.sh
  elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ] ; then
  # GNU/Linux操作系统
  echo "not supported yet!"
  elif [ "$(expr substr $(uname -s) 1 5)" == "MINGW" ] ; then
  # Windows NT操作系统
  ./buildWin.sh
  fi
  cd ..

  # end build python exe file

fi



echo "$(date +%F\ %T)" >  static/time.txt

git add .
git commit -am "$1"

git push