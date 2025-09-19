<template>
  <baseModal title="新增產品">
    <template #body>
      <baseInput label="產品圖片路徑" placeholder="請輸入產品圖片路徑" />
      <baseInput label="產品名稱" placeholder="請輸入產品名稱" />
      <baseInput label="產品分類" placeholder="請輸入產品分類" />
      <baseInput label="單位" placeholder="請輸入單位" />
      <baseInput label="產品定價" type="number" placeholder="請輸入產品定價" />
      <baseInput label="產品售價" type="number" placeholder="請輸入產品售價" />
      <baseInput label="產品描述" placeholder="請輸入產品描述" />
      <baseInput label="產品備註" placeholder="請輸入產品備註" />
    </template>
  </baseModal>
</template>

<script lang="ts" setup>
import baseModal from "@/components/base/modal.vue";
import baseInput from "@/components/base/input.vue";
</script>

<style lang="scss" scoped></style>
