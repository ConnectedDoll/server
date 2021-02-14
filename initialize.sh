#!/bin/bash

cd app
npm install

# GCP Cloud Storage マウント
export GCSFUSE_REPO=gcsfuse-`lsb_release -c -s`
echo "deb http://packages.cloud.google.com/apt $GCSFUSE_REPO main" | sudo tee /etc/apt/sources.list.d/gcsfuse.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -

sudo apt-get update
sudo apt-get install -y gcsfuse

sudo groupadd fuse
sudo usermod -a -G fuse $USER

# マウント
cd ../
mkdir downloads
gcsfuse connected-doll-server-downloads downloads
# fusermount -u downloads

cd ../../
docker-compose down
docker-compose build
docker-compose up -d