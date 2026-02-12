<template>
  <nav class="flex items-center gap-x-2 text-sm">
    <template v-for="(item, index) in list" :key="index">
      <div class="inline text-gray-500" v-if="index !== list.length - 1">
        <router-link :to="item.path">{{ item.name }}</router-link>
        <span class="ml-2">/</span>
      </div>
      <span v-else class="text-[#477182]">{{ item.name }}</span>
    </template>
  </nav>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";

export type BreadItem = {
  path: string;
  name: string;
};

const props = defineProps<{
  list: BreadItem[];
}>();
</script>
