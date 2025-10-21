<template>
  <div class="grid gap-4 p-3 grid-cols-2 md:grid-cols-3 md:p-8 md:gap-8 xl:grid-cols-5">
    <Product v-for="item in products" :key="item.id" :product="item" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import type { ApiClientProduct } from "@/types/product";
import { getProductsApi } from "@/request/product";

import Product, { type ProductProps } from "@/components/product.vue";

defineOptions({
  name: "ClientShopPage",
});

const currentPage = ref<number>(1);
const products = ref<ProductProps[]>([]);

onBeforeMount(async () => {
  const response = await getProductsApi(currentPage.value);
  products.value = (response.data || []).map((item: ApiClientProduct) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    originPrice: item.origin_price,
    image: item.image_url,
    rating: item.rating,
  })) as ProductProps[];
});
</script>
