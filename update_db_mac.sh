set -eux


git pull
cp -r /tmp/gogo_files/gogo.db bin/gogo.db
git add .
git commit -am "update db"
git push
