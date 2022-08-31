set -eux


git pull
cp -r "C:\Users\zhouzhipeng\AppData\Local\Temp\gogo_files\gogo.db" bin/gogo.db

git add .
git commit -am "update db"
git push
