<template>
    <div>
      <div class="row">
          <div class="col-md-6">
              <div class="detail-image-position h-100"
                   :style="`background-image: url(${returnProduct.imageUrl});`">
              </div>
          </div>
          <div class="col-md-6">
            <span class="badge badge-brown mb-4">{{ returnProduct.category }}</span>
            <h2 class="h3 font-weight-normal text-secondary">{{ returnProduct.title }}</h2>
            <hr class="detail-line">
            <p class="text-brown">【產品說明】</p>
            <p class="text-secondary">{{ returnProduct.content }}</p>
            <strong class="h4 text-brown">NT${{ returnProduct.price }}</strong>
            <del class="h6 text-secondary">NT${{ returnProduct.origin_price }}</del>
            <select class="d-block w-50 mt-4" v-model="productAmount">
                <option v-for="num in 10" :key="num" :value=num>
                  購買 {{ num }}{{ returnProduct.unit }}
                </option>
            </select>
            <p class="text-right h5 mt-4 text-secondary">Total:
              <strong class="h3 font-weight-normal text-brown">
                ${{ returnProduct.price * productAmount }}
              </strong>
            </p>
            <hr>
            <div class="text-right mt-4">
                <button class="btn btn-outline-secondary" @click.prevent="pageReturn()">取消</button>
                <button class="btn btn-brown" @click.prevent="addCart()">加到購物車</button>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ProductDetail',
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
