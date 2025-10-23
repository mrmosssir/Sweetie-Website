<template>
  <div class="relative mt-8">
    <router-link to="/shop" class="flex items-center gap-x-4 text-sm text-gray-700 cursor-pointer">
      <fa-icon icon="arrow-left" class="text-xs"></fa-icon>
      <span>繼續購物</span>
    </router-link>
    <div class="flex gap-4">
      <ul class="flex-1">
        <li class="grid grid-cols-4 text-gray-700 border-b border-gray-200 py-6">
          <p class="col-span-2">商品名稱</p>
          <p class="text-center">數量</p>
          <p class="text-center">單價</p>
        </li>
        <li
          v-for="item in cartProducts"
          :key="item.id"
          class="grid grid-cols-4 text-gray-700 border-b border-gray-200 py-6"
        >
          <div class="flex items-center gap-x-4 col-span-2">
            <img :src="item.imageUrl" :alt="item.name" class="w-36 h-46 object-cover" />
            <div class="flex flex-col gap-y-2">
              <span class="text-sm text-gray-900">{{ item.name }}</span>
              <span class="text-sm text-gray-400 word-break">{{ item.description }}</span>
              <span class="text-sm text-gray-700 mt-2">${{ item.total.toFixed(2) }}</span>
            </div>
          </div>
          <div class="flex justify-center items-center text-gray-700">{{ item.quantity }}</div>
          <div class="flex justify-center items-center text-gray-700">
            ${{ item.price.toFixed(2) }}
          </div>
        </li>
      </ul>
      <div class="flex flex-col gap-y-4 ml-auto w-80 p-6 border border-gray-200 h-fit">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-700">商品總計</span>
          <span class="text-sm text-gray-700">${{ handleGetTotalPrice() }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-700">運費</span>
          <span class="text-sm text-gray-700">$0.00</span>
        </div>
        <div class="flex justify-between items-center border-t border-gray-200 pt-4">
          <span class="text-lg font-semibold text-black">總計</span>
          <span class="text-lg font-semibold text-black">${{ handleGetTotalPrice() }}</span>
        </div>
        <button class="bg-[#477182] text-white text-center py-3 mt-4 cursor-pointer">
          前往結帳
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useCartStore } from "@/stores/cart";
import type { Product } from "@/types/product";
import { getProductsIdsApi } from "@/request/product";

type ProductExtend = Product & {
  quantity: number;
  total: number;
};

const cartStore = useCartStore();

const cartProducts = ref<ProductExtend[]>([]);

const handleGetProductsDetail = async () => {
  const productIds = cartStore.carts.map((item) => item.productId);
  if (productIds.length === 0) return;

  const products = await getProductsIdsApi(productIds);
  cartProducts.value = products.map((item) => {
    const quantity =
      cartStore.carts.find((cartItem) => cartItem.productId === item.id)?.quantity || 1;
    return {
      ...item,
      quantity,
      total: item.price * quantity,
    };
  });
};

const handleGetTotalPrice = () => {
  return cartProducts.value.reduce((acc, item) => acc + item.total, 0);
};

onBeforeMount(() => {
  handleGetProductsDetail();
});
</script>
