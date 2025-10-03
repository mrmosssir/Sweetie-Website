<template>
  <div id="admin-coupons">
    <div class="flex justify-between items-center my-4">
      <Page :pagination="pagination" @change="handleGetCoupons" />
      <button
        type="button"
        class="bg-[#477182]/80 rounded w-8 h-8 cursor-pointer"
        @click.prevent="handleOpenModal()"
      >
        <fa-icon icon="plus" class="text-white"></fa-icon>
      </button>
    </div>
    <Table :columns="columns" :data="tableData">
      <template #default="{ item }">
        <button class="mx-1 cursor-pointer" @click="handleOpenModal(item as Coupon)">
          <fa-icon class="text-[#477182]/80 text-xl" icon="pen-to-square"></fa-icon>
        </button>
        <button class="mx-1 cursor-pointer" @click="handleDeleteCoupon(item.id)">
          <fa-icon class="text-red-400 text-xl" icon="xmark"></fa-icon>
        </button>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, watch } from "vue";

import { getCouponsApi, createCouponApi, updateCouponApi, deleteCouponApi } from "@/request/coupon";

import type { ApiResponse, Pagination } from "@/types/api";
import type { Coupon, ApiCoupon } from "@/types/coupon";

import { useModal } from "@/composables/useModal";
import { useAdminStore } from "@/store/admin";

import Page from "@/components/admin/Pagination.vue";
import Table from "@/components/admin/Table.vue";
import CreateModal, { type FormField } from "@/components/modal/create.vue";

const { setModal, closeModal } = useModal();
const adminStore = useAdminStore();

const couponFields: FormField[] = [
  { key: "name", type: "text", label: "名稱", placeholder: "請輸入名稱", rules: "required" },
  { key: "code", type: "text", label: "代碼", placeholder: "請輸入代碼", rules: "required" },
  {
    key: "percent",
    type: "number",
    label: "折扣百分比",
    placeholder: "請輸入折扣",
    rules: "required",
  },
  { key: "startTime", type: "datetime", label: "開始時間", rules: "required" },
  { key: "endTime", type: "datetime", label: "結束時間", rules: "required" },
  { key: "isEnabled", type: "boolean", label: "是否啟用" },
];

const coupons = ref<Coupon[]>([]);
const pagination = ref<Pagination>({} as Pagination);
const columns = ref([
  { name: "編號", key: "id", width: "250px" },
  { name: "名稱", key: "name" },
  { name: "代碼", key: "code" },
  { name: "折扣百分比", key: "percent" },
  { name: "開始時間", key: "startTime" },
  { name: "結束時間", key: "endTime" },
  { name: "是否啟用", key: "isEnabled" },
  { name: "功能" },
]);

const tableData = computed(() =>
  coupons.value.map((coupon) => ({
    ...coupon,
    startTime: formatDate(Number(coupon.startTime)),
    endTime: formatDate(Number(coupon.endTime)),
    isEnabled: coupon.isEnabled ? "啟用" : "未啟用",
  }))
);

const formatDate = (timestamp: number) => {
  if (!timestamp) return "";
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const handleGetCoupons = async (page = 1) => {
  const response: ApiResponse = await getCouponsApi(page, adminStore.search);
  coupons.value = (response.data || []).map((item: ApiCoupon) => ({
    id: item.id,
    name: item.name,
    code: item.code,
    percent: item.percent,
    startTime: item.start_time,
    endTime: item.end_time,
    isEnabled: item.is_enabled,
  })) as Coupon[];
  pagination.value = response.pagination as Pagination;
};

const handleDeleteCoupon = async (id: string) => {
  await deleteCouponApi(id);
  await handleGetCoupons(pagination.value.currentPage);
};

const handleOpenModal = async (coupon?: Coupon) => {
  setModal({
    component: CreateModal,
    props: {
      title: coupon ? "編輯優惠券" : "新增優惠券",
      fields: couponFields,
      form: coupon,
    },
    listeners: {
      submit: async (form: Coupon) => {
        if (coupon) {
          await updateCouponApi(form.id, JSON.parse(JSON.stringify(form)) as FormData);
        } else {
          await createCouponApi(JSON.parse(JSON.stringify(form)) as FormData);
        }
        await handleGetCoupons(pagination.value.currentPage);
        closeModal();
      },
      delete: async (id: string) => {
        await handleDeleteCoupon(id);
        closeModal();
      },
    },
  });
};

onBeforeMount(async () => {
  await handleGetCoupons();
});

watch(
  () => adminStore.search,
  () => handleGetCoupons(1)
);
</script>
