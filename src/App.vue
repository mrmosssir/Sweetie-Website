<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
  @import './sass/style.scss';
  @import url('https://fonts.googleapis.com/css?family=Great+Vibes&display=swap');
  body * {
    list-style: none;
    font-family: Microsoft JhengHei;
  }
  .great_vibes-style {
    font-family: 'Great Vibes', cursive;
  }
  .text-indent {
    text-indent: 2rem;
  }
</style>
