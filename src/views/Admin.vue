<template>
  <div class="container-fluid">
    <div class="row open-pc" :class="{ 'loading-target': loadingStore.loading }">
      <Loading v-if="loadingStore.loading" />
      <div class="col-md-2">
        <SideBar />
      </div>
      <div class="col-md-10">
        <TopBar />
        <router-view></router-view>
      </div>
      <Modal />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";

import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";
import Loading from "@/components/Loading.vue";
import Modal from "@/components/modal/index.vue";

import { checkAuth } from "@/request/auth";
import { useLoadingStore } from "@/stores/loading";

defineOptions({
  name: "Admin",
});

const loadingStore = useLoadingStore();

onBeforeMount(() => checkAuth());
</script>
