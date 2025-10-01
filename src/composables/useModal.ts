import { readonly, shallowRef, markRaw, type Component } from "vue";

interface ModalState {
  component: Component | null;
  props: Record<string, any>;
  listeners: Record<string, (...args: any[]) => void>;
}

const modalState = shallowRef<ModalState>({
  component: null,
  props: {},
  listeners: {},
});

const setModal = (options: Partial<ModalState>) => {
  modalState.value = {
    component: options.component ? markRaw(options.component) : null,
    props: options.props || {},
    listeners: options.listeners || {},
  };
};

const closeModal = () => {
  modalState.value = {
    component: null,
    props: {},
    listeners: {},
  };
};

export const useModal = () => {
  return {
    modalState: readonly(modalState),
    setModal,
    closeModal,
  };
};
