import { ref, readonly } from "vue";

export const useLoadingStore = () => {
  const loading = ref(false);

  const setLoading = (value: boolean) => {
    loading.value = value;
  };

  return {
    loading: readonly(loading),
    setLoading,
  };
};
