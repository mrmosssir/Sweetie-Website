import { createApp } from 'vue';
import axios from 'axios';
import { configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap';

axios.defaults.withCredentials = true;

// Configure vee-validate for Vue 3
configure({
  generateMessage: localize({
    zh_TW: zhTW,
  }),
});

const app = createApp(App);

// Add axios to global properties
app.config.globalProperties.$http = axios;

app.use(router);
app.use(store);
app.mount('#app');
