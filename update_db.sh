set -eux


git pull
cp -r "C:\Users\zhouzhipeng\AppData\Local\Temp\gogo_files\gogo.db" bin/gogo.db
cp -r "C:\Users\zhouzhipeng\AppData\Local\Temp\gogo_files\userdata.db.zip" bin/userdata.db.zip
git add .
git commit -am "update db"
git push
