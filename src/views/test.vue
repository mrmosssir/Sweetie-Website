<template>
  <!-- <div class="p-8 bg-blue-500 text-white">
    <h1 class="text-3xl font-bold mb-4">Tailwind CSS v4 測試</h1>
    <p class="text-lg mb-4">如果你看到這個文字是白色且背景是藍色，表示 Tailwind CSS 正常載入。</p>

    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-red-500 p-4 rounded-lg">
        <p class="font-semibold">紅色背景測試</p>
      </div>
      <div class="bg-green-500 p-4 rounded-lg">
        <p class="font-semibold">綠色背景測試</p>
      </div>
    </div>

    <div class="flex space-x-4 mb-6">
      <button class="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md transition-colors">
        按鈕測試
      </button>
      <div class="w-16 h-16 bg-yellow-400 rounded-full"></div>
    </div>

    <div class="text-center">
      <p class="text-sm opacity-75">
        如果以上所有元素都有正確的顏色和樣式，Tailwind CSS 就是正常載入的
      </p>
    </div>
  </div> -->
  <div
    style="
      width: 100vw;
      height: 100vh;
      background-image: url('https://images.unsplash.com/photo-1455058683937-c45857082982?q=80&w=2506&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    "
  >
    <modalCreate />
  </div>
</template>

<script lang="ts" setup>
import modalCreate from "@/components/modal/create.vue";
</script>
