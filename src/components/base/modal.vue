<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-[30px] opacity-100 visible transition-opacity duration-300 ease-in-out"
  >
    <div
      class="flex flex-col bg-zinc-800 border rounded-xl shadow-lg w-9/10 max-w-md max-h-8/10 backdrop-blur-[10px] pt-14 overflow-hidden"
    >
      <div
        class="absolute top-0 left-0 w-full flex justify-between items-center h-14 bg-zinc-800 z-10 px-3"
      >
        <h2 class="text-lg text-white">{{ title }}</h2>
        <button
          class="bg-zinc-600 text-2xl text-white outline-none w-7 h-7 flex justify-center items-center rounded hover:bg-zinc-700 cursor-pointer"
          @click="$emit('close')"
        >
          <fa-icon icon="xmark" class="text-sm"></fa-icon>
        </button>
      </div>
      <div class="py-2 px-4 text-base flex-1 overflow-y-auto">
        <slot name="body"></slot>
      </div>
      <div class="py-2 px-4 text-base">
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
