<template>
  <header class="flex justify-between items-center gap-x-16 py-4 lg:gap-x-32">
    <!-- Logo 區塊 -->
    <h1 class="flex items-center gap-x-1">
      <fa-icon icon="stroopwafel" class="block text-[#477182] text-xl"></fa-icon>
      <span class="text-black/80 text-lg font-semibold">SuShop</span>
    </h1>
    <!-- 搜尋框 -->
    <div class="hidden flex-1 items-center gap-x-1 bg-gray-100 py-3 px-4 rounded-full md:flex">
      <button class="w-7 h-7 bg-transparent cursor-pointer flex justify-center items-center">
        <fa-icon icon="search" class="text-gray text-sm"></fa-icon>
      </button>
      <input
        type="text"
        class="flex-1 bg-transparent border-0 outline-none text-gray-700 text-sm"
        placeholder="Search"
      />
    </div>
    <!-- 功能按鈕區塊 -->
    <div class="flex items-center gap-x-6">
      <menu-icon :icon="['far', 'heart']" :label="productStore.favorites.length"></menu-icon>
      <menu-icon
        icon="shopping-cart"
        :label="cartStore.carts.length"
        @click="handleToCart"
      ></menu-icon>
      <menu-icon icon="clipboard-list" @click="handleToHistory"></menu-icon>
      <menu-icon icon="bars" class="md:!hidden"></menu-icon>
      <button
        class="relative hidden items-center bg-[#477182] text-white text-sm px-8 py-2 cursor-pointer ml-8 md:block"
      >
        加入會員
      </button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";
import menuIcon from "@/components/client/menuIcon.vue";

const router = useRouter();

const cartStore = useCartStore();
const productStore = useProductStore();

const handleToCart = () => {
  router.push({ path: "/cart" });
};

const handleToHistory = () => {
  router.push({ path: "/order/history" });
};
</script>
