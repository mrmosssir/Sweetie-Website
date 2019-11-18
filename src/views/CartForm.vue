<template>
    <div class="row mt-4">
        <div class="col-8">
            <h2 class="h5 text-brown font-weight-normal mb-4">訂單資訊</h2>
            <form @submit.prevent="createOrder(form)">
              <div class="row">
                <div class="form-group col-6">
                  <label class="text-secondary" for="name">姓名</label>
                  <input class="form-control" v-model="form.user.name" type="text"
                         :class="{'is-invalid': errors.has('name')}"
                         v-validate="'required'" name="name">
                  <span class="text-danger" v-if="errors.has('name')">電話號碼不能為空</span>
                </div>
                <div class="form-group col-6">
                  <label class="text-secondary" for="phone">電話</label>
                  <input class="form-control" v-model="form.user.tel" type="number"
                         :class="{'is-invalid': errors.has('phone')}"
                         v-validate="'required'" name="phone">
                  <span class="text-danger" v-if="errors.has('phone')">電話號碼不能為空</span>
                </div>
              </div>
              <div class="form-group">
                <label class="text-secondary mt-4" for="mail">電子郵件</label>
                <input class="form-control" v-model="form.user.email" type="text"
                       :class="{'is-invalid': errors.has('mail')}"
                       v-validate="'required|email'" name="mail">
                <span class="text-danger"
                      v-if="errors.has('mail')">{{ errors.first('mail') }}
                </span>
              </div>
              <div class="form-group">
                <label class="text-secondary mt-4" for="mail">地址</label>
                <input class="form-control" v-model="form.user.address" type="text"
                       :class="{'is-invalid': errors.has('address')}"
                       v-validate="'required'" name="address">
                <span class="text-danger" v-if="errors.has('address')">地址不能為空</span>
              </div>
              <div class="form-group">
                <label class="text-secondary mt-4" for="mail">
                  備註
                  <small class="text-brown">(請告知我們用餐時間與人數)</small>
                </label>
                <textarea cols="50" rows="10" class="form-control" v-model="form.message"
                          :class="{'is-invalid': errors.has('address')}"
                          v-validate="'required'" name="address">
                </textarea>
                <span class="text-danger" v-if="errors.has('address')">別忘了告訴我們用餐時間和人數哦！</span>
              </div>
              <hr>
              <button class="btn btn-block btn-brown" type="submit">前往付款</button>
            </form>
        </div>
        <div class="col-4">
            <div class="d-flex justify-content-between align-items-center">
                <h2 class="h5 text-brown font-weight-normal">購物車清單</h2>
                <span class="badge badge-secondary px-2 rounded-pill">0</span>
            </div>
            <div class="d-flex justify-content-between
                        align-items-center border rounded px-3 py-2 mt-3">
                <p class="text-secondary m-0">總額</p>
                <strong class="text-brown font-weight-normal">NT{{ returnTotalPrice }}$</strong>
            </div>
            <div class="d-flex justify-content-between
                        align-items-center border rounded px-3 py-2 mt-3"
                 v-if="returncouponEnabled">
                <p class="text-secondary m-0">折扣後</p>
                <strong class="text-brown font-weight-normal">
                  NT{{ returnTotalAfterCoupon }}$
                </strong>
            </div>
            <div class="d-flex align-items-center border rounded p-3 mt-3"
                    v-for="item in returnCarts" :key="item.id">
                <button class="btn btn-outline-danger" @click.prevent="deleteCart(item.id)">
                    <i class="fas fa-trash-alt"></i>
                </button>
                <div class="cart-image ml-2"
                     :style="'background-image: url(' + item.product.imageUrl + ');'">
                </div>
                <div class="text-secondary ml-2">
                    <p class="m-0">{{ item.product.title }}</p>
                    <small>{{ item.qty }} / {{ item.product.unit }}</small>
                </div>
                <strong class="h5 font-weight-normal text-brown m-0 ml-auto">
                  NT${{ item.total }}
                </strong>
            </div>
            <div class="border rounded p-3 mt-3">
                <div class="input-group">
                    <input type="text" class="form-control"
                           v-model="couponCode" placeholder="請輸入優惠碼">
                    <div class="input-group-append">
                        <button class="btn btn-brown" @click.prevent="setCoupon()">送出</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Cartform',
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    getCarts() {
      this.$store.dispatch('clientGetCarts');
    },
    deleteCart(id) {
      this.$store.dispatch('clientDeleteCart', id);
    },
    createOrder(form) {
      this.$validator.validate().then((result) => {
        if (result) {
          this.$store.dispatch('clientCreateOrder', form);
        }
      });
    },
    setCoupon() {
      this.$store.dispatch('clientSetCoupon');
    },
  },
  computed: {
    returnCarts() {
      return this.$store.state.client.carts;
    },
    returnTotalPrice() {
      return this.$store.state.client.cartTotalPrice;
    },
    returnTotalAfterCoupon() {
      return this.$store.state.client.cartTotalAfterCoupon;
    },
    returncouponEnabled() {
      return this.$store.state.client.couponEnabled;
    },
    couponCode: {
      get() {
        return this.$store.state.client.couponCode;
      },
      set(value) {
        this.$store.commit('CLIENT_COUPON_CODE', value);
      },
    },
  },
  created() {
    this.getCarts();
    this.$emit('transferSchdule', 'first', false);
  },
};
</script>
