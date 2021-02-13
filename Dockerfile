# FROM node:lts-slim
FROM nikolaik/python-nodejs

RUN apt update \
    && apt -y upgrade \
    && apt install -y ffmpeg

RUN pip3 install youtube_dl

RUN npm install -g forever

WORKDIR /usr/src/app
