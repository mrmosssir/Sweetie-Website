<template>
  <div class="flex items-center gap-x-4">
    <a v-for="category in categories" :key="category.id">
      <img :src="category.image" :alt="category.name" class="w-24 h-24 object-cover rounded-full cursor-pointer" />
      <p class="text-gray-700 text-sm text-center mt-2">{{ category.name }}</p>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import type { Category } from "@/types/category";
import type { ProductSimple } from "@/types/product";
import { getCategoryApi } from "@/request/category";
import { getHotProductsApi, getNewProductsApi } from "@/request/product";

const categories = ref<Category[]>([]);
const hotProducts = ref<ProductSimple[]>([]);
const newProducts = ref<ProductSimple[]>([]);

const handleFetchData = async () => {
  try {
    const modules = await Promise.all([getCategoryApi(), getHotProductsApi(), getNewProductsApi()]);
    categories.value = modules[0];
    hotProducts.value = modules[1];
    newProducts.value = modules[2];
  } catch (error) {
    console.error("Failed to fetch home data:", error);
  }
};

handleFetchData();
</script>
