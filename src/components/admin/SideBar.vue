<template>
  <nav class="h-full relative">
    <router-link to="/admin" class="relative z-10">
      <h1 class="text-white py-4">SuShop</h1>
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

// export default {
//   name: "SideBar",
//   methods: {
//     changeSearchMode(mode) {
//       this.$store.dispatch("changeSearchMode", mode);
//     },
//   },
// };
</script>
