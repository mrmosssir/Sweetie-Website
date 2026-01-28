<template>
  <div class="px-1">
    <div class="flex justify-between items-center my-4">
      <Page :pagination="pagination" @change="handleGetCategory" />
      <button type="button" class="bg-[#477182]/80 rounded-xs w-8 h-8 cursor-pointer text-sm" @click.prevent="handleOpenModal()">
        <fa-icon icon="plus" class="text-white"></fa-icon>
      </button>
    </div>
    <Table :columns="columns" :data="category">
      <template #isEnabled="{ item }">
        <fa-icon v-if="item.isEnabled" icon="check" class="text-green-500"></fa-icon>
        <fa-icon v-else icon="xmark" class="text-red-400"></fa-icon>
      </template>
      <template #function="{ item }">
        <div class="flex gap-1">
          <button class="border border-[#477182]/80 rounded-sm w-8 h-8 cursor-pointer" @click="handleOpenModal(item as Category)">
            <fa-icon class="text-[#477182]/80 text-sm" icon="pen-to-square"></fa-icon>
          </button>
          <button class="border border-red-400 rounded-sm w-8 h-8 cursor-pointer" @click="handleDeleteCategory(item.id)">
            <fa-icon class="text-red-400 text-sm" icon="xmark"></fa-icon>
          </button>
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { getAdminCategoryApi, createAdminCategoryApi, updateAdminCategoryApi, deleteAdminCategoryApi } from "@/request/category";

import type { ApiResponse, Pagination } from "@/types/api";
import type { Category } from "@/types/category";

import { useModal } from "@/composables/useModal";
import { useAdminStore } from "@/stores/admin";

import Page from "@/components/admin/pagination.vue";
import Table from "@/components/admin/table.vue";
import CreateModal, { type FormField } from "@/components/admin/modal/create.vue";

const { setModal, closeModal } = useModal();
const adminStore = useAdminStore();

const columns = [
  { name: "編號", key: "id" },
  { name: "名稱", key: "name" },
  { name: "是否啟用", key: "isEnabled", custom: true },
  { name: "功能", key: "function", custom: true },
];

const categoryFields: FormField[] = [
  { key: "name", type: "text", label: "名稱", placeholder: "請輸入名稱", rules: "required" },
  { key: "image", type: "file", label: "圖片", placeholder: "請選擇上傳圖片", rules: "required" },
  { key: "isEnabled", type: "boolean", label: "是否啟用" },
];

const category = ref<Category[]>([]);
const pagination = ref<Pagination>({} as Pagination);

const handleGetCategory = async (page = 1) => {
  const response = await getAdminCategoryApi(page, adminStore.search);
  category.value = response.data;
  pagination.value = response.pagination as Pagination;
};

const handleDeleteCategory = async (id: string) => {
  await deleteAdminCategoryApi(id);
  await handleGetCategory(pagination.value.currentPage);
};

const handleOpenModal = async (category?: Category) => {
  setModal({
    component: CreateModal,
    props: {
      title: category ? "編輯商品類別" : "新增商品類別",
      fields: categoryFields,
      form: JSON.parse(JSON.stringify(category || {})),
      page: "category",
    },
    listeners: {
      submit: async (form: Category) => {
        if (category) {
          await updateAdminCategoryApi(form.id, form);
        } else {
          await createAdminCategoryApi(form);
        }
        await handleGetCategory(pagination.value.currentPage);
        closeModal();
      },
      delete: async (id: string) => {
        await handleDeleteCategory(id);
        closeModal();
      },
    },
  });
};

handleGetCategory();

watch(
  () => adminStore.search,
  () => handleGetCategory(1),
);
</script>
