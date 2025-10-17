<template>
  <div class="relative h-dvh w-dvw bg-[#477182] flex flex-col">
    <!-- 圓形背景 -->
    <div
      class="w-[130%] aspect-square bg-white rounded-full absolute top-[50%] left-[-50%] transform translate-y-[-50%] z-[1]"
    ></div>
    <!-- 左側 side 背景 -->
    <div class="w-24 bg-[#477182] h-dvh flex flex-col justify-between absolute top-0 left-0 z-[2]">
      <!-- logo -->
      <h1 class="relative text-center text-lg mt-3 sm:text-5xl sm:text-right">
        <div class="block text-center sm:hidden">
          <fa-icon icon="cookie-bite" class="text-white text-xl"></fa-icon>
        </div>
        <span class="text-white">Su</span>
        <span class="relative text-white sm:text-[#477182] sm:absolute">Shop</span>
      </h1>
      <!-- 社群按鈕 -->
      <div class="h-full flex flex-col items-center justify-center gap-2 mt-6">
        <a
          v-for="social in socials"
          :key="social.title"
          :href="social.path"
          target="_blank"
          class="m-2"
        >
          <fa-icon :icon="['fab', social.title]" class="text-white text-xl" />
        </a>
      </div>
      <!-- 前往 shop 按鈕 -->
      <router-link to="/shop" class="text-white/50 rotate-270 mb-16 text-sm">
        <fa-icon icon="angle-left" class="mr-1"></fa-icon>Shop
      </router-link>
    </div>
    <!-- 上方 menu -->
    <div class="text-right mt-6 mr-6 block lg:hidden">
      <fa-icon icon="fa-bars" class="text-white text-2xl"></fa-icon>
    </div>
    <ul class="relative justify-center items-center gap-12 pt-6 z-[3] font-bold hidden lg:flex">
      <li v-for="menu in menus" :key="menu.title">
        <router-link :to="menu.path" class="text-black">{{ menu.title }}</router-link>
      </li>
    </ul>
    <div class="w-full flex flex-1 items-center pl-24 z-[1]">
      <!-- 主要內容區塊 -->
      <div class="flex-1 h-full">
        <router-view />
      </div>
      <!-- 右側類別按鈕 -->
      <ul class="w-36 flex-col gap-3 hidden md:flex">
        <li
          v-for="category in categories"
          :key="category.title"
          class="w-full rounded-l-full text-white hover:bg-white hover:text-[#477182] transition-colors"
          :class="{ 'bg-white': currentCategory === category.title }"
        >
          <router-link
            class="w-12 h-12 flex justify-center items-center border border-white rounded-full mr-auto ml-0"
            :to="category.path"
          >
            <fa-icon :icon="category.icon" class="text-xl"></fa-icon>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

defineOptions({
  name: "ClientLayout",
});

const route = useRoute();

const currentCategory = computed(() => {
  return route.query.category || "";
});

const menus = [
  { title: "Home", path: "/" },
  { title: "Shop", path: "/shop" },
  { title: "Cart", path: "/cart" },
  { title: "Order", path: "/order" },
];

const categories = [
  { title: "cake", icon: "cake-candles", path: "/shop?category=cake" },
  { title: "drink", icon: "mug-hot", path: "/shop?category=drink" },
  { title: "bread", icon: "bread-slice", path: "/shop?category=bread" },
];

const socials = [
  { title: "facebook", path: "https://www.facebook.com/" },
  { title: "instagram", path: "https://www.instagram.com/" },
  { title: "x-twitter", path: "https://www.x.com/" },
];
</script>
