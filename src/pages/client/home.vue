<template>
  <banner :list="advertises" />
  <div class="flex justify-center items-center gap-x-4 mt-4">
    <a v-for="category in categories" :key="category.id" class="cursor-pointer">
      <lazy-image :path="category.image" :width="150" :height="150" class="w-24 h-24 rounded-full" :alt="category.name"></lazy-image>
      <p class="text-gray-700 text-sm text-center mt-2">{{ category.name }}</p>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import type { Category } from "@/types/category";
import type { ProductSimple } from "@/types/product";
import type { Advertise } from "@/types/advertise";
import { getCategoryApi } from "@/request/category";
import { getHotProductsApi, getNewProductsApi } from "@/request/product";
import { getAdvertiseApi } from "@/request/advertise";

import LazyImage from "@/components/lazyImage.vue";
import Banner from "@/components/client/banner.vue";

const categories = ref<Category[]>([]);
const hotProducts = ref<ProductSimple[]>([]);
const newProducts = ref<ProductSimple[]>([]);
const advertises = ref<Advertise[]>([]);

const handleFetchData = async () => {
  try {
    const modules = await Promise.all([getCategoryApi(), getHotProductsApi(), getNewProductsApi(), getAdvertiseApi()]);
    categories.value = modules[0];
    hotProducts.value = modules[1];
    newProducts.value = modules[2];
    advertises.value = modules[3];
  } catch (error) {
    console.error("Failed to fetch home data:", error);
  }
};

handleFetchData();
</script>
