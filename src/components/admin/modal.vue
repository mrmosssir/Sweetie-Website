<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-[#477182]/10 opacity-100 visible transition-opacity duration-100 ease-in-out"
    @click.self="$emit('close')"
  >
    <div class="relative flex flex-col bg-white w-9/10 max-w-lg max-h-8/10 overflow-hidden p-4">
      <div class="flex justify-between items-center h-10">
        <h2 class="text-base text-gray-700">{{ title }}</h2>
        <button class="outline-none cursor-pointer p-2" @click="$emit('close')">
          <fa-icon icon="xmark" class="text-sm text-gray-400"></fa-icon>
        </button>
      </div>
      <div class="text-sm flex-1 overflow-y-auto py-2">
        <slot name="body"></slot>
      </div>
      <div class="text-sm py-2">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: "BaseModal" });

defineEmits(["close"]);

defineProps({
  title: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.modal {
  @apply fixed inset-0 flex items-center justify-center z-50;

  @apply bg-black/30 backdrop-blur-[10px];

  /* 動畫效果 */
  @apply opacity-0 invisible transition-opacity duration-300 ease-in-out;

  &.show {
    @apply opacity-100 visible;
  }

  &-frame {
    @apply bg-gray-900/60 p-6 rounded-lg shadow-lg w-9/10 max-w-xl max-h-8/10 overflow-y-auto;
  }

  &-header {
    @apply flex justify-between items-center py-2 px-4;
  }

  &-body,
  &-footer {
    @apply py-2 px-4 text-base;
  }

  &-close {
    @apply bg-gray-600 text-2xl text-white outline-none p-2 rounded-md hover:bg-gray-800;
  }
}
</style>
