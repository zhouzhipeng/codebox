FROM python:slim

ARG  PORT=8080
EXPOSE ${PORT}

ENV ENV=prod

WORKDIR /app

# copy source code.
COPY . .

# install dependencies (most should already  be installed in base.Dockerfile)
RUN pip install -r requirements.txt


CMD python web.py



