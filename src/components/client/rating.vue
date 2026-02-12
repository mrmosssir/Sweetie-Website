<template>
  <div class="flex items-center gap-x-1">
    <div class="relative w-5 h-6" v-for="(color, index) in rateColors" :key="index">
      <fa-icon :icon="['fas', 'star-half']" :class="[color[0], 'absolute top-1/2 -translate-y-1/2']" />
      <fa-icon :icon="['fas', 'star-half']" :class="[color[1], 'absolute scale-x-[-1] top-1/2 -translate-y-1/2']" />
    </div>
    <p class="text-gray-500 ml-1 mb-0.5">({{ props.rate?.toFixed(1) }})</p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  rate: number;
}>();

const maxRate = 5;

// 星星圖片用的評分，為 0.5 一個單位（未達到 0.5 的部分會進位）
const halfRate = computed(() => {
  return Math.min(5, Math.ceil(props.rate * 2) / 2);
});

// 每半顆星星的顏色
const rateColors = computed(() => {
  const colors: string[][] = [];
  for (let index = 0; index < maxRate; index += 1) {
    const leftHalf = index + 0.5 <= halfRate.value ? "text-yellow-400" : "text-gray-300";
    const rightHalf = index + 1 <= halfRate.value ? "text-yellow-400" : "text-gray-300";
    colors.push([leftHalf, rightHalf]);
  }
  return colors;
});
</script>
