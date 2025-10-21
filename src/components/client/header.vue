<template>
  <header class="flex justify-between items-center gap-x-32 py-4">
    <!-- Logo 區塊 -->
    <h1 class="flex items-center gap-x-1">
      <fa-icon icon="stroopwafel" class="block text-[#477182] text-xl"></fa-icon>
      <span class="text-black/80 text-lg font-semibold">SuShop</span>
    </h1>
    <!-- 搜尋框 -->
    <div class="flex flex-1 items-center gap-x-1 bg-gray-100 py-3 px-4 rounded-full">
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
      <fa-icon :icon="['far', 'heart']" class="text-lg text-gray-700 cursor-pointer"></fa-icon>
      <fa-icon icon="shopping-cart" class="text-lg text-gray-700 cursor-pointer"></fa-icon>
      <fa-icon icon="clipboard-list" class="text-lg text-gray-700 cursor-pointer"></fa-icon>
      <button
        class="relative flex items-center bg-[#477182] text-white text-sm px-8 py-2 cursor-pointer ml-8"
      >
        加入會員
      </button>
    </div>
  </header>
</template>

<script lang="ts" setup></script>
