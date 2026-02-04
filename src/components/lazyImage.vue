<script setup>
import { ref, computed, onMounted } from "vue";
import { buildSrc, Image as ImageKit } from "@imagekit/vue";

const props = defineProps({
  path: { type: String, required: true },
  width: { type: Number, default: null },
  height: { type: Number, default: null },
  alt: { type: String, default: "" },
});

const isLoaded = ref(false);
const naturalWidth = ref(0);
const naturalHeight = ref(0);

// 計算實際使用的寬高
const actualWidth = computed(() => props.width || naturalWidth.value || 800);
const actualHeight = computed(() => props.height || naturalHeight.value || 600);

// 計算 aspectRatio
const aspectRatio = computed(() => {
  if (props.width && props.height) {
    return `${props.width} / ${props.height}`;
  }
  if (naturalWidth.value && naturalHeight.value) {
    return `${naturalWidth.value} / ${naturalHeight.value}`;
  }
  return "auto";
});

// 圖片未讀取完成時顯示的模糊圖片
const lqipSrc = computed(() => {
  const transformation = [
    {
      blur: 30,
      quality: 20,
    },
  ];
  if (props.width && props.height) {
    transformation[0].width = props.width / 10;
    transformation[0].height = props.height / 10;
  }
  return buildSrc({
    urlEndpoint: import.meta.env.VITE_IMAGE_KIT_URL_ENDPOINT,
    src: props.path,
    transformation,
  });
});

// 真正的圖片
const fullSrc = computed(() => {
  const transformation = [{}];
  if (props.width) transformation[0].width = props.width;
  if (props.height) transformation[0].height = props.height;
  return buildSrc({
    urlEndpoint: import.meta.env.VITE_IMAGE_KIT_URL_ENDPOINT,
    src: props.path,
    transformation,
  });
});

// 圖片載入完成的處理
const onImgLoad = (event) => {
  const img = event.target;
  if (!props.width || !props.height) {
    naturalWidth.value = img.naturalWidth;
    naturalHeight.value = img.naturalHeight;
  }
  isLoaded.value = true;
};
</script>

<template>
  <div class="relative overflow-hidden bg-[#f0f0f0]" :style="{ aspectRatio }">
    <img :src="lqipSrc" class="absolute top-0 left-0 w-full h-full object-cover z-1 blur-md" :alt="`${alt}-blur`" />
    <img
      :src="fullSrc"
      class="absolute top-0 left-0 w-full h-full object-cover z-2 opacity-0 transition-opacity duration-500 ease-in-out"
      :alt="alt"
      :class="{ 'opacity-100': isLoaded }"
      loading="lazy"
      @load="onImgLoad"
    />
  </div>
</template>

<style scoped></style>
