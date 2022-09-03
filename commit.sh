#echo "$(date +%F\ %T)" >  static/time.txt

cp -r "C:\Users\zhouzhipeng\AppData\Local\Temp\gogo_files\gogo.db" bin/gogo.db

git add .
git commit -am "$1"

git push