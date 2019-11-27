<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
              <div class="p-sticky">
                <ul class="filter-bar p-0">
                  <li class="filter border border-brown mb-3 py-2 pl-4 rounded-pill"
                      :class="{
                        'filter-active': returnCategory === 'all' || returnCategory === 'home'
                        }"
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
                <hr>
                <CartList class="open-pc" />
              </div>
            </div>
            <div class="col-md-8">
                <h2 class="h3 font-weight-normal mb-4">
                  {{ this.$store.state.client.productTitle[returnCategory] }}
                </h2>
                <div class="row">
                  <div class="col-md-4 col-sm-6" v-for="item in returnProducts" :key="item.id">
                    <div class="image-product mr-3"
                        :style="'background-image: url(' + item.imageUrl + ');'"
                        @click.prevent="showProductDetail(item.id)"></div>
                    <h2 class="h6 text-dark font-weight-bold mt-2">{{ item.title }}</h2>
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <strong class="text-danger">NT$ {{ item.price }}</strong>
                      <button class="btn btn-link p-0" @click.prevent="addCart(item.id)">
                        <i class="fas fa-shopping-basket text-secondary"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <nav class="d-flex justify-content-center mt-5">
                  <ul class="pagination">
                      <li class="page-item" v-for="num in returnTotalPage"
                          :key="num"
                          @click.prevent="changeCurrentPage(num)"
                          :class="{'active': returnCurrentPage == num}">
                          <a class="page-link" href="#">
                            {{ num }}
                          </a>
                      </li>
                  </ul>
              </nav>
            </div>
        </div>
    </div>
</template>

<script>
import CartList from '../components/CartList.vue';

export default {
  components: {
    CartList,
  },
  methods: {
    getProducts() {
      this.$store.dispatch('clientGetProducts');
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
    changeCurrentPage(page) {
      this.$store.commit('CLIENT_PRODUCT_CURRENTPAGE', page);
    },
  },
  computed: {
    returnProducts() {
      const productBuffer = [];
      if (this.$store.state.client.products.length > 0) {
        for (let count = 10 * (this.returnCurrentPage - 1);
          count <= 10 * (this.returnCurrentPage - 1) + 9;
          count += 1) {
          if (this.$store.state.client.products[count] !== undefined) {
            productBuffer.push(this.$store.state.client.products[count]);
          }
        }
        return productBuffer;
      }
      return productBuffer;
    },
    retrunCartsAmount() {
      return this.$store.state.client.cartsAmount;
    },
    returnCategory() {
      return this.$store.state.client.productFilterString;
    },
    returnTotalPage() {
      return this.$store.state.client.productTotalPage;
    },
    returnCurrentPage() {
      return this.$store.state.client.productCurrentPage;
    },
  },
  created() {
    this.getProducts();
    this.getCartsAmount();
  },
};
</script>
