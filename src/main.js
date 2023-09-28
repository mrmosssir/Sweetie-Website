import Vue from 'vue';
import axios from 'axios';
import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import App from './App.vue';
import router from './router';
import store from './store';
import './bus';
import 'bootstrap';

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;

Vue.use(VeeValidate, {
  dictionary: {
    zhTW,
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
