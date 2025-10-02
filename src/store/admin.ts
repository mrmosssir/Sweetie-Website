import { defineStore } from "pinia";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    search: "",
  }),
  actions: {
    setSearch(value: string) {
      this.search = value;
    },
  },
});
