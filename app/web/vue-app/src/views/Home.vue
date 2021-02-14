<template>
  <div class="home">
    <Top />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Top from '@/components/Top.vue'; // @ is an alias to /src

@Component({
  components: {
    Top,
  },
})
export default class Home extends Vue {}
</script>
