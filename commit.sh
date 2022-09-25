#echo "$(date +%F\ %T)" >  static/time.txt
set -eux

# optional
#cp -r "/tmp/gogo_files/gogo.db" bin/gogo.db

git add .
git commit -am "$1"

git push