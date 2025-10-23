<template>
  <div class="relative">
    <fa-icon :icon="icon" class="text-lg text-gray-700 cursor-pointer"></fa-icon>
    <span
      v-if="label"
      class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
      >{{ label }}</span
    >
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  icon: Array<string> | string;
  label?: number | string;
}>();
</script>
