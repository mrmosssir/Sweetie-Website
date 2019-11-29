import axios from 'axios';
import router from '../router';

export default {
  namespaced: true,
  state: {
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
  actions: {
    clientAddCart(context, payload) {
      context.commit('LOADING', true, { root: true });
      const cartPackage = {
        product_id: payload.id,
        qty: payload.amount,
      };
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.post(api, { data: cartPackage }).then((Response) => {
        if (Response.data.success) {
          this.dispatch('client/clientGetCartsAmount');
          context.dispatch('clientGetCarts');
          context.commit('ERROR', {
            error: true,
            message: Response.data.message,
          }, { root: true });
          setInterval(() => {
            context.commit('ERROR', {
              error: false,
              message: '',
            }, { root: true });
          }, 3000);
        }
        context.commit('LOADING', false, { root: true });
      });
    },
    // Client Cart Form
    clientGetCarts(context) {
      context.commit('LOADING', true, { root: true });
      context.commit('CLIENT_SCHEDULE_STATUE', {
        page: 'first',
        paid: false,
      });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(api).then((Response) => {
        context.commit('CLIENT_CARTS', Response.data.data.carts);
        context.commit('CLIENT_CART_TOTALPRICE', Response.data.data.total);
        context.commit('CLIENT_CART_TOTAL_AFTER_COUPON', Response.data.data.final_total);
        context.commit('LOADING', false, { root: true });
      });
    },
    clientDeleteCart(context, payload) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${payload}`;
      axios.delete(api).then((Response) => {
        if (Response.data.success) {
          context.dispatch('clientGetCarts');
          this.dispatch('client/clientGetCartsAmount');
        }
        context.commit('LOADING', false, { root: true });
      });
    },
    clientRemoveCartsItem(context) {
      context.commit('LOADING', true, { root: true });
      this.state.clientCart.carts.forEach((item) => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
        axios.delete(api).then((Response) => {
          if (Response.data.success) {
            context.dispatch('clientGetCarts');
            this.dispatch('client/clientGetCartsAmount');
          }
        });
      });
      context.commit('LOADING', false, { root: true });
    },
    clientCreateOrder(context, payload) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      axios.post(api, { data: payload }).then((Response) => {
        if (Response.data.success) {
          context.commit('CLIENT_CART_ORDERID', Response.data.orderId);
          context.dispatch('clientCartPageForward', {
            page: 'second',
            paid: false,
          });
          context.commit('LOADING', false, { root: true });
          router.push(`payment/${this.state.clientCart.cartOrderId}`);
        }
      });
    },
    clientSetCoupon(context) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      axios.post(api, { data: { code: this.state.clientCart.couponCode } }).then((Response) => {
        if (Response.data.success) {
          context.commit('CLIENT_COUPON_ENABLED', true);
          context.commit('CLIENT_CART_TOTAL_AFTER_COUPON', Response.data.data.final_total);
        }
        context.commit('LOADING', false, { root: true });
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
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${this.state.clientCart.cartOrderId}`;
      axios.get(api).then((Response) => {
        if (Response.data.success) {
          context.commit('CLIENT_ORDERS', Response.data.order.products);
          context.commit('CLIENT_ORDER_USERDETAIL', Response.data.order.user);
          context.commit('CLIENT_ORDER_TOTALPRICE', Response.data.order.total);
          context.commit('CLIENT_ORDER_PAID', Response.data.order.is_paid);
          if (this.state.clientCart.orderPaid) {
            context.dispatch('clientCartPageForward', {
              page: 'second',
              paid: true,
            });
          } else {
            context.dispatch('clientCartPageForward', {
              page: 'second',
              paid: false,
            });
          }
        }
      });
    },
    clientOrderPayment(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${this.state.clientCart.cartOrderId}`;
      axios.post(api).then((Response) => {
        if (Response.data.success) {
          context.commit('CLIENT_ORDER_PAID', true);
          context.dispatch('clientCartPageForward', {
            page: 'second',
            paid: true,
          });
        }
      });
    },
  },
  mutations: {
    // Client Cart
    CLIENT_SCHEDULE_STATUE(state, payload) {
      state.schedulePage = payload.page;
      state.schedulePaid = payload.paid;
    },
    // Client Cart Form
    CLIENT_CARTS(state, payload) {
      state.carts = payload;
    },
    CLIENT_CART_TOTALPRICE(state, payload) {
      state.cartTotalPrice = payload;
    },
    CLIENT_CART_TOTAL_AFTER_COUPON(state, payload) {
      state.cartTotalAfterCoupon = payload;
    },
    CLIENT_CART_ORDERID(state, payload) {
      state.cartOrderId = payload;
    },
    CLIENT_COUPON_CODE(state, payload) {
      state.couponCode = payload;
    },
    CLIENT_COUPON_ENABLED(state, payload) {
      state.couponEnabled = payload;
    },
    // Client Cart Payment
    CLIENT_ORDERS(state, payload) {
      state.orders = payload;
    },
    CLIENT_ORDER_USERDETAIL(state, payload) {
      state.orderUserDetail = payload;
    },
    CLIENT_ORDER_TOTALPRICE(state, payload) {
      state.orderTotalPrice = payload;
    },
    CLIENT_ORDER_PAID(state, payload) {
      state.orderPaid = payload;
    },
  },
  getters: {
    // CartList
    returnCarts(state) {
      return state.carts;
    },
    returnTotalPrice(state) {
      return state.cartTotalPrice;
    },
    returnTotalAfterCoupon(state) {
      return state.cartTotalAfterCoupon;
    },
    returncouponEnabled(state) {
      return state.couponEnabled;
    },
    // Cart
    returnPageStatus(state) {
      return state.schedulePage;
    },
    returnPaidStatus(state) {
      return state.schedulePaid;
    },
    // CartPayment
    returnOrders(state) {
      return state.orders;
    },
    returnOrderUserDetail(state) {
      return state.orderUserDetail;
    },
    returnOrderTotalPrice(state) {
      return state.orderTotalPrice;
    },
    returnOrderPaid(state) {
      return state.orderPaid;
    },
  },
};
