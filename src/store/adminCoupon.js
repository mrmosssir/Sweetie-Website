import $ from 'jquery';
import Vue from 'vue';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    coupons: [],
    coupon: {},
    couponIsNew: true,
    couponTotalPage: 0,
    couponSearchPage: 0,
    couponCurrentPage: 1,
  },
  actions: {
    adminGetCoupons(context, payload) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${payload}`;
      axios.get(api).then((Response) => {
        context.commit('ADMIN_COUPONS', Response.data.coupons);
        context.commit('ADMIN_COUPON_TOTALPAGE', Response.data.pagination.total_pages);
        context.commit('ADMIN_COUPON_PAGE', Response.data.pagination.total_pages);
        context.commit('ADMIN_COUPON_CURRENTPAGE', Response.data.pagination.current_page);
        context.commit('LOADING', false, { root: true });
      });
    },
    adminSubmitCoupon(context, payload) {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let mode = 'post';
      if (!this.state.adminCoupon.couponIsNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${payload}`;
        mode = 'put';
      }
      const timeStamp = new Date(this.state.adminCoupon.coupon.dueDate);
      context.commit('ADMIN_SET_COUPON', timeStamp);
      axios[mode](api, { data: this.state.adminCoupon.coupon }).then(() => {
        context.dispatch('adminGetCoupons', 1);
        $('#couponModal').modal('hide');
      });
    },
    adminDeleteCoupon(context, payload) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${payload}`;
      axios.delete(api).then(() => {
        if (this.state.adminCoupon.CouponCurrentPage > this.state.adminCoupon.CouponTotalPage) {
          context.dispatch('adminGetCoupons', this.state.adminCoupon.couponCurrentPage - 1);
          context.commit('ADMIN_COUPON_CURRENTPAGE', this.state.adminCoupon.couponCurrentPage - 1);
        } else {
          context.dispatch('adminGetCoupons', this.state.adminCoupon.couponCurrentPage);
        }
        $('#couponModal').modal('hide');
      });
    },
    adminCouponOpenModal(context, payload) {
      $('#couponModal').modal('show');
      context.commit('ADMIN_COUPON_ISNEW', payload.isNew);
      if (this.state.adminCoupon.couponIsNew) {
        context.commit('ADMIN_COUPON', {});
      } else {
        context.commit('ADMIN_COUPON', Object.assign({}, payload.item));
        context.commit('ADMIN_COUPON_DUEDATE', payload.item.dueDate);
      }
    },
  },
  mutations: {
    // Admin Coupon
    ADMIN_COUPONS(state, payload) {
      state.coupons = payload;
    },
    ADMIN_COUPON(state, payload) {
      state.coupon = payload;
    },
    ADMIN_SET_COUPON(state, payload) {
      Vue.set(state.coupon, 'dueDate', payload.getTime());
    },
    ADMIN_COUPON_TOTALPAGE(state, payload) {
      state.couponTotalPage = payload;
    },
    ADMIN_COUPON_CURRENTPAGE(state, payload) {
      state.couponCurrentPage = payload;
    },
    ADMIN_COUPON_ISNEW(state, payload) {
      state.couponIsNew = payload;
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
      state.coupon.dueDate = `${date.getFullYear()}-${dateArray[0]}-${dateArray[1]}T${dateArray[2]}:${dateArray[3]}`;
    },
    ADMIN_COUPON_PAGE(state, payload) {
      state.couponSearchPage = payload;
    },
  },
  getters: {
    returnCoupons(state) {
      return state.coupons;
    },
    returnCoupon(state) {
      return state.coupon;
    },
    returnIsNew(state) {
      return state.couponIsNew;
    },
    returnPage(state) {
      return state.couponSearchPage;
    },
    returnCurrentPage(state) {
      return state.couponCurrentPage;
    },
  },
};
