<template>
  <div class="overflow-x-auto mt-4">
    <div class="flex items-center gap-x-4 w-fit mx-auto">
      <a v-for="category in categories" :key="category.id" class="cursor-pointer shrink-0">
        <lazy-image :path="category.image" :width="150" :height="150" class="w-24 h-24 rounded-full" :alt="category.name"></lazy-image>
        <p class="text-gray-700 text-sm text-center mt-2">{{ category.name }}</p>
      </a>
    </div>
  </div>
  <h2 class="text-2xl text-gray-700 text-center mt-12">熱門商品</h2>
  <div class="grid gap-4 mt-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
    <product v-for="hotProduct in hotProducts" :key="hotProduct.id" :product="hotProduct" size="small" :favorite="false" :addCart="false" />
  </div>
  <h2 class="text-2xl text-gray-700 text-center mt-12">新品上市</h2>
  <div class="grid gap-4 mt-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
    <product v-for="newProduct in newProducts" :key="newProduct.id" :product="newProduct" size="small" :favorite="false" :addCart="false" />
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

import Product from "@/components/client/product.vue";

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
