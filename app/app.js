'use strict';

const express = require('express');
const cors = require('cors')

const fs = require('fs');
const { execSync } = require('child_process')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// ユーザー登録,デバイス登録 等 vue.js 
const VUE_APP_DIR = __dirname + '/web/vue-app';

// MP3 生成ディレクトリ
const DOWNLOADS_DIR = __dirname + '/downloads';

// App
const app = express();
app.use(cors());

// vue
app.use('/img', express.static(VUE_APP_DIR + '/dist/img/'));
app.use('/css', express.static(VUE_APP_DIR + '/dist/css/'));
app.use('/js', express.static(VUE_APP_DIR + '/dist/js/'));
app.get('/', (req, res) => res.sendFile(VUE_APP_DIR + '/dist/index.html'));

// API
app.get('/api/test', function (req, res, next) {
  res.json({result: 'TEST OK'});
});

// YouTube 音声 ダウンロード & MP3変換
// http://192.168.99.109/api/dl/d3_IcaDhcDM
app.get('/api/dl/:videoid', function (req, res, next) {
  const videoid = req.params.videoid

  const fileM4A = DOWNLOADS_DIR + '/' + videoid + '.m4a';
  const fileMP3 = DOWNLOADS_DIR + '/' + videoid + '.mp3';

  // 音声をダウンロード
  if(fs.existsSync( fileM4A ) == false) {  
    const cmdDownloadM4A = 'youtube-dl "https://www.youtube.com/watch?v='+ videoid
                    +'" -f 140'
                    +' -o "' + fileM4A + '"';

    console.log('command', cmdDownloadM4A);
    const stdout = execSync(cmdDownloadM4A);
    console.log(`stdout: ${stdout.toString()}`);
  }

  // MP3 へ変換
  if(fs.existsSync( fileMP3 ) == false) { 
    const cmdConvertMP3 = 'ffmpeg -i "' + fileM4A + '"'
                            + ' -t 60'
                            + ' -ar 44100' 
                            + ' -ab 128k'
                            + ' -acodec libmp3lame' 
                            + ' -f mp3'
                            + ' "' + fileMP3 + '"';

    console.log('command', cmdConvertMP3);
    const stdout = execSync(cmdConvertMP3);
    console.log(`stdout: ${stdout.toString()}`);

    // 変換したので m4a を削除
    if(fs.existsSync( fileM4A )) { 
      fs.unlinkSync(fileM4A);
    }
  }

  res.json({result: 'OK', video_id: videoid});
});

// MP3 ファイルストリーミング
// http://192.168.99.109/api/stream/d3_IcaDhcDM
app.get('/api/stream/:videoid', (req, res) => {
  const videoid = req.params.videoid
  const fileMP3 = DOWNLOADS_DIR + '/' + videoid + '.mp3';
  if(fs.existsSync( fileMP3 ) == false) {
    res.json({result: 'ERROR', message: 'file not found.'}, 404);
    return;
  }

  var stat = fs.statSync(fileMP3);
  res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size
  });

  var readStream = fs.createReadStream(fileMP3);
  readStream.pipe(res);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);