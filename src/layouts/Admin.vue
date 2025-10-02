<template>
  <div class="h-dvh bg-gradient-to-b from-[#477182] to-[#6a7e87] flex pt-3 pl-3 pr-2 pb-2 gap-3">
    <SideBar />
    <div class="flex-1 flex flex-col gap-2">
      <Header />
      <div class="h-full bg-white rounded-2xl p-4 flex flex-col">
        <Breadcrumb />
        <div class="flex-1 flex gap-x-2 overflow-y-auto">
          <router-view class="flex-1"></router-view>
          <div class="hidden w-3/10 rounded-lg bg-red-200 xl:block"></div>
        </div>
      </div>
    </div>
    <Modal />
  </div>
</template>

<script setup lang="ts">
import SideBar from "@/components/admin/SideBar.vue";
import Header from "@/components/admin/Header.vue";
import Breadcrumb from "@/components/admin/Breadcrumb.vue";
import Modal from "@/components/modal/index.vue";

defineOptions({
  name: "AdminLayout",
});
</script>
