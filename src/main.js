import "@/assets/style.css";

import { createApp } from "vue";
import axios from "axios";
import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Font Awesome 輕量化配置
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// 只導入需要的圖標 (按需添加)
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// 只添加需要的圖標到庫中
library.add(faXmark);

axios.defaults.withCredentials = true;

// Configure vee-validate for Vue 3
configure({
  generateMessage: localize({
    zh_TW: zhTW,
  }),
});

const app = createApp(App);

// 註冊 Font Awesome 組件
app.component("fa-icon", FontAwesomeIcon);

// Add axios to global properties
app.config.globalProperties.$http = axios;

app.use(router);
app.use(store);
app.mount("#app");
