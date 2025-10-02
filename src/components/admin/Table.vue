<template>
  <table class="w-full rounded-lg overflow-hidden">
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.key || 'function_slot_th'"
          class="bg-[#477182]/80 font-thin text-white text-center py-3"
          :class="[`w-${column.width || 'auto'}`]"
        >
          {{ column.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in data"
        :key="index"
        :class="[index % 2 === 0 ? 'bg-white' : 'bg-gray-100']"
      >
        <td
          v-for="column in columns"
          :key="column.key || 'function_slot_td'"
          class="text-center font-thin text-gray-700 py-3"
        >
          <span v-if="column.key">{{ item[column.key] }}</span>
          <slot v-else :item="item"></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
defineOptions({
  name: "AdminTable",
});

defineProps({
  columns: {
    type: Array as () => Array<TableColumn>,
    required: true,
  },
  data: {
    type: Array as () => Array<Record<string, any>>,
    required: true,
  },
});

export type TableColumn = {
  name: string;
  key?: string;
  width?: string;
};
</script>
