<template>
    <div class="mb-4">
      <router-view></router-view>
      <router-link to="/cart" class="btn-cart">
        <i class="fas fa-shopping-basket"></i>
        <span class="badge badge-pill badge-green-light btn-cart-badge px-2 py-1">
          {{ returnCartsAmount }}
        </span>
      </router-link>
    </div>
</template>

<script>
export default {
  name: 'Shop',
  computed: {
    returnCartsAmount() {
      return this.$store.state.client.cartsAmount;
    },
  },
};
</script>
