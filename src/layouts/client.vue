<template>
  <div class="relative px-4 max-w-7xl mx-auto">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/components/client/header.vue";

defineOptions({
  name: "ClientLayout",
});
</script>
