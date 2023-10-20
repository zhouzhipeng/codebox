set -eux

go mod download

CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o dist/codebox


cp pytool/dist/web dist/web
cd dist && zip -r9 codebox_linux.zip .