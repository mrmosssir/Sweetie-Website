<template>
  <image-kit-provider :url-endpoint="endpoint">
    <router-view></router-view>
  </image-kit-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ImageKitProvider } from "@imagekit/vue";

defineOptions({
  name: "App",
});

const endpoint = computed(() => {
  return import.meta.env.VITE_IMAGE_KIT_URL_ENDPOINT;
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
