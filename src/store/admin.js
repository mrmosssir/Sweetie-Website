import axios from 'axios';
import router from '../router';

export default {
  state: {
    // Login Variable
    user: {
      username: '',
      password: '',
    },
    // search
    searchMode: 'product',
    searchContent: '',
  },
  actions: {
    // Admin
    checkLogin() {
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
      axios.post(api).then((Response) => {
        if (!Response.data.success) {
          router.push('sign');
        }
      });
    },
    changeSearchMode(context, payload) {
      context.commit('ADMIN_CHANGE_SEARCHMODE', payload);
    },
    search(context) {
      const bufferArray = [];
      let api = '';
      context.commit('LOADING', true, { root: true });
      switch (context.state.searchMode) {
        case 'product':
          if (context.state.searchContent === '') {
            context.commit('LOADING', false, { root: true });
            window.location.reload();
            break;
          }
          for (let count = 1; count <= this.state.adminProduct.productTotalPage; count += 1) {
            api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${count}`;
            axios.get(api).then((Response) => {
              if (Response.data.success) {
                Response.data.products.forEach((item) => {
                  if (item.title.indexOf(context.state.searchContent) !== -1) {
                    bufferArray.push(item);
                  }
                });
              }
              context.commit('LOADING', false, { root: true });
            });
          }
          context.commit('adminProduct/ADMIN_PRODUCTS', bufferArray);
          context.commit('adminProduct/ADMIN_PRODUCT_PAGE', 1);
          break;
        case 'coupon':
          if (context.state.searchContent === '') {
            context.commit('LOADING', false, { root: true });
            window.location.reload();
            break;
          }
          for (let count = 1; count <= this.state.adminCoupon.couponTotalPage; count += 1) {
            api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${count}`;
            axios.get(api).then((Response) => {
              if (Response.data.success) {
                Response.data.coupons.forEach((item) => {
                  if (item.title.indexOf(context.state.searchContent) !== -1) {
                    bufferArray.push(item);
                  }
                });
              }
              context.commit('LOADING', false, { root: true });
            });
          }
          context.commit('adminCoupon/ADMIN_COUPONS', bufferArray);
          context.commit('adminCoupon/ADMIN_COUPON_PAGE', 1);
          break;
        case 'order':
          if (context.state.searchContent === '') {
            context.commit('LOADING', false, { root: true });
            window.location.reload();
            break;
          }
          for (let count = 1; count <= this.state.adminOrder.orderTotalPage; count += 1) {
            api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${count}`;
            axios.get(api).then((Response) => {
              if (Response.data.success) {
                Response.data.orders.forEach((item) => {
                  if (item.user.email.indexOf(context.state.searchContent) !== -1) {
                    bufferArray.push(item);
                  }
                });
              }
              context.commit('LOADING', false, { root: true });
            });
          }
          context.commit('adminOrder/ADMIN_ORDERS', bufferArray);
          context.commit('adminOrder/ADMIN_ORDER_PAGE', 1);
          break;
        default:
          break;
      }
    },
    // Login
    checkUser(context, payload) {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      context.commit('USERNAME', payload.username);
      context.commit('PASSWORD', payload.password);
      axios.post(api, context.state.user).then((Response) => {
        if (Response.data.success) {
          router.push('/admin');
        } else {
          context.commit('USERNAME', '');
          context.commit('PASSWORD', '');
          context.commit('ERROR', {
            error: true,
            message: Response.data.error.message,
          }, { root: true });
          setInterval(() => {
            context.commit('ERROR', {
              error: false,
              message: '',
            }, { root: true });
          }, 5000);
        }
      });
    },
  },
  mutations: {
    // Loading
    LOADING(state, payload) {
      state.loadingStatus = payload;
    },
    // Login
    USERNAME(state, payload) {
      state.user.username = payload;
    },
    PASSWORD(state, payload) {
      state.user.password = payload;
    },
    // Admin
    ADMIN_CHANGE_SEARCHMODE(state, payload) {
      state.searchMode = payload;
    },
    ADMIN_SEARCHCONTENT(state, payload) {
      state.searchContent = payload;
    },
  },
};
