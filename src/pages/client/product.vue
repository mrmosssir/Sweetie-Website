<template>
  <breadcrumb :list="history" />
  <div class="mt-4 flex gap-x-12">
    <lazy-image :path="product.image" :width="800" :height="800" class="flex-1 aspect-square object-cover" :alt="product.name" />
    <div class="flex-1">
      <!-- 分類 -->
      <strong class="text-gray-400 font-light">{{ product.category }}</strong>
      <!-- 商品名稱 -->
      <h2 class="flex items-end gap-x-3 text-4xl font-bold text-gray-700 mt-1">
        {{ product.name }}
        <span v-if="product.isHot" class="bg-[#477182]/10 border border-[#477182] rounded-2xl text-[#477182] text-sm px-2">熱門</span>
        <span v-if="product.isNew" class="bg-[#D9B99B]/20 border border-[#A67C52] rounded-2xl text-[#A67C52] text-sm px-2">新品上市</span>
      </h2>
      <!-- 商品說明 -->
      <p class="text-gray-500 mt-4">{{ product.content }}</p>
      <!-- 評分 -->
      <rating :rate="product.rating" class="mt-2" />
      <!-- 分隔線 -->
      <hr class="my-6 border-0 border-t border-t-gray-300" />
      <!-- 價格和價格說明 -->
      <p class="text-xl font-bold text-gray-700 mt-2">${{ product.price?.toFixed(2) }} / {{ product.unit }}</p>
      <p class="text-sm text-gray-500 mt-1">{{ product.description }}</p>
      <!-- 分隔線 -->
      <hr class="my-6 border-0 border-t border-t-gray-300" />

      <div class="flex items-center gap-x-4">
        <!-- 數量選擇 -->
        <div class="w-36 h-12 flex justify-center items-center bg-gray-100 rounded-4xl overflow-hidden text-gray-700">
          <button class="flex-1 bg-transparent text-xl cursor-pointer" @click="handleChangeQuantity(-1)">-</button>
          <input type="text" class="w-8 text-center bg-transparent outline-none" :value="quantity" readonly />
          <button class="flex-1 bg-transparent text-xl cursor-pointer" @click="handleChangeQuantity(1)">+</button>
        </div>
        <!-- 庫存 -->
        <p class="text-sm text-gray-500">
          庫存剩餘：
          <span class="text-sm text-amber-400">{{ product.stock }}</span>
        </p>
        <!-- 最愛 -->
        <button class="rounded-full cursor-pointer z-10 ml-auto mr-0" @click="handleFavorite(favorite)">
          <fa-icon :icon="['far', 'heart']" class="text-xl"></fa-icon>
        </button>
      </div>
      <div class="flex gap-x-4 mt-8">
        <button class="bg-[#477182] text-white text-sm h-12 w-56 rounded-full" @click="cartStore.addToCart(product.id, quantity)">直接購買</button>
        <button
          class="bg-white text-[#477182] border border-[#477182] text-sm h-12 w-56 rounded-full"
          @click="cartStore.addToCart(product.id, quantity)"
        >
          加入購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import type { Product } from "@/types/product";
import { getProductDetail } from "@/request/product";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";

import LazyImage from "@/components/lazyImage.vue";
import Breadcrumb from "@/components/client/breadcrumb.vue";
import Rating from "@/components/client/rating.vue";

const route = useRoute();

const cartStore = useCartStore();
const productStore = useProductStore();

const product = ref<Product>({} as Product);
const quantity = ref(1);

const history = computed(() => {
  return [
    { name: "首頁", path: "/" },
    { name: "產品列表", path: "/shop" },
    { name: product.value.name, path: "" },
  ];
});

const favorite = computed(() => productStore.favorites.includes(product.value.id));

const handleFavorite = (isFavorite: boolean) => {
  !isFavorite ? productStore.addFavorites(product.value.id) : productStore.removeFavorites(product.value.id);
};

const handleGetProductDetail = async (id: string) => {
  try {
    product.value = await getProductDetail(id);
  } catch (error) {
    console.error("Failed to fetch product detail:", error);
  }
};

const handleChangeQuantity = (val: number) => {
  return (quantity.value = Math.min(product.value.stock, Math.max(1, quantity.value + val)));
};

handleGetProductDetail(route.params.id as string);
</script>
