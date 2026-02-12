<template>
  <div class="embla">
    <div class="embla__viewport" ref="emblaRef">
      <div class="embla__container">
        <div class="embla__slide" v-for="item in list" :key="item.id">
          <router-link :to="item.link || ''">
            <lazy-image :path="item.image" :width="1600" :height="500" class="w-full h-auto" alt="advertise-image" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="embla__dots">
      <button
        v-for="(_, index) in scrollSnaps"
        :key="index"
        class="embla__dot"
        :class="{ 'embla__dot--selected': index === selectedIndex }"
        type="button"
        @click="scrollTo(index)"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import useEmblaCarousel from "embla-carousel-vue";
import { Advertise } from "@/types/advertise";
import LazyImage from "@/components/lazyImage.vue";

defineProps<{
  list: Advertise[];
}>();

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

// Dots 相關狀態
const selectedIndex = ref(0);
const scrollSnaps = ref<number[]>([]);

// 切換到指定 slide
const scrollTo = (index: number) => emblaApi.value?.scrollTo(index);

// 更新選中的 index
const onSelect = () => {
  if (!emblaApi.value) return;
  selectedIndex.value = emblaApi.value.selectedScrollSnap();
};

// 初始化 dots
const onInit = () => {
  if (!emblaApi.value) return;
  scrollSnaps.value = emblaApi.value.scrollSnapList();
  onSelect();
};

onMounted(() => {
  if (!emblaApi.value) return;
  onInit();
  emblaApi.value.on("select", onSelect);
  emblaApi.value.on("reInit", onInit);
});

onUnmounted(() => {
  if (!emblaApi.value) return;
  emblaApi.value.off("select", onSelect);
  emblaApi.value.off("reInit", onInit);
});
</script>

<style lang="scss">
.embla {
  overflow: hidden;
}

.embla__container {
  display: flex;
}

.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
}

.embla__dots {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0;
}

.embla__dot {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.5);
  -webkit-appearance: none;
  appearance: none;
  background-color: rgba(0, 0, 0, 0.2);
  touch-action: manipulation;
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.embla__dot:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

.embla__dot--selected {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
