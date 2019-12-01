<template>
    <div class="d-block w-50 width-mobile mx-auto">
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
                <tr class="text-secondary" v-for="order in returnOrders" :key="order.id">
                    <td class="px-3 py-2">{{ order.product.title }}</td>
                    <td class="text-center">{{ order.qty }} / {{ order.product.unit }}</td>
                    <td class="text-right px-3 text-brown">NT${{ order.final_total }}</td>
                </tr>
            </tbody>
        </table>
        <div class="text-secondary text-right my-3 px-3">
          <span>總計</span>
          <strong class="h3 text-brown font-weight-normal ml-2">
            NT${{ returnOrderTotalPrice }}
          </strong>
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
              <td>{{ returnOrderUserDetail.name }}</td>
            </tr>
            <tr>
              <td class="px-3 py-2">電話</td>
              <td>{{ returnOrderUserDetail.tel }}</td>
            </tr>
            <tr>
              <td class="px-3 py-2">電子郵件</td>
              <td>{{ returnOrderUserDetail.email }}</td>
            </tr>
            <tr>
              <td class="px-3 py-2">地址</td>
              <td>{{ returnOrderUserDetail.address }}</td>
            </tr>
            <tr>
              <td class="px-3 py-2">付款狀態</td>
              <td class="text-success" v-if="returnOrderPaid">付款完成</td>
              <td class="text-danger" v-if="!returnOrderPaid">尚未付款</td>
            </tr>
          </tbody>
        </table>
        <div class="text-right mt-4 ">
          <button class="btn btn-brown" @click.prevent="payment()">確認付款</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CartPayment',
  methods: {
    getOrders() {
      this.$store.dispatch('clientCart/clientGetOrders');
    },
    payment() {
      this.$store.dispatch('clientCart/clientOrderPayment');
    },
  },
  computed: {
    ...mapGetters('clientCart', ['returnOrders', 'returnOrderUserDetail', 'returnOrderTotalPrice', 'returnOrderPaid']),
  },
  created() {
    this.getOrders();
  },
};
</script>
