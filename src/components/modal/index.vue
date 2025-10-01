<template>
  <transition name="fade">
    <div v-if="modalState.component" class="modal-backdrop" @click.self="closeModal">
      <component
        :is="modalState.component"
        v-bind="modalState.props"
        v-on="modalState.listeners"
        @close="closeModal"
      />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useModal } from "@/composables/useModal";

const { modalState, closeModal } = useModal();
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
