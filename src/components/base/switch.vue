<script setup>
import { computed } from "vue";

// 接收來自父層的 v-model
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  // 可選的 id，用於 label 的 for 屬性
  id: {
    type: String,
    default: null,
  },
});

// 定義 v-model 需要的 emit 事件
const emit = defineEmits(["update:modelValue"]);

// 如果沒有傳入 id，就隨機生成一個，確保 label 和 input 能對應
const switchId = computed(() => props.id || `switch-${Math.random().toString(36).slice(2, 9)}`);

// 建立一個 computed property 來雙向綁定 checkbox 的值
const value = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>

<template>
  <div class="switch-wrapper">
    <input type="checkbox" :id="switchId" class="switch-input" v-model="value" />
    <label :for="switchId" class="switch-label"></label>
  </div>
</template>

<style scoped>
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
</style>
