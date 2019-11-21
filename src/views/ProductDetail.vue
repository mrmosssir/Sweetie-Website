<template>
    <div>
      <router-link to="/shop" class="d-block text-green-light mb-5">
          <i class="fas fa-backward mr-3"></i>
          回到商品區
      </router-link>
      <div class="row">
        <div class="col-md-3">
          <CartList />
        </div>
        <div class="col-md-5">
          <div class="detail-image-position h-100"
               :style="`background-image: url(${returnProduct.imageUrl});`">
          </div>
        </div>
        <div class="col-md-4">
          <span class="badge badge-brown mb-4">{{ returnProduct.category }}</span>
          <h2 class="h3 font-weight-normal text-secondary">{{ returnProduct.title }}</h2>
          <hr>
          <p class="text-brown">【產品說明】</p>
          <p class="text-secondary">{{ returnProduct.content }}</p>
          <strong class="h4 text-brown mr-2">
            <small class="font-weight-bold">NT$</small>
            {{ returnProduct.price }}
          </strong>
          <del class="h6 text-secondary">
            <small class="font-weight-bold">NT$</small>
            {{ returnProduct.origin_price }}
          </del>
          <select class="select-block mt-4" v-model="productAmount">
            <option v-for="num in 10" :key="num" :value=num>
              購買 {{ num }} {{ returnProduct.unit }}
            </option>
          </select>
          <p class="text-right h5 mt-4 text-secondary">總共 :
            <strong class="h3 font-weight-normal text-brown">
              <small class="font-weight-bold">NT$</small>
              {{ returnProduct.price * productAmount }}
            </strong>
          </p>
          <hr>
          <div class="d-flex justify-content-between mt-4">
            <button class="btn btn-brown" @click.prevent="addCart()">加到購物車</button>
            <button class="btn btn-outline-secondary" @click.prevent="pageReturn()">查看其他商品</button>
          </div>
        </div>
      </div>
      <hr class="my-5">
      <h2 class="mb-4">新商品上架</h2>
      <Spotlight />
    </div>
</template>

<script>
import CartList from '../components/CartList.vue';
import Spotlight from '../components/Spotlight.vue';

export default {
  name: 'ProductDetail',
  components: {
    CartList,
    Spotlight,
  },
  methods: {
    getProductDetail(id) {
      this.$store.dispatch('clientGetProductDetail', id);
    },
    addCart() {
      this.$store.dispatch('clientAddCart', {
        id: this.returnProduct.id,
        amount: this.productAmount,
      });
    },
    pageReturn() {
      this.$store.dispatch('clientProductPageReturn');
    },
  },
  computed: {
    returnProduct() {
      return this.$store.state.client.product;
    },
    productAmount: {
      get() {
        return this.$store.state.client.productAmount;
      },
      set(value) {
        this.$store.commit('CLIENT_PRODUCTAMOUNT', value);
      },
    },
  },
  created() {
    this.getProductDetail(this.$route.params.productId);
  },
};
</script>
