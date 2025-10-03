<template>
  <div
    class="h-dvh bg-gradient-to-b from-[#477182] via-[#6a7e87] to-[#f6d4c1] flex pt-3 pl-3 pr-2 pb-2 gap-3"
  >
    <SideBar />
    <div class="flex-1 flex flex-col gap-2">
      <Header />
      <div class="h-full bg-white rounded-sm p-4 flex flex-col">
        <Breadcrumb />
        <div class="flex-1 flex gap-x-2 overflow-y-auto">
          <router-view class="flex-1"></router-view>
          <div class="hidden w-96 rounded-lg bg-[#f6d4c1] xl:block"></div>
        </div>
      </div>
    </div>
    <Modal />
  </div>
</template>

<script setup lang="ts">
import SideBar from "@/components/admin/sidebar.vue";
import Header from "@/components/admin/header.vue";
import Breadcrumb from "@/components/admin/breadcrumb.vue";
import Modal from "@/components/modal/index.vue";

defineOptions({
  name: "AdminLayout",
});
</script>
