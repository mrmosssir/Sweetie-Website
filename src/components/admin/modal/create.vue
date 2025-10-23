<template>
  <baseModal :title="title">
    <template #body>
      <form @submit.prevent="onSubmit" class="flex flex-col gap-y-4">
        <div v-for="field in fields" :key="field.key">
          <baseInput
            :label="field.label"
            :name="field.key"
            :type="field.type"
            :placeholder="field.placeholder"
            :model-value="formValues[field.key]"
            @update:model-value="(value: any) => setFieldValue(field.key, value)"
          />
        </div>
      </form>
    </template>
    <template #footer>
      <div class="flex justify-end items-center gap-2">
        <button
          class="bg-[#477182] text-white rounded-sm px-10 py-2 cursor-pointer"
          @click="onSubmit"
        >
          送出
        </button>
        <button
          v-if="form?.id"
          class="bg-red-400 text-white rounded-sm px-10 py-2 cursor-pointer"
          @click="emit('delete', form.id)"
        >
          刪除
        </button>
      </div>
    </template>
  </baseModal>
</template>

<script lang="ts" setup>
import { watch, nextTick } from "vue";
import { useForm } from "vee-validate";
import baseModal from "@/components/admin/modal.vue";
import baseInput from "@/components/admin/input.vue";

export type FormField = {
  key: string;
  type: "text" | "number" | "password" | "datetime" | "boolean";
  label: string;
  placeholder?: string;
  rules?: string | Record<string, any>;
};

const props = defineProps<{
  title: string;
  fields: FormField[];
  form?: Record<string, any>;
}>();

const emit = defineEmits<{
  (event: "submit", form: Record<string, any>): void;
  (event: "delete", id: any): void;
}>();

const validationSchema = props.fields.reduce((schema, field) => {
  if (field.rules) {
    schema[field.key] = field.rules;
  }
  return schema;
}, {} as Record<string, any>);

const {
  handleSubmit,
  values: formValues,
  setValues,
  resetForm,
  setFieldValue,
} = useForm({
  validationSchema: validationSchema,
});

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
});

watch(
  () => props.form,
  async (newData) => {
    if (newData) {
      // 完全重置表單
      resetForm();
      // 創建一個完全乾淨的物件
      const cleanData: Record<string, any> = {};
      Object.keys(newData).forEach((key) => {
        const value = newData[key];
        if (value !== null && value !== undefined) {
          cleanData[key] =
            typeof value === "object" && value !== null ? JSON.parse(JSON.stringify(value)) : value;
        }
      });
      setValues(cleanData);
    } else {
      resetForm();
    }
  },
  { immediate: true, deep: true }
);
</script>
