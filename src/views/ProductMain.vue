<template>
    <div class="container">
        <div class="row">
            <div class="col-4">
              <ul class="filter-bar pt-3">
                <li class="filter border border-brown mb-3 py-2 pl-4 rounded-pill"
                    :class="{'filter-active': returnCategory === 'all'}"
                    @click.prevent="changeCategory('all')">
                  <i class="fas fa-cookie"></i>
                  全部餐點
                </li>
                <li class="filter border border-brown mb-3 py-2 pl-4 rounded-pill"
                    :class="{'filter-active': returnCategory === 'single'}"
                    @click.prevent="changeCategory('single')">
                  <i class="fas fa-cookie"></i>
                  甜點單點
                </li>
                <li class="filter border border-brown mb-3 py-2 pl-4 rounded-pill"
                    :class="{'filter-active': returnCategory === 'drink'}"
                    @click.prevent="changeCategory('drink')">
                  <i class="fas fa-cookie"></i>
                  甜蜜飲品
                </li>
                <li class="filter border border-brown mb-3 py-2 pl-4 rounded-pill"
                    :class="{'filter-active': returnCategory === 'fruit'}"
                    @click.prevent="changeCategory('fruit')">
                  <i class="fas fa-cookie"></i>
                  水果沙拉
                </li>
                <li class="filter border border-brown mb-3 py-2 pl-4 rounded-pill"
                    :class="{'filter-active': returnCategory === 'package'}"
                    @click.prevent="changeCategory('package')">
                  <i class="fas fa-cookie"></i>
                  基本套餐
                </li>
              </ul>
            </div>
            <div class="col-8">
                <h2 class="h3 font-weight-normal mb-5">
                  {{ this.$store.state.client.productTitle[returnCategory] }}
                </h2>
                <div class="border rounded p-3
                            d-flex justify-content-between align-items-center mb-3"
                     v-for="item in returnProducts" :key="item.id">
                  <div class="d-flex align-items-center">
                    <div class="main-image mr-3"
                         :style="'background-image: url(' + item.imageUrl + ');'"
                         @click.prevent="showProductDetail(item.id)"></div>
                    <div>
                      <span class="badge badge-brown">{{ item.category }}</span>
                      <h2 class="h4 text-secondary font-weight-normal">{{ item.title }}</h2>
                      <strong class="h3 text-danger">{{ item.price }} $</strong>
                    </div>
                  </div>
                  <button class="btn btn-brown btn-cart-main" @click.prevent="addCart(item.id)">
                    <i class="fas fa-shopping-basket"></i>
                  </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    getProducts(page = 1) {
      this.$store.dispatch('clientGetProducts', page);
    },
    showProductDetail(id) {
      this.$store.dispatch('clientShowProductDetail', id);
    },
    getCartsAmount() {
      this.$store.dispatch('clientGetCartsAmount');
    },
    addCart(id) {
      this.$store.dispatch('clientAddCart', {
        id,
        amount: 1,
      });
    },
    changeCategory(category) {
      this.$store.dispatch('clientChangeCategory', category);
    },
  },
  computed: {
    returnProducts() {
      return this.$store.state.client.products;
    },
    retrunCartsAmount() {
      return this.$store.state.client.cartsAmount;
    },
    returnCategory() {
      return this.$store.state.client.productFilterString;
    },
  },
  created() {
    this.getProducts();
    this.getCartsAmount();
  },
};
</script>
