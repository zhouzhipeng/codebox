FROM golang:1.18-stretch AS BuildImage
WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .
RUN ./build-linux.sh
RUN ./build-macos.sh
RUN ./build-windows.sh



FROM scratch

EXPOSE 9999

ENV DISABLE_UI=1

COPY --from=BuildImage /app/dist/gogo /bin/gogo
COPY --from=BuildImage /app/dist/gogo.exe /tmp/gogo.exe

ENTRYPOINT ["/bin/gogo"]