docker build -t gogo .

docker rm -f gogo-test
docker run -d -p 9998:9999 --name gogo-test -e DISABLE_UI=1 gogo