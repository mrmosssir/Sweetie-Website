<template>
  <div class="flex flex-col gap-y-1">
    <label class="text-sm text-gray-700">
      {{ props.label }}
      <span v-if="props.required">*</span>
    </label>
    <input
      type="text"
      class="border border-gray-300 rounded text-sm text-gray-900 p-2 outline-none"
      :value="props.modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "ClientInput",
});

const props = defineProps<{
  label?: string;
  modelValue?: string;
  required?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>
