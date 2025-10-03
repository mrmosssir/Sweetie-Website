<template>
  <ul class="flex items-center gap-2">
    <li
      v-for="(item, index) in routerHistory"
      :key="item.path"
      class="flex items-center gap-2 text-gray-500"
    >
      <router-link
        :to="item.path"
        class="text-sm"
        :class="{ 'text-[#477182]': index === routerHistory.length - 1 }"
        >{{ item.title }}</router-link
      >
      <fa-icon v-if="index < routerHistory.length - 1" icon="greater-than" class="text-[8px]" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

defineOptions({
  name: "AdminBreadcrumb",
});

const router = useRouter();

const routerHistory = computed(() => {
  return [...router.currentRoute.value.matched].map((item) => ({
    title: item.meta?.title,
    path: item.path,
  }));
});
</script>
