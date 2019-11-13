<template>
    <div class="container">
        <div class="row">
            <div class="col-4">
              <ul class="filter-bar pt-3">
                <li class="filter border border-brown mb-3 py-2 pl-4 rounded-pill"
                    :class="{'filter-active': filter == 'all'}"
                    @click.prevent="filter = 'all'">
                  <i class="fas fa-cookie"></i>
                  全部餐點
                </li>
                <li class="filter border border-brown mb-3 py-2 pl-4 rounded-pill"
                    :class="{'filter-active': filter == 'single'}"
                    @click.prevent="filter = 'single'">
                  <i class="fas fa-cookie"></i>
                  甜點單點
                </li>
                <li class="filter border border-brown mb-3 py-2 pl-4 rounded-pill"
                    :class="{'filter-active': filter == 'drink'}"
                    @click.prevent="filter = 'drink'">
                  <i class="fas fa-cookie"></i>
                  甜蜜飲品
                </li>
                <li class="filter border border-brown mb-3 py-2 pl-4 rounded-pill"
                    :class="{'filter-active': filter == 'fruit'}"
                    @click.prevent="filter = 'fruit'">
                  <i class="fas fa-cookie"></i>
                  水果沙拉
                </li>
                <li class="filter border border-brown mb-3 py-2 pl-4 rounded-pill"
                    :class="{'filter-active': filter == 'package'}"
                    @click.prevent="filter = 'package'">
                  <i class="fas fa-cookie"></i>
                  基本套餐
                </li>
              </ul>
            </div>
            <div class="col-8">
                <h2 class="h3 font-weight-normal mb-5">{{ fontTitle[filter] }}</h2>
                <div class="border rounded p-3
                            d-flex justify-content-between align-items-center mb-3"
                     v-for="item in productsFilter" :key="item.id">
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
      products: [],
      productDisplay: [],
      cartLen: 0,
      totalPrice: 0,
      filter: 'all',
      fontTitle: {
        all: '全部餐點',
        single: '單點餐點',
        drink: '甜蜜飲品',
        fruit: '水果沙拉',
        package: '基本套餐',
      },
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      this.$http.get(api).then((Response) => {
        if (Response.data.success) {
          vm.products = Response.data.products;
        }
      });
    },
    showProductDetail(id) {
      this.$router.push(`/shop/${id}`);
    },
    getCartLen() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then((Response) => {
        if (Response.data.success) {
          vm.cartLen = Response.data.data.carts.length;
          this.$emit('cartlen', vm.cartLen);
        }
      });
    },
    addCart(id) {
      const cartInfo = {
        product_id: id,
        qty: 1,
      };
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.post(api, { data: cartInfo }).then((Response) => {
        if (Response.data.success) {
          vm.getCartLen();
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
  },
  computed: {
    productsFilter() {
      const vm = this;
      vm.productDisplay = [];
      switch (vm.filter) {
        case 'single':
          vm.products.forEach((product) => {
            if (product.category === '甜點') {
              vm.productDisplay.push(product);
            }
          });
          break;
        case 'drink':
          vm.products.forEach((product) => {
            if (product.category === '飲品') {
              vm.productDisplay.push(product);
            }
          });
          break;
        case 'fruit':
          vm.products.forEach((product) => {
            if (product.category === '水果沙拉') {
              vm.productDisplay.push(product);
            }
          });
          break;
        case 'package':
          vm.products.forEach((product) => {
            if (product.category === '拼盤') {
              vm.productDisplay.push(product);
            }
          });
          break;
        default:
          vm.productDisplay = vm.products;
      }
      return vm.productDisplay;
    },
  },
  created() {
    this.getProducts();
    this.getCartLen();
  },
};
</script>
