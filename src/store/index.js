import $ from 'jquery';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Login Variable
    user: {
      username: '',
      password: '',
    },
    // AdminProducts Variable
    admin: {
      // product list
      products: [],
      product: {},
      productIsNew: true,
      productTotalPage: 0,
      productCurrentPage: 1,
      // coupon list
      coupons: [],
      coupon: {},
      couponIsNew: true,
      couponTotalPage: 0,
      couponCurrentPage: 1,
      // order list
      orders: [],
      orderTotalPage: 0,
      orderCurrentPage: 1,
    },
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
    // Login
    checkUser(context, payload) {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      context.commit('USER', payload);
      axios.post(api, this.state.user).then((Response) => {
        if (Response.data.success) {
          router.push('/admin');
        } else {
          context.commit('USER', {
            username: '',
            password: '',
          });
          // alert('帳號或密碼錯誤');
        }
      });
    },
    // Admin Product
    adminGetProducts(context, payload) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${payload}`;
      axios.get(api).then((Response) => {
        if (Response.data.success) {
          context.commit('ADMIN_PRODUCTS', Response.data.products);
          context.commit('ADMIN_PRODUCT_TOTALPAGE', Response.data.pagination.total_pages);
          context.commit('ADMIN_PRODUCT_CURRENTPAGE', Response.data.pagination.current_page);
        }
      });
    },
    adminProductOpenModal(context, payload) {
      $('#createModal').modal('show');
      context.commit('ADMIN_PRODUCT_ISNEW', payload.isNew);
      if (this.state.admin.productIsNew) {
        context.commit('ADMIN_PRODUCT', {});
      } else {
        context.commit('ADMIN_PRODUCT', Object.assign({}, payload.item));
      }
    },
    adminSubmitProduct(context, payload) {
      context.commit('ADMIN_PRODUCT', payload);
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let mode = 'post';
      if (!this.state.admin.productIsNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.state.admin.product.id}`;
        mode = 'put';
      }
      axios[mode](api, { data: this.state.admin.product }).then((Response) => {
        if (Response.data.success) {
          context.dispatch('adminGetProducts', 1);
          $('#createModal').modal('hide');
        }
      });
    },
    adminDeleteProduct(context, payload) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${payload}`;
      axios.delete(api).then((Response) => {
        if (Response.data.success) {
          context.dispatch('adminGetProducts', 1);
          $('#createModal').modal('hide');
        }
      });
    },
    adminProductUploadFile(context, payload) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      const formData = new FormData();
      formData.append('file-to-upload', payload);
      axios.post(api, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      }).then((Response) => {
        if (Response.data.success) {
          context.commit('ADMIN_PRODUCT_SET_IMAGEURL', Response.data.imageUrl);
        }
      });
    },
    // Admin Coupon
    adminGetCoupons(context, payload) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${payload}`;
      axios.get(api).then((Response) => {
        context.commit('ADMIN_COUPONS', Response.data.coupons);
        context.commit('ADMIN_COUPON_TOTALPAGE', Response.data.pagination.total_pages);
        context.commit('ADMIN_COUPON_CURRENTPAGE', Response.data.pagination.current_page);
      });
    },
    adminSubmitCoupon(context, payload) {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let mode = 'post';
      if (!this.state.admin.couponIsNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${payload}`;
        mode = 'put';
      }
      const dueDate = this.state.admin.coupon.dueDate.split('T')[0];
      const timeStamp = new Date(`${dueDate.split('-')[0]}/${dueDate.split('-')[1]}/${dueDate.split('-')[2]}`);
      context.commit('ADMIN_SET_COUPON', timeStamp);
      axios[mode](api, { data: this.state.admin.coupon }).then(() => {
        this.dispatch('adminGetCoupons', 1);
        $('#couponModal').modal('hide');
      });
    },
    adminDeleteCoupon(context, payload) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${payload}`;
      axios.delete(api).then(() => {
        if (this.state.admin.CouponCurrentPage > this.state.admin.CouponTotalPage) {
          this.dispatch('adminGetCoupons', this.state.admin.couponCurrentPage - 1);
          context.commit('ADMIN_COUPON_CURRENTPAGE', this.state.admin.couponCurrentPage - 1);
        } else {
          this.dispatch('adminGetCoupons', this.state.admin.couponCurrentPage);
        }
        $('#couponModal').modal('hide');
      });
    },
    adminCouponOpenModal(context, payload) {
      $('#couponModal').modal('show');
      context.commit('ADMIN_COUPON_ISNEW', payload.isNew);
      if (this.state.admin.couponIsNew) {
        context.commit('ADMIN_COUPON', {});
      } else {
        context.commit('ADMIN_COUPON', Object.assign({}, payload.item));
        context.commit('ADMIN_COUPON_DUEDATE', payload.item.dueDate);
      }
    },
    // Admin Order
    adminGetOrders(context, payload) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${payload}`;
      axios.get(api).then((Response) => {
        context.commit('ADMIN_ORDERS', Response.data.orders);
        context.commit('ADMIN_ORDER_TOTALPAGE', Response.data.pagination.total_pages);
        context.commit('ADMIN_ORDER_CURRENTPAGE', Response.data.pagination.current_page);
      });
    },
  },
  mutations: {
    // Login
    USER(state, payload) {
      state.user.username = payload.username;
      state.user.password = payload.password;
    },
    // Admin Product
    ADMIN_PRODUCTS(state, payload) {
      state.admin.products = payload;
    },
    ADMIN_PRODUCT(state, payload) {
      state.admin.product = payload;
    },
    ADMIN_PRODUCT_TOTALPAGE(state, payload) {
      state.admin.productTotalPage = payload;
    },
    ADMIN_PRODUCT_CURRENTPAGE(state, payload) {
      state.admin.productCurrentPage = payload;
    },
    ADMIN_PRODUCT_ISNEW(state, payload) {
      state.admin.productIsNew = payload;
    },
    ADMIN_PRODUCT_SET_IMAGEURL(state, payload) {
      Vue.set(state.admin.product, 'imageUrl', payload);
    },
    // Admin Coupon
    ADMIN_COUPONS(state, payload) {
      state.admin.coupons = payload;
    },
    ADMIN_COUPON(state, payload) {
      state.admin.coupon = payload;
    },
    ADMIN_SET_COUPON(state, payload) {
      Vue.set(state.admin.coupon, 'dueDate', payload.getTime());
    },
    ADMIN_COUPON_TOTALPAGE(state, payload) {
      state.admin.couponTotalPage = payload;
    },
    ADMIN_COUPON_CURRENTPAGE(state, payload) {
      state.admin.couponCurrentPage = payload;
    },
    ADMIN_COUPON_ISNEW(state, payload) {
      state.admin.couponIsNew = payload;
    },
    ADMIN_COUPON_DUEDATE(state, payload) {
      const date = new Date(payload);
      const dateArray = [
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
      ];
      for (let count = 0; count < 4; count += 1) {
        if (Number(dateArray[count] < 10)) {
          dateArray[count] = `0${dateArray[count]}`;
        }
      }
      state.admin.coupon.dueDate = `${date.getFullYear()}-${dateArray[0]}-${dateArray[1]}T${dateArray[2]}:${dateArray[3]}`;
    },
    // Admin Order
    ADMIN_ORDERS(state, payload) {
      state.admin.orders = payload;
    },
    ADMIN_ORDER_TOTALPAGE(state, payload) {
      state.admin.orderTotalPage = payload;
    },
    ADMIN_ORDER_CURRENTPAGE(state, payload) {
      state.admin.orderCurrentPage = payload;
    },
  },
});
