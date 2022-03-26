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



FROM zhouzhipeng/pytool-base:709c

EXPOSE 9999

ENV DISABLE_UI=1 \
    START_PYTHON_SERVER=1 \
    ENV=prod

WORKDIR /app

COPY --from=BuildImage /app/dist /tmp

# copy source code.
COPY pytool /app

# install dependencies (most should already  be installed in base.Dockerfile)
RUN pip install -r requirements.txt

CMD python web.py

ENTRYPOINT ["/tmp/gogo"]