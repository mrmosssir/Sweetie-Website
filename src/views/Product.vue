<template>
  <div class="mt-5">
    <router-view></router-view>
    <button class="btn-cart" @click.prevent="transferCartForm">
      <i class="fas fa-shopping-basket"></i>
      <span class="badge badge-pill badge-green-light btn-cart-badge px-2 py-1">
        {{ returnCartsAmount }}
      </span>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Shop',
  methods: {
    transferCartForm() {
      if (this.returnCartsAmount <= 0) {
        this.$store.commit('ERROR', {
          error: true,
          message: '購物車內還沒有任何商品呦 ! 要不要再逛逛 ^^',
        });
        setTimeout(() => {
          this.$store.commit('ERROR', {
            error: false,
            message: '',
          });
        }, 3000);
      } else {
        this.$router.push('/cart');
      }
    },
  },
  computed: {
    ...mapGetters('client', ['returnCartsAmount']),
  },
};
</script>
