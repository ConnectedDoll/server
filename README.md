# ConnectedDoll サーバー

# docker-compose

# GCP VM インスタンス

## SSH 接続
```
openssl rsa -in ~/.ssh/google_compute_engine -outform pem > google_compute_engine.pem
chmod 600 google_compute_engine.pem

ssh -i ~/.ssh/google_compute_engine.pem nobuyukifurukawa@34.123.221.176
```

## Docker

```
sudo apt update
sudo apt install -y docker docker-compose
```

## ConnectedDoll サーバー ダウンロード

```
ssh -i ~/.ssh/google_compute_engine.pem nobuyukifurukawa@34.123.221.176

mkdir ~/work
sudo apt install -y git
git clone https://github.com/ConnectedDoll/server.git
```

## 起動

```
cd server
chmod +x initialize.sh
./initialize.sh

# docker-compose build
# docker-compose up -d
# docker-compose logs -f
```
