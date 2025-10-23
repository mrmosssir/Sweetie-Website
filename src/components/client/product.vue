<template>
  <div class="w-full max-w-64 mx-auto">
    <div
      class="relative bg-cover bg-center bg-no-repeat w-full aspect-[4/5]"
      :style="{ backgroundImage: `url(${product.image})` }"
    >
      <div class="flex flex-col gap-y-2 absolute top-0 right-0 p-3">
        <button
          class="bg-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
          @click="handleFavorite(isFavorite)"
        >
          <fa-icon
            :icon="[isFavorite ? 'fas' : 'far', 'heart']"
            class="text-lg text-gray-500"
          ></fa-icon>
        </button>
      </div>
    </div>
    <span class="block text-sm text-black mt-2">{{ product.name }}</span>
    <div class="flex items-center gap-x-2 mt-2">
      <span class="text-sm text-[#477182]">${{ product.price.toFixed(2) }}</span>
      <del class="text-sm text-gray-400 line-through">${{ product.originPrice.toFixed(2) }}</del>
    </div>
    <button
      class="bg-gray-200 text-gray-700 px-2 py-0.5 cursor-pointer mt-2"
      @click="cartStore.addToCart(product.id)"
    >
      加入購物車
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";

export type ProductProps = {
  id: string;
  name: string;
  image: string;
  price: number;
  originPrice: number;
  rating: number;
};

defineOptions({
  name: "ProductComponent",
});

const props = defineProps<{
  product: ProductProps;
}>();

const cartStore = useCartStore();
const productStore = useProductStore();

const isFavorite = computed(() => productStore.favorites.includes(props.product.id));

const handleFavorite = (isFavorite: boolean) => {
  !isFavorite
    ? productStore.addFavorites(props.product.id)
    : productStore.removeFavorites(props.product.id);
};
</script>

<style></style>
