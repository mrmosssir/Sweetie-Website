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
            v-model="formValues[field.key]"
          />
        </div>
      </form>
    </template>
    <template #footer>
      <button @click="onSubmit">送出</button>
      <button v-if="form && form.id" @click="emit('delete', form.id)">刪除</button>
    </template>
  </baseModal>
</template>

<script lang="ts" setup>
import { watch } from "vue";
import { useForm } from "vee-validate";
import baseModal from "@/components/base/modal.vue";
import baseInput from "@/components/base/input.vue";

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
  setValues,
  values: formValues,
} = useForm({
  initialValues: props.form,
  validationSchema: validationSchema,
});

const onSubmit = handleSubmit((values) => {
  emit("submit", values);
});

watch(
  () => props.form,
  (newData) => {
    setValues(newData || {});
  },
  { immediate: true, deep: true }
);
</script>
