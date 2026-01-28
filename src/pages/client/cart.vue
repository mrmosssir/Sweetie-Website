<template>
  <div>
    <router-link to="/shop" class="flex items-center gap-x-4 text-sm text-gray-700 cursor-pointer">
      <fa-icon icon="arrow-left" class="text-xs"></fa-icon>
      <span>繼續購物</span>
    </router-link>
    <div class="flex flex-col gap-4 md:flex-row">
      <ul class="flex-1">
        <li class="grid grid-cols-4 text-gray-700 border-b border-gray-200 py-6">
          <div class="flex items-center gap-x-4 col-span-2">
            <input type="checkbox" class="w-3 h-3 cursor-pointer" v-model="allSelectValue" />
            <p class="text-center">商品資訊</p>
          </div>
          <p class="text-center">數量</p>
          <p class="text-center">單價</p>
        </li>
        <li
          v-for="item in cartProducts"
          :key="item.id"
          class="grid grid-cols-1 md:grid-cols-4 text-gray-700 border-b border-gray-200 py-6"
        >
          <div class="flex items-center gap-x-4 col-span-1 md:col-span-2">
            <input
              type="checkbox"
              class="w-3 h-3 cursor-pointer"
              v-model="item.selected"
              @click="handleSelect(item.id)"
            />
            <img :src="item.imageUrl" :alt="item.name" class="w-36 h-46 object-cover" />
            <div class="flex flex-col gap-y-2">
              <span class="text-sm text-gray-900">{{ item.name }}</span>
              <span class="text-sm text-gray-400 word-break">{{ item.description }}</span>
              <span class="inline md:hidden text-sm text-gray-700 mt-2"
                >單價 : {{ item.price.toFixed(2) }}</span
              >
              <span class="inline md:hidden text-sm text-gray-700">數量 : {{ item.quantity }}</span>
              <span class="text-sm text-gray-700">小計 : ${{ item.total.toFixed(2) }}</span>
            </div>
          </div>
          <div class="hidden md:flex justify-center items-center text-sm text-gray-700">
            {{ item.quantity }}
          </div>
          <div class="hidden md:flex justify-center items-center text-sm text-gray-700">
            ${{ item.price.toFixed(2) }}
          </div>
        </li>
      </ul>
      <div class="flex flex-col gap-y-4 ml-auto w-full p-6 border border-gray-200 h-fit md:w-80">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-700">商品總計</span>
          <span class="text-sm text-gray-700">${{ handleGetTotalPrice() }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-700">優惠</span>
          <span class="text-sm text-gray-700">$0.00</span>
        </div>
        <div class="flex justify-between items-center border-t border-gray-200 pt-4">
          <span class="text-lg font-semibold text-black">總計</span>
          <span class="text-lg font-semibold text-black">${{ handleGetTotalPrice() }}</span>
        </div>
        <button
          class="bg-[#477182] text-white text-center py-3 mt-4 cursor-pointer"
          @click="handleSubmit"
        >
          前往結帳
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import type { Product } from "@/types/product";
import { getProductsIdsApi } from "@/request/product";

type ProductExtend = Product & {
  quantity: number;
  total: number;
  selected: boolean;
};

const router = useRouter();

const cartStore = useCartStore();

const cartProducts = ref<ProductExtend[]>([]);

const allSelectValue = computed({
  get: () => {
    if (cartProducts.value.length === 0) return false;
    return cartProducts.value.every((item) => item.selected);
  },
  set: (value: boolean) => {
    cartProducts.value.map((item) => (item.selected = value));
  },
});

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
      selected: false,
    };
  });
};

const handleGetTotalPrice = () => {
  return cartProducts.value.reduce((acc, item) => acc + item.total, 0);
};

const handleSelect = (id: string) => {
  const product = cartProducts.value.find((item) => item.id === id);
  if (product) {
    product.selected = !product.selected;
  }
};

const handleSubmit = async () => {
  const selectedProducts = cartProducts.value.filter((item) => item.selected);
  localStorage.setItem("cart-selected", JSON.stringify(selectedProducts));
  router.push({ path: "/order" });
};

onBeforeMount(() => {
  handleGetProductsDetail();
});
</script>
