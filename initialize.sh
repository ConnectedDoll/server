#!/bin/bash

cd app
npm install

sudo npm install -g @vue/cli
cd web/vue-app
npm run build

cd ../../../
docker-compose down
docker-compose build
docker-compose up -d