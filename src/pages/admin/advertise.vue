<template>
  <div class="px-1">
    <div class="flex justify-between items-center my-4">
      <Page :pagination="pagination" @change="handleGetAdvertise" />
      <button type="button" class="bg-[#477182]/80 rounded-xs w-8 h-8 cursor-pointer text-sm" @click.prevent="handleOpenModal()">
        <fa-icon icon="plus" class="text-white"></fa-icon>
      </button>
    </div>
    <Table :columns="columns" :data="advertise">
      <template #image="{ item }">
        <lazy-image :path="item.image" :width="100" :height="50" class="w-24 h-12 object-cover" :alt="item.name"></lazy-image>
      </template>
      <template #isEnabled="{ item }">
        <fa-icon v-if="item.isEnabled" icon="check" class="text-green-500"></fa-icon>
        <fa-icon v-else icon="xmark" class="text-red-400"></fa-icon>
      </template>
      <template #function="{ item }">
        <div class="flex gap-1">
          <button class="border border-[#477182]/80 rounded-sm w-8 h-8 cursor-pointer" @click="handleOpenModal(item as AdminAdvertise)">
            <fa-icon class="text-[#477182]/80 text-sm" icon="pen-to-square"></fa-icon>
          </button>
          <button class="border border-red-400 rounded-sm w-8 h-8 cursor-pointer" @click="handleDeleteAdvertise(item.id)">
            <fa-icon class="text-red-400 text-sm" icon="xmark"></fa-icon>
          </button>
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { getAdminAdvertiseApi, createAdminAdvertiseApi, updateAdminAdvertiseApi, deleteAdminAdvertiseApi } from "@/request/advertise";

import type { Pagination } from "@/types/api";
import type { AdminAdvertise } from "@/types/advertise";

import { useModal } from "@/composables/useModal";
import { useAdminStore } from "@/stores/admin";

import Page from "@/components/admin/pagination.vue";
import Table from "@/components/admin/table.vue";
import CreateModal, { type FormField } from "@/components/admin/modal/create.vue";
import LazyImage from "@/components/lazyImage.vue";

const { setModal, closeModal } = useModal();
const adminStore = useAdminStore();

const columns = [
  { name: "編號", key: "id" },
  { name: "名稱", key: "name" },
  { name: "圖片", key: "image", custom: true },
  { name: "連結", key: "link" },
  { name: "是否啟用", key: "isEnabled", custom: true },
  { name: "功能", key: "function", custom: true },
];

const advertiseFields: FormField[] = [
  { key: "name", type: "text", label: "名稱", placeholder: "請輸入名稱", rules: "required" },
  { key: "image", type: "file", label: "圖片", placeholder: "請選擇上傳圖片", rules: "required" },
  { key: "link", type: "text", label: "連結", placeholder: "請輸入連結" },
  { key: "isEnabled", type: "boolean", label: "是否啟用" },
];

const advertise = ref<AdminAdvertise[]>([]);
const pagination = ref<Pagination>({} as Pagination);

const handleGetAdvertise = async (page = 1) => {
  const response = await getAdminAdvertiseApi(page, adminStore.search);
  advertise.value = response.data;
  pagination.value = response.pagination as Pagination;
};

const handleDeleteAdvertise = async (id: string) => {
  await deleteAdminAdvertiseApi(id);
  await handleGetAdvertise(pagination.value.currentPage);
};

const handleOpenModal = async (advertise?: AdminAdvertise) => {
  setModal({
    component: CreateModal,
    props: {
      title: advertise ? "編輯廣告" : "新增廣告",
      fields: advertiseFields,
      form: JSON.parse(JSON.stringify(advertise || {})),
      page: "advertise",
    },
    listeners: {
      submit: async (form: AdminAdvertise) => {
        if (advertise) {
          await updateAdminAdvertiseApi(form.id, form);
        } else {
          await createAdminAdvertiseApi(form);
        }
        await handleGetAdvertise(pagination.value.currentPage);
        closeModal();
      },
      delete: async (id: string) => {
        await handleDeleteAdvertise(id);
        closeModal();
      },
    },
  });
};

handleGetAdvertise();

watch(
  () => adminStore.search,
  () => handleGetAdvertise(1),
);
</script>
