<template>
  <div id="admin-product">
    <div class="flex justify-between items-center my-4">
      <Page :pagination="pagination" @change="handleGetProducts" />
      <button
        type="button"
        class="bg-[#477182]/80 rounded w-8 h-8 cursor-pointer"
        @click.prevent="handleOpenModal()"
      >
        <fa-icon icon="plus" class="text-white"></fa-icon>
      </button>
    </div>
    <Table :columns="columns" :data="products">
      <template #default="{ item }">
        <button class="mx-1 cursor-pointer" @click="handleOpenModal(item as Product)">
          <fa-icon class="text-[#477182]/80 text-xl" icon="pen-to-square"></fa-icon>
        </button>
        <button class="mx-1 cursor-pointer" @click="handleDeletProduct(item.id)">
          <fa-icon class="text-red-400 text-xl" icon="xmark"></fa-icon>
        </button>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";

import {
  getProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "@/request/product";

import type { ApiResponse, Pagination } from "@/types/api";
import type { Product, ApiProduct } from "@/types/product";

import { useModal } from "@/composables/useModal";
import { useAdminStore } from "@/store/admin";

import Page from "@/components/admin/Pagination.vue";
import Table from "@/components/admin/Table.vue";
import CreateModal from "@/components/modal/create.vue";

const { setModal, closeModal } = useModal();
const adminStore = useAdminStore();

const products = ref<Product[]>([]);
const pagination = ref<Pagination>({} as Pagination);
const columns = ref([
  { name: "編號", key: "id" },
  { name: "產品類別", key: "category" },
  { name: "產品名稱", key: "name" },
  { name: "產品原價", key: "originPrice" },
  { name: "產品售價", key: "price" },
  { name: "是否啟用", key: "isEnabled" },
  { name: "功能" },
]);

const handleGetProducts = async (page = 1) => {
  const response: ApiResponse = await getProductsApi(page, adminStore.search);
  products.value = (response.data || []).map((item: ApiProduct) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    originPrice: item.origin_price,
    price: item.price,
    unit: item.unit,
    description: item.description,
    content: item.content,
    isEnabled: item.is_enabled,
    imageUrl: item.image_url,
  })) as Product[];
  pagination.value = response.pagination as Pagination;
};

const handleDeletProduct = async (id: string) => {
  await deleteProductApi(id);
  await handleGetProducts(pagination.value.currentPage);
};

const handleOpenModal = async (product?: Product) => {
  setModal({
    component: CreateModal,
    props: { product },
    listeners: {
      submit: async (form: Product) => {
        if (product) {
          await updateProductApi(form.id, JSON.parse(JSON.stringify(form)) as FormData);
        } else {
          await createProductApi(JSON.parse(JSON.stringify(form)) as FormData);
        }
        await handleGetProducts(pagination.value.currentPage);
        closeModal();
      },
      delete: async (id: string) => {
        await handleDeletProduct(id);
        closeModal();
      },
    },
  });
};

onBeforeMount(async () => {
  await handleGetProducts();
});

watch(
  () => adminStore.search,
  () => handleGetProducts(1)
);
</script>
