<template>
  <div class="relative w-full mb-4">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="block text-xs font-medium text-zinc-200 mb-2 transition-all duration-200"
      :class="{ 'text-blue-600': isFocused || hasValue }"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Input Container -->
    <div class="relative rounded-lg">
      <!-- Input Field -->
      <input
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
        class="w-full p-2 rounded-lg bg-zinc-900 text-sm outline-none"
        :class="{
          'placeholder:text-zinc-600': !hasError,
          'inset-ring inset-ring-zinc-500 text-white': isFocused,
          'inset-ring inset-ring-red-600 text-red-600 placeholder:text-red-700': hasError,
          'opacity-60 cursor-not-allowed': disabled,
        }"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />

      <!-- Icon (if provided) -->
      <div v-if="icon" class="input-icon">
        <fa-icon :icon="icon" />
      </div>

      <!-- Password toggle -->
      <button
        v-if="type === 'password'"
        type="button"
        class="input-toggle"
        @click="togglePasswordVisibility"
      >
        <fa-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
      </button>
    </div>

    <!-- Error Message -->
    <div v-if="hasError" class="input-error">
      {{ errorMessage }}
    </div>

    <!-- Helper Text -->
    <div v-if="helperText && !hasError" class="input-helper">
      {{ helperText }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";

// Props 定義
interface Props {
  // v-model
  modelValue?: string | number;
  // 基本屬性
  type?: "text" | "number" | "password";
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
  "update:modelValue": [value: string | number];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  keydown: [event: KeyboardEvent];
}>();

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

// 方法
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value: string | number = target.value;

  // 數字類型處理
  if (props.type === "number") {
    value = value === "" ? "" : Number(value);
  }

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

// 生命週期
onMounted(() => {
  inputId.value = `input-${Math.random().toString(36).substr(2, 9)}`;
});
</script>

<style lang="scss" scoped>
.input-wrapper {
  @apply relative w-full mb-6;
}

.input-label {
  @apply block text-sm font-medium text-gray-700 mb-2 transition-all duration-200;

  &--focused {
    @apply text-blue-600;
  }
}

.input-container {
  @apply relative;

  &::before {
    content: "";
    @apply before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-blue-500 before:transition-all before:duration-300;
  }

  &--focused {
    &::before {
      @apply w-full;
    }
  }

  &--error {
    &::before {
      @apply bg-red-500 w-full;
    }
  }

  &--disabled {
    @apply opacity-60 cursor-not-allowed;
  }
}

.input-field {
  @apply w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg
         transition-all duration-200 outline-none;

  // 漂亮的陰影效果
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    @apply border-blue-500;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    @apply text-gray-400;
  }

  &:disabled {
    @apply bg-gray-50 cursor-not-allowed;
  }

  // 數字輸入樣式
  &[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

.input-icon {
  @apply absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none;
}

.input-toggle {
  @apply absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 
         bg-transparent border-0 cursor-pointer transition-colors duration-200 outline-none
         hover:text-gray-600 focus:text-blue-500;
}

.input-error {
  @apply mt-2 text-sm text-red-600;
}

.input-helper {
  @apply mt-2 text-sm text-gray-600;
}

// 錯誤狀態樣式
.input-container--error {
  .input-field {
    @apply border-red-300;
    box-shadow: 0 1px 3px rgba(239, 68, 68, 0.1);

    &:focus {
      @apply border-red-500;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
    }
  }
}

// 響應式設計
@media (max-width: 640px) {
  .input-field {
    @apply px-3 py-2.5 text-base;
  }
}
</style>
