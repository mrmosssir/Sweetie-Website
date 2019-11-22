<template>
    <div class="container" v-if="!returnLoading">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent px-0">
            <li class="breadcrumb-item text-secondary"><small>後台管理系統</small></li>
            <li class="breadcrumb-item active" aria-current="adminOrders">
              <a href="#">
                <small>訂單列表管理</small>
              </a>
            </li>
        </ol>
      </nav>
      <h2 class="text-brown">訂單列表管理</h2>
      <table class="table table-borderless mt-4 bg-white border border-brown border-bottom-0">
        <thead>
          <tr class="bg-brown text-white text-center">
            <th width="200px" scope="col">購買日期</th>
            <th scope="col">Email</th>
            <th scope="col">購買項目</th>
            <th width="150px" scope="col">應付金額</th>
            <th width="100px" scope="col">是否付款</th>
          </tr>
        </thead>
        <tbody class="text-secondary">
          <tr class="border-bottom border-brown" v-for="item in returnOrders" :key="item.id">
            <td class="text-center">{{ item.create_at }}</td>
            <td class="text-center">{{ item.user.email }}</td>
            <td class="text-center">
              <ul>
                <li v-for="product in item.products" :key="product.id">
                  {{ product.product.title }} 數量：{{ product.qty }} {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total }} $</td>
            <td class="text-center text-success" v-if="item.is_paid">已付款</td>
            <td class="text-center text-secondary" v-if="!item.is_paid">未付款</td>
          </tr>
        </tbody>
      </table>
      <nav class="d-flex justify-content-center mt-5">
        <ul class="pagination">
          <li class="page-item" v-for="num in returnPage"
              :key="num"
              @click.prevent="getOrders(num)"
              :class="{'active': returnCurrentPage == num}">
              <a class="page-link" href="#">{{ num }}</a>
          </li>
        </ul>
      </nav>
    </div>
</template>

<script>
export default {
  name: 'Orders',
  methods: {
    getOrders(page = 1) {
      this.$store.dispatch('adminGetOrders', page);
      this.$store.dispatch('changeSearchMode', 'order');
    },
    dateTransfer(order, dateCode) {
      const date = new Date(dateCode * 1000);
      const dateStr = `${date.getFullYear()}/${this.addZero(date.getMonth())}/${this.addZero(date.getDate())} 
      ${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}:${this.addZero(date.getSeconds())}`;
      this.$set(order, 'create_at', dateStr);
      return order;
    },
    addZero(num) {
      if (Number(num) < 10) {
        return `0${num}`;
      }
      return num;
    },
  },
  computed: {
    returnOrders() {
      const orders = [];
      this.$store.state.admin.orders.forEach((order) => {
        this.dateTransfer(order, order.create_at);
        orders.push(order);
      });
      return orders;
    },
    returnPage() {
      return this.$store.state.admin.orderSearchPage;
    },
    returnCurrentPage() {
      return this.$store.state.admin.orderCurrentPage;
    },
    returnLoading() {
      return this.$store.state.loadingStatus;
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
