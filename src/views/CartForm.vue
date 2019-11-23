<template>
    <div class="row mt-4 align-items-start">
        <div class="col-md-4">
          <CartList />
        </div>
        <div class="col-md-8">
            <h2 class="h5 text-brown font-weight-normal mb-4 margin-mobile">訂單資訊</h2>
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
    </div>
</template>

<script>
import CartList from '../components/CartList.vue';

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
  components: {
    CartList,
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
  },
};
</script>
