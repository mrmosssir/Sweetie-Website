<template>
  <div class="grid gap-4 p-3 grid-cols-2 md:grid-cols-4 md:p-8 md:gap-8 xl:grid-cols-6">
    <Product v-for="item in products" :key="item.id" :product="item" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import type { ProductSimple } from "@/types/product";
import { getProductsApi } from "@/request/product";

import Product from "@/components/client/product.vue";

defineOptions({
  name: "ClientShopPage",
});

const currentPage = ref<number>(1);
const products = ref<ProductSimple[]>([]);

onBeforeMount(async () => {
  products.value = await getProductsApi(currentPage.value);
});
</script>
