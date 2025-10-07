<template>
  <div class="px-1">
    <div class="flex justify-between items-center my-4">
      <Page :pagination="pagination" @change="handleGetOrders" />
    </div>
    <Table :columns="columns" :data="orders">
      <template #products="{ item }">
        <div v-for="product in item.products" :key="product.id">
          {{ product.name }} x {{ product.count }} - 總金額 ${{ product.price }}
        </div>
      </template>
      <template #status="{ item }">
        <status-item title="訂單狀態" :status="item.isEnabled"></status-item>
        <template v-if="item.isEnabled">
          <status-item title="付款狀態" :status="item.isPaid"></status-item>
          <p v-if="item.paidAt">付款時間：{{ item.paidAt }}</p>
          <status-item title="取貨狀態" :status="item.isPicked"></status-item>
          <p v-if="item.pickedAt">取貨時間：{{ item.pickedAt }}</p>
        </template>
      </template>
      <template #function="{ item }">
        <div class="flex gap-1">
          <button class="border border-[#477182]/80 rounded-sm w-8 h-8 cursor-pointer text-sm">
            <fa-icon class="text-[#477182]/80" icon="dollar-sign"></fa-icon>
          </button>
          <button class="border border-[#477182]/80 rounded-sm w-8 h-8 cursor-pointer text-sm">
            <fa-icon class="text-[#477182]/80" icon="cart-shopping"></fa-icon>
          </button>
          <button class="border border-red-400 rounded-sm w-8 h-8 cursor-pointer text-sm">
            <fa-icon class="text-red-400" icon="xmark"></fa-icon>
          </button>
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch, h } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { getAdminOrdersApi } from "@/request/order";

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
  const response: ApiResponse = await getAdminOrdersApi(page, adminStore.search);
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

const statusItem = ({ title, status }: { title: string; status: boolean }) => {
  return h("div", [
    `${title} - `,
    h(FontAwesomeIcon, {
      icon: status ? "check" : "xmark",
      class: status ? "text-green-500" : "text-red-500",
    }),
  ]);
};

onBeforeMount(async () => {
  await handleGetOrders();
});

watch(
  () => adminStore.search,
  () => handleGetOrders()
);
</script>
