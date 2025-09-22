import { ref, readonly, shallowRef, type Ref } from "vue";

// 使用 shallowRef 來存儲 modal 的目標名稱和屬性，
// 以避免不必要的深層響應式追蹤。
const modalTarget = shallowRef<string | null>(null);
const modalProps = ref<Record<string, any>>({});

/**
 * 設定 modal 的目標和屬性。
 * @param {string | null} target - 目標 modal 的名稱，或 null 以關閉 modal。
 * @param {object} [props={}] - 傳遞給 modal 組件的屬性。
 */
const setModal = (target: string | null, props: Record<string, any> = {}) => {
  modalTarget.value = target;
  modalProps.value = props;
};

/**
 * 關閉當前的 modal。
 */
const closeModal = () => {
  setModal(null);
};

export const useModal = () => {
  return {
    modalTarget: readonly(modalTarget),
    modalProps: readonly(modalProps),
    setModal,
    closeModal,
  };
};
