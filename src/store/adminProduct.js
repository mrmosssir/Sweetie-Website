import $ from 'jquery';
import Vue from 'vue';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    // AdminProducts Variable
    // product list
    products: [],
    product: {},
    productIsNew: true,
    productTotalPage: 0,
    productSearchPage: 0,
    productCurrentPage: 1,
    updateStatus: false,
  },
  actions: {
    // Admin Product
    adminGetProducts(context, payload) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${payload}`;
      axios.get(api).then((Response) => {
        if (Response.data.success) {
          context.commit('ADMIN_PRODUCTS', Response.data.products);
          context.commit('ADMIN_PRODUCT_TOTALPAGE', Response.data.pagination.total_pages);
          context.commit('ADMIN_PRODUCT_PAGE', Response.data.pagination.total_pages);
          context.commit('ADMIN_PRODUCT_CURRENTPAGE', Response.data.pagination.current_page);
        }
        context.commit('LOADING', false, { root: true });
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
      if (!this.state.adminProduct.productIsNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${payload.id}`;
        mode = 'put';
      }
      axios[mode](api, { data: this.state.adminProduct.product }).then((Response) => {
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
  },
  mutations: {
    UPDATESTATUS(state, payload) {
      state.updateStatus = payload;
    },
    // Admin
    ADMIN_PRODUCT_PAGE(state, payload) {
      state.productSearchPage = payload;
    },
    // Admin Product
    ADMIN_PRODUCTS(state, payload) {
      state.products = payload;
    },
    ADMIN_PRODUCT(state, payload) {
      state.product = payload;
    },
    ADMIN_PRODUCT_TOTALPAGE(state, payload) {
      state.productTotalPage = payload;
    },
    ADMIN_PRODUCT_CURRENTPAGE(state, payload) {
      state.productCurrentPage = payload;
    },
    ADMIN_PRODUCT_ISNEW(state, payload) {
      state.productIsNew = payload;
    },
    ADMIN_PRODUCT_SET_IMAGEURL(state, payload) {
      Vue.set(state.product, 'imageUrl', payload);
    },
  },
  getters: {
    returnProducts(state) {
      return state.products;
    },
    returnProduct(state) {
      return state.product;
    },
    returnIsNew(state) {
      return state.productIsNew;
    },
    returnPage(state) {
      return state.productSearchPage;
    },
    returnCurrentPage(state) {
      return state.productCurrentPage;
    },
    returnUpdateStatus(state) {
      return state.updateStatus;
    },
  },
};
