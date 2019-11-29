import axios from 'axios';

export default {
  namespaced: true,
  state: {
    cartsAmount: 0,
  },
  actions: {
    clientGetCartsAmount(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(api).then((Response) => {
        if (Response.data.success) {
          context.commit('CLIENT_GET_CARTSAMOUNT', Response.data.data.carts.length);
        }
      });
    },
  },
  mutations: {
    // Client Product Main
    CLIENT_GET_CARTSAMOUNT(state, payload) {
      state.cartsAmount = payload;
    },
  },
  getters: {
    returnCartsAmount(state) {
      return state.cartsAmount;
    },
  },
};
