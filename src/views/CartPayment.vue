<template>
    <div class="d-block w-50 mx-auto">
        <h2 class="h5 text-secondary font-weight-normal my-3">購買列表</h2>
        <table class="w-100 table-striped">
            <thead class="bg-brown text-white">
                <tr>
                    <th class="px-3 py-2">商品名稱</th>
                    <th width="100px" class="text-center">數量</th>
                    <th width="150px" class="text-right px-3">價格</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-secondary" v-for="order in orderProducts" :key="order.id">
                    <td class="px-3 py-2">{{ order.product.title }}</td>
                    <td class="text-center">{{ order.qty }} / {{ order.product.unit }}</td>
                    <td class="text-right px-3 text-brown">NT${{ order.final_total }}</td>
                </tr>
            </tbody>
        </table>
        <div class="text-secondary text-right my-3 px-3">
          <span>總計</span>
          <strong class="h3 text-brown font-weight-normal ml-2">NT${{ totalPrice }}</strong>
        </div>
        <hr>
        <h2 class="h5 text-secondary font-weight-normal my-3">個人資訊</h2>
        <table class="w-100 table-striped">
          <thead class="bg-brown text-white">
            <tr>
              <th colspan="2" class="py-2 px-3">訂單資訊</th>
            </tr>
          </thead>
          <tbody class="text-secondary">
            <tr>
              <td class="px-3 py-2">姓名</td>
              <td>{{ orderUser.name }}</td>
            </tr>
            <tr>
              <td class="px-3 py-2">電話</td>
              <td>{{ orderUser.tel }}</td>
            </tr>
            <tr>
              <td class="px-3 py-2">電子郵件</td>
              <td>{{ orderUser.email }}</td>
            </tr>
            <tr>
              <td class="px-3 py-2">地址</td>
              <td>{{ orderUser.address }}</td>
            </tr>
            <tr>
              <td class="px-3 py-2">付款狀態</td>
              <td class="text-success" v-if="is_paid">付款完成</td>
              <td class="text-danger" v-if="!is_paid">尚未付款</td>
            </tr>
          </tbody>
        </table>
        <div class="text-right mt-4 ">
          <button class="btn btn-brown" @click.prevent="Payment()">確認付款</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CartPayment',
  data() {
    return {
      orderId: '',
      orderProducts: [],
      orderUser: {},
      totalPrice: 0,
      is_paid: false,
    };
  },
  methods: {
    getOrders() {
      this.orderId = this.$route.params.orderId;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${this.orderId}`;
      const vm = this;
      this.$http.get(api).then((Response) => {
        if (Response.data.success) {
          vm.orderProducts = Response.data.order.products;
          vm.orderUser = Response.data.order.user;
          vm.is_paid = Response.data.order.is_paid;
          vm.totalPrice = Response.data.order.total;
          if (this.is_paid) {
            this.$emit('transferSchdule', 'second', true);
          } else {
            this.$emit('transferSchdule', 'second', false);
          }
        }
      });
    },
    Payment() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${this.orderId}`;
      const vm = this;
      this.$http.post(api).then((Response) => {
        if (Response.data.success) {
          vm.is_paid = true;
          this.$emit('transferSchdule', 'second', true);
        }
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
