<template>
  <div class="flex flex-col gap-4 md:flex-row">
    <div class="flex-1">
      <h2 class="text-3xl font-bold text-gray-900">確認訂單</h2>
      <strong class="block text-sm text-gray-500 mt-2">檢查您訂購的商品並填寫個人基本資料以獲得更好的購物體驗</strong>
      <p class="py-2 text-gray-900 border-b border-gray-200 mt-4">個人資料</p>
      <form class="mt-4 flex flex-col gap-y-2" @submit="handleSubmit">
        <base-input label="姓名" v-model="form.name" required></base-input>
        <base-input label="電子郵件" v-model="form.mail" required></base-input>
        <button type="submit" class="bg-[#477182] text-white py-2 mt-2 cursor-pointer">提交訂單</button>
      </form>
    </div>
    <div class="flex flex-col gap-y-4 ml-auto w-full p-6 border border-gray-200 h-fit md:w-96">
      <div v-for="(item, index) in products" class="flex items-stretch gap-x-2 border-b border-gray-200 pb-4" :key="item.id">
        <img :src="item.image" :alt="item.name" class="w-24 h-26 object-cover" />
        <div class="flex flex-col justify-between">
          <span class="text-gray-900">{{ item.name }}</span>
          <div class="flex flex-col gap-y-1">
            <span class="text-xs text-gray-700">數量: {{ item.quantity }} {{ item.unit }}</span>
            <span class="text-xs text-gray-700">價格: ${{ item.price.toFixed(2) }}</span>
            <span class="text-xs text-gray-700">小計: ${{ item.total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-700">商品總計</span>
          <span class="text-sm text-gray-700">${{ handleGetTotalPrice() }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-700">優惠</span>
          <span class="text-sm text-gray-700">$0.00</span>
        </div>
      </div>
      <div class="flex justify-between items-center border-t border-gray-200 pt-4">
        <span class="text-lg font-semibold text-black">訂單總金額</span>
        <span class="text-lg font-semibold text-black">${{ handleGetTotalPrice() }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { type Product } from "@/types/product";
import { createOrderApi } from "@/request/order";
import { useCartStore } from "@/stores/cart";
import BaseInput from "@/components/client/input.vue";

type ProductExtend = Product & {
  quantity: number;
  total: number;
  selected: boolean;
};

type Cart = {
  productId: string;
  quantity: number;
};

const router = useRouter();
const cartStore = useCartStore();

const form = ref({
  name: "",
  mail: "",
});

const products = ref<ProductExtend[]>([]);

const handleGetTotalPrice = () => {
  return products.value.reduce((acc, item) => acc + item.total, 0);
};

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  if (!form.value.name || !form.value.mail) {
    alert("請填寫完整的個人資料");
    return;
  }

  const response = await createOrderApi({
    name: form.value.name,
    mail: form.value.mail,
    products: products.value.map((item) => ({
      name: item.name,
      count: item.quantity,
      price: item.price,
    })),
  });

  if (response.code !== 0) {
    alert("訂單建立失敗，請稍後再試");
    return;
  }

  localStorage.removeItem("cart-selected");

  const cart: Cart[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const reserveCart = cart.filter((item: Cart) => !products.value.find((product) => product.id === item.productId));
  localStorage.setItem("cart", JSON.stringify(reserveCart));
  cartStore.initCart();

  alert(`感謝您的訂購，${form.value.name}！我們已收到您的訂單確認信。`);

  router.push({ path: "/" });
};

onBeforeMount(() => {
  products.value = JSON.parse(localStorage.getItem("cart-selected") || "[]");
  if (!products.value.length) router.push({ path: "/" });
});
</script>
