<template>
  <div class="w-full max-w-64 mx-auto">
    <div class="relative w-full aspect-square">
      <lazy-image :path="product.image" :width="300" :height="300" class="w-full h-full object-cover" :alt="product.name" />
      <button
        v-if="favorite"
        class="absolute top-3 right-3 bg-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer z-10"
        @click="handleFavorite(isFavorite)"
      >
        <fa-icon :icon="[isFavorite ? 'fas' : 'far', 'heart']" class="text-lg text-gray-500"></fa-icon>
      </button>
    </div>
    <p class="block text-xs text-black mt-2">{{ product.name }}</p>
    <p class="flex items-center gap-x-0.5 mt-1">
      <span class="text-xs font-bold text-[#477182]">$</span>
      <span class="text-xl font-black text-[#477182]">{{ product.price.toFixed(2) }}</span>
    </p>
    <p v-if="product.originPrice" class="text-xs text-gray-400 mt-1">一般售價：${{ product.originPrice.toFixed(2) }}</p>
    <button v-if="addCart" class="bg-gray-200 text-gray-700 px-2 py-0.5 cursor-pointer mt-2" @click="cartStore.addToCart(product.id)">
      加入購物車
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";
import type { ProductSimple } from "@/types/product";

import LazyImage from "../lazyImage.vue";

defineOptions({
  name: "ProductComponent",
});

const props = withDefaults(
  defineProps<{
    product: ProductSimple;
    size?: "small" | "medium";
    favorite?: boolean;
    addCart?: boolean;
  }>(),
  {
    size: "medium",
    favorite: true,
    addCart: true,
  },
);
const cartStore = useCartStore();
const productStore = useProductStore();

const isFavorite = computed(() => productStore.favorites.includes(props.product.id));

const handleFavorite = (isFavorite: boolean) => {
  !isFavorite ? productStore.addFavorites(props.product.id) : productStore.removeFavorites(props.product.id);
};
</script>

<style></style>
