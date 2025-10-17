<template>
  <roller-swiper>
    <template v-for="(item, index) in list" v-slot:[`slider-${index}`]>
      <div class="flex items-center w-auto h-full p-12">
        <img
          class="block w-full lg:w-1/2 max-w-164 aspect-square sm:aspect-auto"
          :src="item.image"
          :alt="item.title"
        />
        <div class="flex flex-col gap-y-4">
          <h2 class="text-[64px] text-black font-bold">{{ item.title }}</h2>
          <p class="text-xl text-gray-500">
            原價：<del>{{ item.originalPrice }}</del>
          </p>
          <p class="text-xl text-[#477182]">特價：{{ item.price }}</p>
          <button class="w-64 bg-[#477182] text-white py-3 px-4 rounded-full">前往購買</button>
        </div>
      </div>
    </template>
  </roller-swiper>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import cake from "@/assets/cake.png";
import drink from "@/assets/drink.png";
import pie from "@/assets/pie.png";

const list = ref([
  { title: "白巧草莓鏡面蛋糕", image: cake, originalPrice: "$1200", price: "$999" },
  { title: "巧克力莓果聖代", image: drink, originalPrice: "$800", price: "$699" },
  { title: "經典草莓蛋塔", image: pie, originalPrice: "$600", price: "$499" },
]);
</script>
