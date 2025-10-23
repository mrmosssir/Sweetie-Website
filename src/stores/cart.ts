import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    carts: [] as { productId: string; quantity: number }[],
  }),
  actions: {
    initCart() {
      this.carts = JSON.parse(localStorage.getItem("cart") || "[]");
    },
    addToCart(productId: string, quantity: number = 1) {
      const item = this.carts.find((item) => item.productId === productId);
      item ? (item.quantity += quantity) : this.carts.push({ productId, quantity });
      localStorage.setItem("cart", JSON.stringify(this.carts));
    },
    removeFromCart(productId: string) {
      this.carts = this.carts.filter((item) => item.productId !== productId);
      localStorage.setItem("cart", JSON.stringify(this.carts));
    },
    clearCart() {
      this.carts = [];
      localStorage.setItem("cart", JSON.stringify(this.carts));
    },
  },
});
