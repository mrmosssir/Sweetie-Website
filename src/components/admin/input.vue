<template>
  <div
    class="relative w-full flex items-center justify-between gap-3 min-h-10 bg-gray-200 pl-3 pr-2 inset-ring"
    :class="[hasError ? 'inset-ring-red-500' : 'inset-ring-gray-200']"
  >
    <label v-if="label" :for="inputId" class="text-xs text-gray-500">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative flex-1 text-right">
      <!-- Switcher -->
      <div v-if="type === 'boolean'" class="switch-wrapper">
        <input type="checkbox" :id="inputId" class="switch-input" v-model="switchValue" />
        <label :for="inputId" class="switch-label"></label>
      </div>

      <!-- Datepicker -->
      <VueDatePicker
        v-else-if="type === 'datetime'"
        :model-value="modelValue as number"
        @update:model-value="handleDateUpdate"
        teleport-center
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full"
      />

      <!-- File Upload -->
      <template v-else-if="type === 'file'">
        <input ref="fileInput" type="file" @change="handleUploadChange" hidden />
        <input type="text" class="h-full w-full outline-none cursor-pointer" :value="modelValue" readonly @click="handleUploadClick" />
      </template>

      <!-- Input Field -->
      <input
        v-else
        :id="inputId"
        :type="currentType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :readonly="readonly"
        :min="min"
        :max="max"
        :step="step"
        class="w-full p-2 rounded-lg text-xs outline-none text-right"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
    </div>

    <!-- Error Message -->
    <div v-if="hasError" class="mt-2 text-xs text-red-600">
      {{ errorMessage }}
    </div>

    <!-- Helper Text -->
    <div v-if="helperText && !hasError" class="mt-2 text-xs text-gray-600">
      {{ helperText }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@vuepic/vue-datepicker/dist/main.css";

import { ref, computed, onMounted } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";

import { uploadFileApi } from "@/request/upload";

type InputValue = string | number | Date | boolean | File | Blob;

// Props 定義
interface Props {
  // v-model
  modelValue?: InputValue;
  // 基本屬性
  type?: "text" | "number" | "password" | "datetime" | "boolean" | "file";
  label?: string;
  placeholder?: string;
  // 狀態
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  // 數字輸入專用
  min?: string | number;
  max?: string | number;
  step?: string | number;
  // 樣式和輔助
  icon?: string;
  errorMessage?: string;
  helperText?: string;
  // 來源位置 (給上傳圖片用)
  page: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
  readonly: false,
  required: false,
  min: undefined,
  max: undefined,
  step: undefined,
  icon: "",
  errorMessage: "",
  helperText: "",
});

// Emits 定義
const emit = defineEmits<{
  "update:modelValue": [value: InputValue];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  keydown: [event: KeyboardEvent];
}>();

const fileInput = ref<HTMLInputElement | null>(null);

// 響應式狀態
const isFocused = ref(false);
const showPassword = ref(false);
const inputId = ref("");

// 計算屬性
const hasValue = computed(() => {
  return props.modelValue !== "" && props.modelValue !== null && props.modelValue !== undefined;
});

const hasError = computed(() => {
  return !!props.errorMessage;
});

const currentType = computed(() => {
  if (props.type === "password") {
    return showPassword.value ? "text" : "password";
  }
  return props.type;
});

const switchValue = computed({
  get() {
    return props.modelValue as boolean;
  },
  set(newValue: boolean) {
    emit("update:modelValue", newValue);
  },
});

// 方法
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value: InputValue = target.value;

  // 數字類型處理
  if (props.type === "number") {
    value = value ? Number(value) : "";
  }

  // 檔案類型處理
  if (props.type === "file" && target.files && target.files.length > 0) {
    value = target.files[0];
  }

  emit("update:modelValue", value);
};

const handleDateUpdate = (value: Date) => {
  emit("update:modelValue", value);
};

const handleFocus = (event: FocusEvent) => {
  isFocused.value = !hasError.value;
  emit("focus", event);
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit("blur", event);
};

const handleKeydown = (event: KeyboardEvent) => {
  emit("keydown", event);
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleUploadClick = () => {
  console.log("handleUploadClick", fileInput.value);
  if (!fileInput.value) return;
  fileInput.value.click();
};

const handleUploadChange = async (event: Event) => {
  try {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const { data } = await uploadFileApi(target.files[0], props.page);
      if (!data.url) return;
      emit("update:modelValue", data.url);
    }
  } catch (error) {
    console.error("File upload failed:", error);
  }
};
// 生命週期
onMounted(() => {
  inputId.value = `input-${Math.random().toString(36).substr(2, 9)}`;
});
</script>

<style lang="scss" scoped>
.switch-wrapper {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}

/* 隱藏原生的 checkbox */
.switch-input {
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;
}

/* 這是開關的軌道 */
.switch-label {
  cursor: pointer;
  width: 48px;
  height: 24px;
  background: #b3b3b3; /* 關閉時的顏色 */
  display: block;
  border-radius: 100px;
  position: relative;
  transition: background-color 0.2s ease-in-out;
}

/* 這是開關的滑塊 (thumb) */
.switch-label::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  transition: left 0.2s ease-in-out;
}

/* 當 checkbox 被選中時，改變 label 的樣式 */
.switch-input:checked + .switch-label {
  background: #42b983; /* 開啟時的顏色 (Vue 綠) */
}

/* 當 checkbox 被選中時，移動滑塊的位置 */
.switch-input:checked + .switch-label::after {
  left: calc(100% - 2px);
  transform: translateX(-100%);
}

:deep([data-test-id="dp-input"]) {
  background: transparent;
  border: none;
  text-align: center;
}
</style>
