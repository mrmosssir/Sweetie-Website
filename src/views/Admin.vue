<template>
  <div class="h-dvh bg-gradient-to-b from-[#477182] to-[#6a7e87] flex pt-3 pl-3 pr-2 pb-2 gap-3">
    <SideBar />
    <div class="flex-1 flex flex-col">
      <TopBar />
      <div class="h-full bg-white rounded-2xl p-4">
        <router-view></router-view>
      </div>
    </div>
    <Modal />
  </div>
</template>

<script setup lang="ts">
import SideBar from "@/components/admin/SideBar.vue";
import TopBar from "@/components/TopBar.vue";
import Modal from "@/components/modal/index.vue";

defineOptions({
  name: "Admin",
});
</script>
