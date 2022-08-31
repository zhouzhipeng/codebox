# tag 来源： md5 base.Dockerfile 前四位
FROM zhouzhipeng/pytool-base:709c

ARG  PORT=8080
EXPOSE ${PORT}

ENV ENV=prod

WORKDIR /app

# copy source code.
COPY . .

# install dependencies (most should already  be installed in base.Dockerfile)
RUN pip install -r requirements.txt


CMD python web.py



