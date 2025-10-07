<template>
  <router-view></router-view>
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

#app {
  overflow-y: hidden;
}
</style>
