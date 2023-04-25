<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      tg: null,
    }
  },
  created () {
    this.tg = window.Telegram.WebApp;
    if (this.tg) this.tg.ready()
  }
};
</script>

<style lang="scss">
  @import './sass/style.scss';
  @import url('https://fonts.googleapis.com/css?family=Great+Vibes&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Black+Han+Sans&display=swap');
  body * {
    list-style: none;
    font-family: 'Noto Sans TC', sans-serif;
  }
  .great_vibes-style {
    font-family: 'Great Vibes', cursive;
  }
  .text-indent {
    text-indent: 2rem;
  }
</style>
