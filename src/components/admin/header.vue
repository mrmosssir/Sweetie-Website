<template>
  <div class="flex justify-end items-center py-2">
    <div
      class="flex justify-center items-center gap-x-2 p-1 pl-3 bg-white text-[#477182] rounded-xs"
    >
      <input class="border-0 outline-none h-4 text-sm" type="text" v-model="search" />
      <button
        class="w-7 h-7 text-xs bg-white rounded-full cursor-pointer"
        @click.prevent="handleSearch"
      >
        <fa-icon icon="search"></fa-icon>
      </button>
    </div>
    <!-- <button
      class="w-8 h-8 text-white rounded-full cursor-pointer opacity-50 ml-4"
      @click.prevent="handleLogout"
    >
      <fa-icon icon="right-from-bracket"></fa-icon>
    </button> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { auth } from "@/firebase";
import { useAdminStore } from "@/stores/admin";

defineOptions({
  name: "AdminHeader",
});

const router = useRouter();
const adminStore = useAdminStore();

const search = ref<string>("");

const handleLogout = async () => {
  await signOut(auth);
  router.push({ path: "/login" });
};

const handleSearch = () => {
  adminStore.setSearch(search.value);
};
</script>
