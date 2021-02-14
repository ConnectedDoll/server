#!/bin/bash

cd app
npm install

sudo npm install -g @vue/cli
cd web/vue-app
rm -rf node_modules package-lock.json
npm install
npm run build

cd ../../../
docker-compose down
docker-compose build
docker-compose up -d