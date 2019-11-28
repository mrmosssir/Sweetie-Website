import axios from 'axios';
import router from '../router';

export default {
  namespaced: true,
  state: {
    products: [],
    productFilterArray: [],
    productFilterString: 'all',
    productTotalPage: 0,
    productCurrentPage: 1,
    productListAmount: 0,
    productTitle: {
      all: '全部餐點',
      home: '全部餐點',
      single: '單點餐點',
      drink: '甜蜜飲品',
      fruit: '水果沙拉',
      package: '基本套餐',
    },
    // product detail
    product: {},
    productId: '',
    productAmount: 1,
  },
  actions: {
    // Client Product Main
    clientGetProducts(context, payload = false) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(api).then((Response) => {
        if (Response.data.success) {
          context.commit('CLIENT_PRODUCTS', {
            products: Response.data.products,
            status: payload,
          });
          context.commit('CLIENT_PRODUCT_CURRENTPAGE', 1);
          context.commit('LOADING', false, { root: true });
        }
      });
    },
    clientShowProductDetail(context, payload) {
      router.push(`/shop/${payload}`);
      window.location.reload();
    },
    clientChangeCategory(context, payload) {
      context.commit('CLIENT_CATEGORY', payload);
      context.dispatch('clientGetProducts', 1);
    },
    // Client Product Detail
    clientGetProductDetail(context, payload) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${payload}`;
      axios.get(api).then((Response) => {
        if (Response.data.success) {
          context.commit('CLIENT_PRODUCT', Response.data.product);
        } else {
          context.commit('ERROR', {
            error: true,
            message: Response.data.message,
          });
          setInterval(() => {
            context.commit('ERROR', {
              error: false,
              message: '',
            });
          }, 5000);
        }
        context.commit('LOADING', false, { root: true });
      });
    },
    clientProductPageReturn() {
      router.push('/shop');
    },
  },
  mutations: {
    CLIENT_PRODUCTS(state, payload) {
      state.products = [];
      state.productFilterArray = [];
      state.productListAmount = 0;
      if (payload.status === true) {
        state.productFilterString = 'home';
      }
      switch (state.productFilterString) {
        case 'single':
          payload.products.forEach((product) => {
            if (product.category === '甜點') {
              state.products.push(product);
              state.productListAmount += 1;
            }
          });
          break;
        case 'drink':
          payload.products.forEach((product) => {
            if (product.category === '飲品') {
              state.products.push(product);
              state.productListAmount += 1;
            }
          });
          break;
        case 'fruit':
          payload.products.forEach((product) => {
            if (product.category === '水果沙拉') {
              state.products.push(product);
              state.productListAmount += 1;
            }
          });
          break;
        case 'package':
          payload.products.forEach((product) => {
            if (product.category === '拼盤') {
              state.products.push(product);
              state.productListAmount += 1;
            }
          });
          break;
        case 'home':
          state.products = payload.products;
          state.productListAmount = payload.products.length;
          break;
        default:
          state.products = payload.products;
          state.productListAmount = payload.products.length;
          break;
      }
      state.productTotalPage = Math.floor(state.productListAmount / 10);
      if (state.productListAmount % 10 !== 0) {
        state.productTotalPage += 1;
      }
    },
    CLIENT_CATEGORY(state, payload) {
      state.productFilterString = payload;
    },
    CLIENT_PRODUCT_TOTALPAGE(state, payload) {
      state.productTotalPage = payload;
    },
    CLIENT_PRODUCT_CURRENTPAGE(state, payload) {
      state.productCurrentPage = payload;
    },
    // Client Product Detail
    CLIENT_PRODUCT(state, payload) {
      state.product = payload;
    },
    CLIENT_PRODUCTAMOUNT(state, payload) {
      state.productAmount = payload;
    },
  },
  getters: {
    returnProducts(state) {
      return state.products;
    },
    returnProduct(state) {
      return state.product;
    },
    retrunCartsAmount(state) {
      return state.cartsAmount;
    },
    returnCategory(state) {
      return state.productFilterString;
    },
    returnTotalPage(state) {
      return state.productTotalPage;
    },
    returnCurrentPage(state) {
      return state.productCurrentPage;
    },
  },
};
