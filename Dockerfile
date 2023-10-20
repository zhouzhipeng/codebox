FROM golang:1.21 AS BuildGolangImage
WORKDIR /app

COPY . .

RUN ./build-golang-linux.sh


FROM python:3.11-bullseye AS BuildPythonImage
WORKDIR /app
COPY pytool .

RUN ./buildLinux.sh


FROM debian:bullseye AS RuntimeImage

ENV MAIN_PORT=80\
    HTTPS_PORT=443 \
    ENABLE_AUTH=true \
    TROJAN_PASSWORD=123456 \
    AUTO_REDIRECT_TO_HTTPS=true \
    WHITELIST_ROOT_DOMAINS=zhouzhipeng.com \
    START_MAIL_SERVER=false \
    START_TROJAN_PROXY=false \
    START_443_SERVER=false

EXPOSE ${MAIN_PORT} ${HTTPS_PORT}

WORKDIR /app

COPY --from=BuildGolangImage /app/dist/codebox codebox
COPY --from=BuildPythonImage /app/dist/web  web


ENTRYPOINT /app/codebox
