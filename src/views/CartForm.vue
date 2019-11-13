<template>
    <div class="row mt-4">
        <div class="col-8">
            <h2 class="h5 text-brown font-weight-normal mb-4">訂單資訊</h2>
            <form @submit.prevent="createOrder()">
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
                <strong class="text-brown font-weight-normal">NT{{ totalPrice }}$</strong>
            </div>
            <div class="d-flex justify-content-between
                        align-items-center border rounded px-3 py-2 mt-3"
                 v-if="couponEnabled">
                <p class="text-secondary m-0">折扣後</p>
                <strong class="text-brown font-weight-normal">NT{{ totalAfterCoupon }}$</strong>
            </div>
            <div class="d-flex align-items-center border rounded p-3 mt-3"
                    v-for="item in carts" :key="item.id">
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
      carts: [],
      totalPrice: 0,
      totalAfterCoupon: 0,
      couponCode: '',
      couponEnabled: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      orderId: '',
    };
  },
  methods: {
    getCarts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then((Response) => {
        vm.carts = Response.data.data.carts;
        vm.totalPrice = Response.data.data.total;
        vm.totalAfterCoupon = Response.data.data.final_total;
      });
    },
    deleteCart(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      const vm = this;
      this.$http.delete(api).then((Response) => {
        if (Response.data.success) {
          vm.getCarts();
        }
      });
    },
    createOrder() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const vm = this;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(api, { data: vm.form }).then((Response) => {
            if (Response.data.success) {
              vm.orderId = Response.data.orderId;
              vm.goToNext();
            }
          });
        }
      });
    },
    setCoupon() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const vm = this;
      this.$http.post(api, { data: { code: vm.couponCode } }).then((Response) => {
        if (Response.data.success) {
          vm.couponEnabled = true;
          vm.totalAfterCoupon = Response.data.data.final_total;
        }
      });
    },
    goToNext() {
      this.$emit('transferSchdule', 'second', false);
      this.$router.push(`payment/${this.orderId}`);
    },
  },
  created() {
    this.getCarts();
    this.$emit('transferSchdule', 'first', false);
  },
};
</script>
