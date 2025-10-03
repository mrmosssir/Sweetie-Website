<template>
  <div class="px-1">
    <div class="flex justify-between items-center my-4">
      <Page :pagination="pagination" @change="handleGetOrders" />
    </div>
    <Table :columns="columns" :data="orders">
      <template #isEnabled="{ item }">
        <fa-icon v-if="item.isEnabled" icon="check" class="text-green-500"></fa-icon>
        <fa-icon v-else icon="xmark" class="text-red-400"></fa-icon>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";

import { getOrdersApi } from "@/request/order";

import type { ApiResponse, Pagination } from "@/types/api";
import type { Order, ApiOrder } from "@/types/order";

import { useAdminStore } from "@/stores/admin";

import Page from "@/components/admin/pagination.vue";
import Table from "@/components/admin/table.vue";

const adminStore = useAdminStore();

const columns = [
  { name: "編號", key: "id" },
  { name: "姓名", key: "name" },
  { name: "電子信箱", key: "mail" },
  { name: "購買品項", key: "products", custom: true },
  { name: "訂單總金額", key: "totalPrice" },
  { name: "訂單狀態", key: "status", custom: true },
  { name: "功能", key: "function", custom: true },
];

const orders = ref<Order[]>([]);
const pagination = ref<Pagination>({} as Pagination);

const handleGetOrders = async (page = 1) => {
  const response: ApiResponse = await getOrdersApi(page, adminStore.search);
  orders.value = (response.data || []).map((item: ApiOrder) => ({
    id: item.id,
    name: item.name,
    mail: item.mail,
    note: item.note,
    totalPrice: item.total_price,
    isPaid: item.is_paid,
    isEnabled: item.is_enabled,
    paidAt: item.paid_at,
    pickedAt: item.picked_at,
    products: item.products,
  })) as Order[];
  pagination.value = response.pagination as Pagination;
};

onBeforeMount(async () => {
  await handleGetOrders();
});

watch(
  () => adminStore.search,
  () => handleGetOrders()
);
</script>
