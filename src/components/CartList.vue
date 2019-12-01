<template>
  <div class="mb-3">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="h5 text-brown font-weight-normal">購物車清單</h2>
      <div>
        <button class="btn btn-outline-danger mr-3"
                @click.prevent="removeCartsItems">清空購物車
        </button>
        <span class="badge badge-secondary px-2 rounded-pill">{{ returnCartsAmount }}</span>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center border rounded px-3 py-2 mt-3">
      <p class="text-secondary m-0">總額</p>
      <strong class="text-brown font-weight-normal">NT{{ returnTotalPrice }}$</strong>
    </div>
    <div
      class="d-flex justify-content-between align-items-center border rounded px-3 py-2 mt-3"
      v-if="returncouponEnabled"
    >
      <p class="text-secondary m-0">折扣後</p>
      <strong class="text-brown font-weight-normal">NT{{ returnTotalAfterCoupon }}$</strong>
    </div>
    <div
      class="d-flex align-items-center border rounded p-3 mt-3"
      v-for="item in returnCarts"
      :key="item.id"
    >
      <button class="btn btn-outline-danger" @click.prevent="deleteCart(item.id)">
        <i class="fas fa-trash-alt"></i>
      </button>
      <div class="cart-image ml-2"
           :style="'background-image: url(' + item.product.imageUrl + ');'"></div>
      <div class="text-secondary ml-2">
        <p class="m-0">{{ item.product.title }}</p>
        <small>{{ item.qty }} / {{ item.product.unit }}</small>
      </div>
      <strong class="h5 font-weight-normal text-brown m-0 ml-auto">NT${{ item.total }}</strong>
    </div>
    <div class="border rounded p-3 mt-3">
      <div class="input-group">
        <input type="text" class="form-control" v-model="couponCode" placeholder="請輸入優惠碼" />
        <div class="input-group-append">
          <button class="btn btn-brown" @click.prevent="setCoupon()">送出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CartList',
  methods: {
    getCarts() {
      this.$store.dispatch('clientCart/clientGetCarts');
    },
    deleteCart(id) {
      this.$store.dispatch('clientCart/clientDeleteCart', id);
    },
    setCoupon() {
      this.$store.dispatch('clientCart/clientSetCoupon');
    },
    removeCartsItems() {
      this.$store.dispatch('clientCart/clientRemoveCartsItem');
    },
  },
  computed: {
    couponCode: {
      get() {
        return this.$store.state.client.couponCode;
      },
      set(value) {
        this.$store.commit('clientCart/CLIENT_COUPON_CODE', value);
      },
    },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> a00dcae... update version 2.0
=======
>>>>>>> master
    ...mapGetters('clientCart', [
      'returnCarts',
      'returnTotalPrice',
      'returnTotalAfterCoupon',
      'returncouponEnabled',
    ]),
    ...mapGetters('client', ['returnCartsAmount']),
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> a00dcae... update version 2.0
=======
>>>>>>> a00dcae... update version 2.0
=======
>>>>>>> master
  },
  created() {
    this.getCarts();
  },
};
</script>
