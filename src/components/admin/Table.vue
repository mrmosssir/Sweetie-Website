<template>
  <ul
    class="w-full grid gap-y-2 px-1"
    :style="{ gridTemplateColumns }"
  >
    <li
      class="grid col-span-full grid-cols-subgrid items-center bg-[#477182]/10 py-2 rounded-xs shadow-sm"
    >
      <span
        v-for="column in columns"
        :key="column.key || 'function_slot_header'"
        class="block font-thin text-sm text-zinc-600 pl-4"
      >
        {{ column.name }}
      </span>
    </li>
    <li
      v-for="(item, index) in data"
      :key="index"
      class="grid col-span-full grid-cols-subgrid items-center bg-white py-3 rounded-xs shadow-sm"
    >
      <span
        v-for="column in columns"
        :key="column.key || `function_slot_body_${index}`"
        class="block font-thin text-sm text-zinc-600 pl-4"
      >
        <template v-if="column.key">{{ item[column.key] }}</template>
        <slot v-else :item="item"></slot>
      </span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  name: "AdminTable",
});

const props = defineProps({
  columns: {
    type: Array as () => Array<TableColumn>,
    required: true,
  },
  data: {
    type: Array as () => Array<Record<string, any>>,
    required: true,
  },
});

const gridTemplateColumns = computed(() => `repeat(${props.columns.length}, auto)`);

export type TableColumn = {
  name: string;
  key?: string;
  width?: string;
};
</script>
