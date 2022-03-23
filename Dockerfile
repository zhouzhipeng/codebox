FROM golang:1.18-stretch AS BuildImage
WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .
RUN ./build-linux.sh

FROM scratch

EXPOSE 9999

ENV DISABLE_UI=1
RUN mkdir /tmp

COPY --from=BuildImage /app/linux/gogo /bin/gogo
ENTRYPOINT ["/bin/gogo"]