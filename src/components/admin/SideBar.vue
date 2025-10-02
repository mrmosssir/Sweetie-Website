<template>
  <nav class="h-full relative">
    <router-link to="/admin" class="flex flex-col items-center gap-y-1 z-10 mt-2">
      <fa-icon icon="stroopwafel" class="block text-white text-xl"></fa-icon>
      <h1 class="text-white">SuShop</h1>
    </router-link>
    <div
      class="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full flex flex-col justify-center items-center gap-8"
    >
      <router-link
        v-for="item in menu"
        :key="item.name"
        :to="`/admin/${item.path}`"
        class="flex flex-col justify-center items-center gap-1 text-white"
      >
        <fa-icon :icon="item.meta?.icon" />
        <span>{{ item.meta?.title }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

defineOptions({
  name: "AdminSideBar",
});

const router = useRouter();

const menu = computed(() => {
  return router.options.routes.find((route) => route.path === "/admin")?.children || [];
});
</script>
