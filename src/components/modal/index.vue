<template>
  <transition name="fade">
    <div v-if="currentModal" class="modal-backdrop" @click.self="closeModal">
      <component :is="currentModal" v-bind="modalProps" @close="closeModal" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import { useModal } from "@/composables/useModal";

const { modalTarget, modalProps, closeModal } = useModal();

// modalMap 用於映射 modal 名稱到其組件
const modalMap = {
  couple: defineAsyncComponent(() => import("@/components/modal/couple.vue")),
  create: defineAsyncComponent(() => import("@/components/modal/create.vue")),
} as const;

type ModalKey = keyof typeof modalMap;

// 根據當前的 modalTarget 計算出對應的組件
const currentModal = computed(() => modalMap[modalTarget.value as ModalKey] || null);
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* High z-index to be on top of everything */
}

/* Basic fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
