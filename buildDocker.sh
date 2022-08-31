#!/bin/bash


docker build -t zhouzhipeng/gogo .
docker rm -f gogo-test
docker run --name gogo-test -p 9998:80  zhouzhipeng/gogo
docker cp gogo-test:/app/gogo bin/debian/gogo
docker cp gogo-test:/app/web bin/debian/web