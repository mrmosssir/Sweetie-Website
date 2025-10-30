<template>
  <div class="flex items-center gap-x-2">
    <div class="flex max-w-72 items-center gap-x-2 bg-gray-200 px-3 py-2">
      <fa-icon icon="search" class="text-gray-500 text-sm"></fa-icon>
      <input type="text" v-model="search" placeholder="訂單號或電子郵件" class="outline-none" />
    </div>
    <button class="bg-[#477182] text-white px-4 py-2 cursor-pointer" @click="searchOrders">
      搜尋
    </button>
  </div>

  <div class="flex flex-col gap-y-4 mt-4">
    <div
      class="p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
      v-for="order in orders"
      :key="order.id"
    >
      <div class="flex justify-between items-center mb-4">
        <span class="text-sm text-gray-600">訂單號: #{{ order.id }} </span>
        <span class="text-sm text-gray-600">下單日期: {{ order.createAt }} </span>
      </div>
      <div class="flex flex-col gap-y-2">
        <div
          class="flex justify-between items-center"
          v-for="item in order.products"
          :key="item.name"
        >
          <span class="block text-sm text-gray-600 w-1/4">{{ item.name }}</span>
          <span class="block text-sm text-gray-600 w-1/4">{{ item.quantity }}</span>
          <span class="block text-sm text-gray-600 w-1/4">單價 : ${{ item.price.toFixed(2) }}</span>
          <span class="block text-sm text-gray-600 w-1/4">小計 : ${{ item.total.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { searchOrderApi } from "@/request/order";

import { getDateTimeString } from "@/utils/day";

type Order = {
  id: string;
  createAt: string;
  totalPrice: number;
  products: OrderProduct[];
};

type OrderProduct = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

const search = ref("");
const orders = ref<Order[]>([]);

const searchOrders = async () => {
  const response = await searchOrderApi(search.value);
  orders.value = (response.data || []).map((order: any) => ({
    id: order.id,
    createAt: getDateTimeString(order.created_at),
    totalPrice: order.total_price,
    products: order.products.map((item: any) => ({
      name: item.name,
      quantity: item.count,
      price: item.price,
      total: item.count * item.price,
    })),
  }));
  console.log(orders.value);
};
</script>
