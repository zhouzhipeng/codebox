set -eux

go mod download

CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o dist/gogo
