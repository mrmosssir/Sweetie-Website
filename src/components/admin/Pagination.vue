<template>
  <div class="flex items-center gap-x-2">
    <button
      class="bg-gray-200 text-gray-600 w-8 h-8 rounded"
      :class="[pagination.currentPage <= 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer']"
      :disabled="pagination.currentPage <= 1"
    >
      <fa-icon icon="angle-left" />
    </button>
    <button
      v-for="num in list"
      :key="num"
      @click.prevent="emit('change', num)"
      class="w-8 h-8 rounded cursor-pointer"
      :class="[
        pagination.currentPage == num ? 'bg-[#477182]/80 text-white' : 'bg-gray-200 text-gray-600',
      ]"
    >
      {{ num }}
    </button>
    <button
      class="bg-gray-200 text-gray-600 w-8 h-8 rounded"
      :class="[
        pagination.currentPage >= pagination.totalPages
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer',
      ]"
      :disabled="pagination.currentPage >= pagination.totalPages"
    >
      <fa-icon icon="angle-right" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { Pagination } from "@/types/api";

const props = defineProps({
  pagination: {
    type: Object as () => Pagination,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "change", page: number): void;
}>();

const list = computed(() => {
  const start = Math.max(1, props.pagination.currentPage - 2);
  const end = Math.min(props.pagination.totalPages, props.pagination.currentPage + 2);
  console.log(
    Array.from({ length: end - start + 1 }, (_, i) => start + i),
    "list"
  );
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});
</script>
