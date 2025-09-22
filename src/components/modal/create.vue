<template>
  <baseModal title="新增產品">
    <template #body>
      <baseInput label="產品圖片路徑" placeholder="請輸入產品圖片路徑" v-model="form.imageUrl" />
      <baseInput label="產品名稱" placeholder="請輸入產品名稱" v-model="form.title" />
      <baseInput label="產品分類" placeholder="請輸入產品分類" v-model="form.category" />
      <baseInput label="單位" placeholder="請輸入單位" v-model="form.unit" />
      <baseInput
        label="產品定價"
        type="number"
        placeholder="請輸入產品定價"
        v-model="form.origin_price"
      />
      <baseInput label="產品售價" type="number" placeholder="請輸入產品售價" v-model="form.price" />
      <baseInput label="產品描述" placeholder="請輸入產品描述" v-model="form.description" />
      <baseInput label="產品備註" placeholder="請輸入產品備註" v-model="form.content" />
      <baseSwitch label="是否啟用" v-model="form.is_enabled" />
    </template>
    <template #footer>
      <button @click="handleSubmit()">送出</button>
      <button @click="handleDelete()">刪除</button>
    </template>
  </baseModal>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import baseModal from "@/components/base/modal.vue";
import baseInput from "@/components/base/input.vue";
import baseSwitch from "@/components/base/switch.vue";

import { useModal } from "@/composables/useModal";
import request from "@/request/core";

import type { Product } from "@/types/product";

const props = defineProps<{
  product: Product;
}>();

const { closeModal } = useModal();

const form = ref<Product>(props.product as Product);

const handleSubmit = async (): Promise<void> => {
  console.log("submit");
};

const handleDelete = async (): Promise<void> => {
  console.log("delete");
};
</script>

<style lang="scss" scoped></style>
