
set -eux

#./build-linux.sh

echo "$(date)" >  www/static/time.txt

git add .
git commit -am "$1"

git push