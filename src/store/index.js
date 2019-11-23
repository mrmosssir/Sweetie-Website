import $ from 'jquery';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Loading
    loadingStatus: false,
    updateStatus: false,
    // Error
    error: false,
    errorMessage: '',
    // Login Variable
    user: {
      username: '',
      password: '',
    },
    // AdminProducts Variable
    admin: {
      // search
      searchMode: 'product',
      searchContent: '',
      // product list
      products: [],
      product: {},
      productIsNew: true,
      productTotalPage: 0,
      productSearchPage: 0,
      productCurrentPage: 1,
      // coupon list
      coupons: [],
      coupon: {},
      couponIsNew: true,
      couponTotalPage: 0,
      couponSearchPage: 0,
      couponCurrentPage: 1,
      // order list
      orders: [],
      orderTotalPage: 0,
      orderSearchPage: 0,
      orderCurrentPage: 1,
    },
    // ClientProducts Variable
    client: {
      cartsAmount: 0,
      // product main
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
      // schedule
      schedulePage: 'first',
      schedulePaid: false,
      // cart form
      carts: [],
      cartTotalPrice: 0,
      cartTotalAfterCoupon: 0,
      cartOrderId: '',
      couponCode: '',
      couponEnabled: false,
      // cart payment
      orders: [],
      orderUserDetail: {},
      orderTotalPrice: 0,
      orderPaid: false,
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
    changeSearchMode(context, payload) {
      context.commit('ADMIN_CHANGE_SEARCHMODE', payload);
    },
    search(context) {
      const bufferArray = [];
      let api = '';
      context.commit('LOADING', true);
      switch (this.state.admin.searchMode) {
        case 'product':
          if (this.state.admin.searchContent === '') {
            context.commit('LOADING', false);
            window.location.reload();
            break;
          }
          for (let count = 1; count <= this.state.admin.productTotalPage; count += 1) {
            api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${count}`;
            axios.get(api).then((Response) => {
              if (Response.data.success) {
                Response.data.products.forEach((item) => {
                  if (item.title.indexOf(this.state.admin.searchContent) !== -1) {
                    bufferArray.push(item);
                  }
                });
              }
              context.commit('LOADING', false);
            });
          }
          context.commit('ADMIN_PRODUCTS', bufferArray);
          this.commit('ADMIN_PRODUCT_PAGE', 1);
          break;
        case 'coupon':
          if (this.state.admin.searchContent === '') {
            context.commit('LOADING', false);
            window.location.reload();
            break;
          }
          for (let count = 1; count <= this.state.admin.couponTotalPage; count += 1) {
            api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${count}`;
            axios.get(api).then((Response) => {
              if (Response.data.success) {
                Response.data.coupons.forEach((item) => {
                  if (item.title.indexOf(this.state.admin.searchContent) !== -1) {
                    bufferArray.push(item);
                  }
                });
              }
              context.commit('LOADING', false);
            });
          }
          context.commit('ADMIN_COUPONS', bufferArray);
          this.commit('ADMIN_COUPONS_PAGE', 1);
          break;
        case 'order':
          if (this.state.admin.searchContent === '') {
            context.commit('LOADING', false);
            window.location.reload();
            break;
          }
          for (let count = 1; count <= this.state.admin.orderTotalPage; count += 1) {
            api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${count}`;
            axios.get(api).then((Response) => {
              if (Response.data.success) {
                Response.data.orders.forEach((item) => {
                  if (item.user.email.indexOf(this.state.admin.searchContent) !== -1) {
                    bufferArray.push(item);
                  }
                });
              }
              context.commit('LOADING', false);
            });
          }
          context.commit('ADMIN_ORDERS', bufferArray);
          this.commit('ADMIN_ORDER_PAGE', 1);
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
      axios.post(api, this.state.user).then((Response) => {
        if (Response.data.success) {
          router.push('/admin');
        } else {
          context.commit('USERNAME', '');
          context.commit('PASSWORD', '');
          context.commit('ERROR', {
            error: true,
            message: Response.data.error.message,
          });
          setInterval(() => {
            context.commit('ERROR', {
              error: false,
              message: '',
            });
          }, 5000);
        }
      });
    },
    // Admin Product
    adminGetProducts(context, payload) {
      context.commit('LOADING', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${payload}`;
      axios.get(api).then((Response) => {
        if (Response.data.success) {
          context.commit('ADMIN_PRODUCTS', Response.data.products);
          context.commit('ADMIN_PRODUCT_TOTALPAGE', Response.data.pagination.total_pages);
          context.commit('ADMIN_PRODUCT_PAGE', Response.data.pagination.total_pages);
          context.commit('ADMIN_PRODUCT_CURRENTPAGE', Response.data.pagination.current_page);
        }
        context.commit('LOADING', false);
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
      context.commit('UPDATESTATUS', true);
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
          context.commit('UPDATESTATUS', false);
        }
      });
    },
    // Admin Coupon
    adminGetCoupons(context, payload) {
      context.commit('LOADING', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${payload}`;
      axios.get(api).then((Response) => {
        context.commit('ADMIN_COUPONS', Response.data.coupons);
        context.commit('ADMIN_COUPON_TOTALPAGE', Response.data.pagination.total_pages);
        context.commit('ADMIN_COUPON_PAGE', Response.data.pagination.total_pages);
        context.commit('ADMIN_COUPON_CURRENTPAGE', Response.data.pagination.current_page);
        context.commit('LOADING', false);
      });
    },
    adminSubmitCoupon(context, payload) {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let mode = 'post';
      if (!this.state.admin.couponIsNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${payload}`;
        mode = 'put';
      }
      // const dueDate = this.state.admin.coupon.dueDate.split('T')[0];
      // `${dueDate.split('-')[0]}/${dueDate.split('-')[1]}/${dueDate.split('-')[2]}`
      const timeStamp = new Date(this.state.admin.coupon.dueDate);
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
      context.commit('LOADING', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${payload}`;
      axios.get(api).then((Response) => {
        context.commit('ADMIN_ORDERS', Response.data.orders);
        context.commit('ADMIN_ORDER_TOTALPAGE', Response.data.pagination.total_pages);
        context.commit('ADMIN_ORDER_PAGE', Response.data.pagination.total_pages);
        context.commit('ADMIN_ORDER_CURRENTPAGE', Response.data.pagination.current_page);
        context.commit('LOADING', false);
      });
    },
    // Client Product Main
    clientGetProducts(context, payload = false) {
      context.commit('LOADING', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(api).then((Response) => {
        if (Response.data.success) {
          context.commit('CLIENT_PRODUCTS', {
            products: Response.data.products,
            status: payload,
          });
          context.commit('CLIENT_PRODUCT_CURRENTPAGE', 1);
          this.commit('LOADING', false);
        }
      });
    },
    clientShowProductDetail(context, payload) {
      router.push(`/shop/${payload}`);
      window.location.reload();
    },
    clientGetCartsAmount(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(api).then((Response) => {
        if (Response.data.success) {
          context.commit('CLIENT_GET_CARTSAMOUNT', Response.data.data.carts.length);
        }
      });
    },
    clientAddCart(context, payload) {
      context.commit('LOADING', true);
      const cartPackage = {
        product_id: payload.id,
        qty: payload.amount,
      };
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.post(api, { data: cartPackage }).then((Response) => {
        if (Response.data.success) {
          this.dispatch('clientGetCartsAmount');
          this.dispatch('clientGetCarts');
          context.commit('ERROR', {
            error: true,
            message: Response.data.message,
          });
          setInterval(() => {
            context.commit('ERROR', {
              error: false,
              message: '',
            });
          }, 3000);
        }
        context.commit('LOADING', false);
      });
    },
    clientChangeCategory(context, payload) {
      context.commit('CLIENT_CATEGORY', payload);
      this.dispatch('clientGetProducts', 1);
    },
    // Client Product Detail
    clientGetProductDetail(context, payload) {
      context.commit('LOADING', true);
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
        context.commit('LOADING', false);
      });
    },
    clientProductPageReturn() {
      router.push('/shop');
    },
    // Client Cart Form
    clientGetCarts(context) {
      context.commit('LOADING', true);
      context.commit('CLIENT_SCHEDULE_STATUE', {
        page: 'first',
        paid: false,
      });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(api).then((Response) => {
        context.commit('CLIENT_CARTS', Response.data.data.carts);
        context.commit('CLIENT_CART_TOTALPRICE', Response.data.data.total);
        context.commit('CLIENT_CART_TOTAL_AFTER_COUPON', Response.data.data.final_total);
        context.commit('LOADING', false);
      });
    },
    clientDeleteCart(context, payload) {
      context.commit('LOADING', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${payload}`;
      axios.delete(api).then((Response) => {
        if (Response.data.success) {
          this.dispatch('clientGetCarts');
        }
        context.commit('LOADING', false);
      });
    },
    clientRemoveCartsItem(context) {
      context.commit('LOADING', true);
      this.state.client.carts.forEach((item) => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
        axios.delete(api).then((Response) => {
          if (Response.data.success) {
            this.dispatch('clientGetCarts');
          }
        });
      });
      context.commit('LOADING', false);
    },
    clientCreateOrder(context, payload) {
      context.commit('LOADING', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      axios.post(api, { data: payload }).then((Response) => {
        if (Response.data.success) {
          context.commit('CLIENT_CART_ORDERID', Response.data.orderId);
          this.dispatch('clientCartPageForward', {
            page: 'second',
            paid: false,
          });
          context.commit('LOADING', false);
          router.push(`payment/${this.state.client.cartOrderId}`);
        }
      });
    },
    clientSetCoupon(context) {
      context.commit('LOADING', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      axios.post(api, { data: { code: this.state.client.couponCode } }).then((Response) => {
        if (Response.data.success) {
          context.commit('CLIENT_COUPON_ENABLED', true);
          context.commit('CLIENT_CART_TOTAL_AFTER_COUPON', Response.data.data.final_total);
        }
        context.commit('LOADING', false);
      });
    },
    clientCartPageForward(context, payload) {
      context.commit('CLIENT_SCHEDULE_STATUE', {
        page: payload.page,
        paid: payload.paid,
      });
    },
    // Client Cart Payment
    clientGetOrders(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${this.state.client.cartOrderId}`;
      axios.get(api).then((Response) => {
        if (Response.data.success) {
          context.commit('CLIENT_ORDERS', Response.data.order.products);
          context.commit('CLIENT_ORDER_USERDETAIL', Response.data.order.user);
          context.commit('CLIENT_ORDER_TOTALPRICE', Response.data.order.total);
          context.commit('CLIENT_ORDER_PAID', Response.data.order.is_paid);
          if (this.state.client.orderPaid) {
            this.dispatch('clientCartPageForward', {
              page: 'second',
              paid: true,
            });
          } else {
            this.dispatch('clientCartPageForward', {
              page: 'second',
              paid: false,
            });
          }
        }
      });
    },
    clientOrderPayment(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${this.state.client.cartOrderId}`;
      axios.post(api).then((Response) => {
        if (Response.data.success) {
          context.commit('CLIENT_ORDER_PAID', true);
          this.dispatch('clientCartPageForward', {
            page: 'second',
            paid: true,
          });
        }
      });
    },
  },
  mutations: {
    // Loading
    LOADING(state, payload) {
      state.loadingStatus = payload;
    },
    UPDATESTATUS(state, payload) {
      state.updateStatus = payload;
    },
    // Error
    ERROR(state, payload) {
      state.error = payload.error;
      state.errorMessage = payload.message;
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
      state.admin.searchMode = payload;
    },
    ADMIN_SEARCHCONTENT(state, payload) {
      state.admin.searchContent = payload;
    },
    ADMIN_PRODUCT_PAGE(state, payload) {
      state.admin.productSearchPage = payload;
    },
    ADMIN_COUPON_PAGE(state, payload) {
      state.admin.couponSearchPage = payload;
    },
    ADMIN_ORDER_PAGE(state, payload) {
      state.admin.orderSearchPage = payload;
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
    // Client Product Main
    CLIENT_GET_CARTSAMOUNT(state, payload) {
      state.client.cartsAmount = payload;
    },
    CLIENT_PRODUCTS(state, payload) {
      state.client.products = [];
      state.client.productFilterArray = [];
      state.client.productListAmount = 0;
      if (payload.status === true) {
        state.client.productFilterString = 'home';
      }
      switch (state.client.productFilterString) {
        case 'single':
          payload.products.forEach((product) => {
            if (product.category === '甜點') {
              state.client.products.push(product);
              state.client.productListAmount += 1;
            }
          });
          break;
        case 'drink':
          payload.products.forEach((product) => {
            if (product.category === '飲品') {
              state.client.products.push(product);
              state.client.productListAmount += 1;
            }
          });
          break;
        case 'fruit':
          payload.products.forEach((product) => {
            if (product.category === '水果沙拉') {
              state.client.products.push(product);
              state.client.productListAmount += 1;
            }
          });
          break;
        case 'package':
          payload.products.forEach((product) => {
            if (product.category === '拼盤') {
              state.client.products.push(product);
              state.client.productListAmount += 1;
            }
          });
          break;
        case 'home':
          state.client.products = payload.products;
          break;
        default:
          state.client.products = payload.products;
          state.client.productListAmount = payload.products.length;
      }
      state.client.productTotalPage = Math.floor(state.client.productListAmount / 10);
      if (state.client.productListAmount % 10 !== 0) {
        state.client.productTotalPage += 1;
      }
    },
    CLIENT_CATEGORY(state, payload) {
      state.client.productFilterString = payload;
    },
    CLIENT_PRODUCT_TOTALPAGE(state, payload) {
      state.client.productTotalPage = payload;
    },
    CLIENT_PRODUCT_CURRENTPAGE(state, payload) {
      state.client.productCurrentPage = payload;
    },
    // Client Product Detail
    CLIENT_PRODUCT(state, payload) {
      state.client.product = payload;
    },
    CLIENT_PRODUCTAMOUNT(state, payload) {
      state.client.productAmount = payload;
    },
    // Client Cart
    CLIENT_SCHEDULE_STATUE(state, payload) {
      state.client.schedulePage = payload.page;
      state.client.schedulePaid = payload.paid;
    },
    // Client Cart Form
    CLIENT_CARTS(state, payload) {
      state.client.carts = payload;
    },
    CLIENT_CART_TOTALPRICE(state, payload) {
      state.client.cartTotalPrice = payload;
    },
    CLIENT_CART_TOTAL_AFTER_COUPON(state, payload) {
      state.client.cartTotalAfterCoupon = payload;
    },
    CLIENT_CART_ORDERID(state, payload) {
      state.client.cartOrderId = payload;
    },
    CLIENT_COUPON_CODE(state, payload) {
      state.client.couponCode = payload;
    },
    CLIENT_COUPON_ENABLED(state, payload) {
      state.client.couponEnabled = payload;
    },
    // Client Cart Payment
    CLIENT_ORDERS(state, payload) {
      state.client.orders = payload;
    },
    CLIENT_ORDER_USERDETAIL(state, payload) {
      state.client.orderUserDetail = payload;
    },
    CLIENT_ORDER_TOTALPRICE(state, payload) {
      state.client.orderTotalPrice = payload;
    },
    CLIENT_ORDER_PAID(state, payload) {
      state.client.orderPaid = payload;
    },
  },
});
