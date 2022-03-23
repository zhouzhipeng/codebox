FROM golang:1.18-stretch AS BuildImage
WORKDIR /app

RUN set -eux ; \
    apt-get update ; \
    apt-get install -y zip

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .
RUN ./build-linux.sh && ./build-macos.sh && ./build-windows.sh



FROM scratch

EXPOSE 9999

ENV DISABLE_UI=1

COPY --from=BuildImage /app/dist /tmp


ENTRYPOINT ["/tmp/gogo"]