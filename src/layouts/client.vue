<template>
  <div class="relative px-4 max-w-7xl mx-auto">
    <Header />
    <main class="relative mt-8">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";
import Header from "@/components/client/header.vue";

defineOptions({
  name: "ClientLayout",
});

const cartStore = useCartStore();
const productStore = useProductStore();

onBeforeMount(() => {
  productStore.initFavorites();
  cartStore.initCart();
});
</script>
