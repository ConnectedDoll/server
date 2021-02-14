<template>
  <div class="top">
    <section class="section">
      <div class="container">
        <img id='logo' alt="TubeToMp3" src="../assets/logo.png">
        <h1 class="title">YouTubeからMP3へ変換</h1>
        <p class="subtitle">
          このYouTubeコンバーターを使用すれば<br />簡単にMP3プレーヤー、スマフォやPCで再生できるMP3 ファイルをダウンロードできます<br />(YouTube mp3 抽出)。
        </p>
      </div>
    </section>
    <section>
      <div class="columns is-mobile">
        <div class="column is-three-fifths is-offset-one-fifth">
          <div class="field">
            <label class="label">URL</label>
            <div class="control">
              <input class="input" type="text" placeholder="YouTube URL" v-model="url">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="button is-link" type="button" value="変換" @click="clickBrnConvert">
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="field">
        <label class="label">URL</label>
        <div v-if='streamURL != null' class="control">
          <a :href='streamURL' target="_blank">DOWNLOAD</a>
        </div>
      </div>
    </section>    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Api from '@/commons/Api';

@Component
export default class Top extends Vue {
  private url?: string = "";
  private streamURL?: string | null = null;

  clickBrnConvert(event: any) {
    console.log('clickBrnConvert', this.url);
    // 動画IDを抽出
    const videoId = Api.getVideoId(this.url!);
    if (videoId == null) {
      return;
    }
    this.streamURL = null;
    Api.convert(videoId)
      .then((data) => {
        console.log('data', data);
        // /api/stream/:videoid
        this.streamURL = Api.stream(videoId)!;
      })
      .catch((e) => {
        console.log('error', e);
        alert("error "+ e);
      });
  }
}
</script>

<style scoped lang="scss">
#logo {
  width: 200px;
}
</style>
