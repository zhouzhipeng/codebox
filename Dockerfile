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



FROM zhouzhipeng/pytool-base:e929

EXPOSE 9999

ENV IN_DOCKER=1 \
    START_PYTHON_SERVER=1 \
    ENV=prod \
    PYTHONUNBUFFERED=1 \
    ENABLE_LOG_FILE=1

WORKDIR /app

COPY --from=BuildImage /app/dist /tmp

# copy source code.
COPY pytool /app

# install dependencies (most should already  be installed in base.Dockerfile)
RUN pip install -r requirements.txt

ENTRYPOINT ["/tmp/gogo"]