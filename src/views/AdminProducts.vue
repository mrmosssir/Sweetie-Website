<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-transparent px-0">
        <li class="breadcrumb-item text-secondary"><small>後台管理系統</small></li>
        <li class="breadcrumb-item active">
          <a href="#">
            <small>商品列表管理</small>
          </a>
        </li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-md-10">
        <h2 class="text-brown">商品列表管理</h2>
      </div>
      <div class="col-md-2 text-right">
        <button type="button" class="btn btn-brown" @click.prevent="setModal('create')">
          新增產品
        </button>
      </div>
    </div>
    <table class="table table-borderless mt-4 bg-white border border-brown border-bottom-0">
      <thead>
        <tr class="bg-brown text-white text-center">
          <th width="100px" scope="col">編號</th>
          <th width="150px" scope="col">產品類別</th>
          <th scope="col">產品名稱</th>
          <th width="150px" scope="col">產品原價</th>
          <th width="150px" scope="col">產品售價</th>
          <th width="100px" scope="col">是否啟用</th>
          <th width="150px" scope="col">編輯</th>
        </tr>
      </thead>
      <tbody class="text-secondary">
        <tr
          class="border border-brown border-bottom"
          v-for="(item, index) in products"
          :key="item.id"
        >
          <th class="text-center pt-3" scope="row">{{ index + 1 }}</th>
          <td class="text-center pt-3">{{ item.category }}</td>
          <td class="text-center pt-3">{{ item.name }}</td>
          <td class="text-right pt-3">{{ item.originPrice }}$</td>
          <td class="text-right pt-3">{{ item.price }}$</td>
          <td class="text-center pt-3" v-if="item.isEnabled">已啟用</td>
          <td class="text-center pt-3" v-if="!item.isEnabled">未啟用</td>
          <td class="text-center">
            <button
              class="btn btn-sm btn-outline-brown rounded"
              @click="setModal('create', { product: item })"
            >
              編輯
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav class="d-flex justify-content-center mt-5">
      <ul class="pagination">
        <li
          class="page-item"
          v-for="num in pagination.total_pages"
          :key="num"
          @click.prevent="fetchProducts(num)"
          :class="{ active: pagination.current_page == num }"
        >
          <a class="page-link" href="#">
            {{ num }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";

import { getProductList } from "@/request/product";
import type { ApiResponse, Pagination } from "@/types/api";
import type { Product, ApiProduct } from "@/types/product";
import { useModal } from "@/composables/useModal";

const { setModal } = useModal();

const products = ref<Product[]>([]);
const pagination = ref<Pagination>({} as Pagination);

const fetchProducts = async (page = 1) => {
  const response: ApiResponse = await getProductList(page);
  products.value = (response.data as ApiProduct[]).map((item: ApiProduct) => ({
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

onBeforeMount(async () => {
  await fetchProducts();
});
</script>
