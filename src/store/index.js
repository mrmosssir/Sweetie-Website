import Vue from 'vue';
import Vuex from 'vuex';

import admin from './admin';
import adminProduct from './adminProduct';
import adminOrder from './adminOrder';
import adminCoupon from './adminCoupon';
import client from './client';
import clientProduct from './clientProduct';
import clientCart from './clientCart';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Loading
    loadingStatus: false,
    // Error
    error: false,
    errorMessage: '',
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
  },
  getters: {
    returnError(state) {
      return state.error;
    },
    returnErrorMessage(state) {
      return state.errorMessage;
    },
    returnLoading(state) {
      return state.loadingStatus;
    },
  },
  modules: {
    admin,
    adminProduct,
    adminOrder,
    adminCoupon,
    client,
    clientProduct,
    clientCart,
  },
});
