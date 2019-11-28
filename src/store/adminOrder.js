import axios from 'axios';

export default {
  namespaced: true,
  state: {
    orders: [],
    orderTotalPage: 0,
    orderSearchPage: 0,
    orderCurrentPage: 1,
  },
  actions: {
    // Admin Order
    adminGetOrders(context, payload) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${payload}`;
      axios.get(api).then((Response) => {
        context.commit('ADMIN_ORDERS', Response.data.orders);
        context.commit('ADMIN_ORDER_TOTALPAGE', Response.data.pagination.total_pages);
        context.commit('ADMIN_ORDER_PAGE', Response.data.pagination.total_pages);
        context.commit('ADMIN_ORDER_CURRENTPAGE', Response.data.pagination.current_page);
        context.commit('LOADING', false, { root: true });
      });
    },
  },
  mutations: {
    // Admin Order
    ADMIN_ORDERS(state, payload) {
      state.orders = payload;
    },
    ADMIN_ORDER_TOTALPAGE(state, payload) {
      state.orderTotalPage = payload;
    },
    ADMIN_ORDER_CURRENTPAGE(state, payload) {
      state.orderCurrentPage = payload;
    },
    ADMIN_ORDER_PAGE(state, payload) {
      state.orderSearchPage = payload;
    },
  },
  getters: {
    returnPage(state) {
      return state.orderSearchPage;
    },
    returnCurrentPage(state) {
      return state.orderCurrentPage;
    },
  },
};
