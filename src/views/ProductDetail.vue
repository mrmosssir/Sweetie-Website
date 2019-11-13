<template>
    <div>
      <div class="row">
          <div class="col-md-6">
              <div class="detail-image-position h-100"
                   :style="`background-image: url(${product.imageUrl});`">
              </div>
          </div>
          <div class="col-md-6">
            <span class="badge badge-brown mb-4">{{ product.category }}</span>
            <h2 class="h3 font-weight-normal text-secondary">{{ product.title }}</h2>
            <hr class="detail-line">
            <p class="text-brown">【產品說明】</p>
            <p class="text-secondary">{{ product.content }}</p>
            <strong class="h4 text-brown">NT${{ product.price }}</strong>
            <del class="h6 text-secondary">NT${{ product.origin_price }}</del>
            <select class="d-block w-50 mt-4" v-model="amount">
                <option v-for="num in 10" :key="num" :value=num>
                  購買 {{ num }}{{ product.unit }}
                </option>
            </select>
            <p class="text-right h5 mt-4 text-secondary">Total:
              <strong class="h3 font-weight-normal text-brown">
                ${{ product.price * amount }}
              </strong>
            </p>
            <hr>
            <div class="text-right mt-4">
                <button class="btn btn-outline-secondary" @click.prevent="goBack()">取消</button>
                <button class="btn btn-brown" @click.prevent="addCart()">加到購物車</button>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data() {
    return {
      product: {},
      productId: '',
      amount: 1,
      cartList: [],
      totalPrice: 0,
    };
  },
  methods: {
    getProductDetail() {
      this.productId = this.$route.params.productId;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${this.productId}`;
      const vm = this;
      this.$http.get(api).then((Response) => {
        if (Response.data.success) {
          vm.product = Response.data.product;
        } else {
          // alert('此產品已遭到移除');
        }
      });
    },
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then((Response) => {
        if (Response.data.success) {
          vm.cartList = Response.data.data.carts;
          vm.totalPrice = Response.data.data.final_total;
        }
      });
    },
    addCart() {
      const cartInfo = {
        product_id: this.productId,
        qty: this.amount,
      };
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.post(api, { data: cartInfo }).then((Response) => {
        if (Response.data.success) {
          vm.getCart();
        } else {
          // alert('送出訂單時發生錯誤');
        }
      });
    },
    deleteCart(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      const vm = this;
      this.$http.delete(api).then((Response) => {
        if (Response.data.success) {
          vm.getCart();
        }
      });
    },
    goBack() {
      this.$router.push('/shop');
    },
  },
  created() {
    this.getProductDetail();
    this.getCart();
  },
};
</script>
