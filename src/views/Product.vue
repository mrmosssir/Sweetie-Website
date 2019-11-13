<template>
    <div class="mb-4">
      <router-view @cartlen="getCartLen"></router-view>
      <router-link to="/cart" class="btn-cart">
        <i class="fas fa-shopping-basket"></i>
        <span class="badge badge-pill badge-green-light btn-cart-badge px-2 py-1">
          {{ cartLen }}
        </span>
      </router-link>
    </div>
</template>

<script>
export default {
  name: 'Shop',
  data() {
    return {
      cartLen: 0,
    };
  },
  methods: {
    getCartLen(len) {
      this.cartLen = len;
    },
  },
};
</script>
