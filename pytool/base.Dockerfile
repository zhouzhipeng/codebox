

FROM python:slim

# install ffmpeg
COPY --from=jrottenberg/ffmpeg:5.0-scratch / /


# install python dependencies (put to the end of current file)
COPY requirements.txt .
RUN pip install -r requirements.txt;



