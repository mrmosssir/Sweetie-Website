<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "App",
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap");

body * {
  list-style: none;
  font-family: "Noto Sans TC", sans-serif;
}

.text-indent {
  text-indent: 2rem;
}
</style>
