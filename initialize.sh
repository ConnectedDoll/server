#!/bin/bash

# GCP Cloud Storage マウント
export GCSFUSE_REPO=gcsfuse-`lsb_release -c -s`
echo "deb http://packages.cloud.google.com/apt $GCSFUSE_REPO main" | sudo tee /etc/apt/sources.list.d/gcsfuse.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -

sudo apt-get update
sudo apt-get install -y gcsfuse

sudo groupadd fuse
sudo usermod -a -G fuse $USER

# 環境変数
cat <<EOT > .env
UID=`id -u`
GID=`id -g`
UNAME=$USER
EOT

cd app
npm install

cd ..
docker-compose down
docker-compose build
docker-compose up -d

# マウント
# cd ..
# mkdir downloads
gcsfuse connected-doll-server-downloads downloads
# fusermount -u downloads
