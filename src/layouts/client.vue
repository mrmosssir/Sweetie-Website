<template>
  <div class="relative px-4 max-w-7xl mx-auto">
    <navbar />
    <banner :list="advertises" v-if="route.meta.ads" />
    <main class="relative mt-8">
      <router-view />
    </main>
  </div>
  <footer class="bg-[#477182] mt-8">
    <div class="text-center text-sm text-white py-6">© 2025 SuShop. All rights reserved.</div>
  </footer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";

import type { Advertise } from "@/types/advertise";
import { getAdvertiseApi } from "@/request/advertise";

import Navbar from "@/components/client/navbar.vue";
import Banner from "@/components/client/banner.vue";

defineOptions({
  name: "ClientLayout",
});

const route = useRoute();

const cartStore = useCartStore();
const productStore = useProductStore();

const advertises = ref<Advertise[]>([]);

const handleFetchData = async () => {
  try {
    const modules = await Promise.all([getAdvertiseApi()]);
    advertises.value = modules[0];
  } catch (error) {
    console.error("Failed to fetch home data:", error);
  }
};

handleFetchData();
productStore.initFavorites();
cartStore.initCart();
</script>
