import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    favorites: [] as string[],
  }),
  actions: {
    initFavorites() {
      const rawData = localStorage.getItem("favorites");
      this.favorites = JSON.parse(rawData || "[]");
    },
    addFavorites(productId: string) {
      this.favorites.push(productId);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    removeFavorites(productId: string) {
      this.favorites = this.favorites.filter((id) => id !== productId);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },
});
