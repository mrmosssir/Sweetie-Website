import "@/assets/style.css";

import { createApp, type App } from "vue";
import { createPinia } from "pinia";
import { defineRule, configure } from "vee-validate";
import { required, integer, min_value, max_value } from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";
import Application from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// Font Awesome 輕量化配置
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import VueRollerSwiper from "vue-roller-swiper";
import "vue-roller-swiper/dist/style.css";

// 只導入需要的圖標 (按需添加)
import {
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faBars,
  faBreadSlice,
  faCakeCandles,
  faCartShopping,
  faCheck,
  faClipboardList,
  faCookieBite,
  faDollarSign,
  faGreaterThan,
  faMugHot,
  faPenToSquare,
  faPlus,
  faRightFromBracket,
  faSearch,
  faStroopwafel,
  faTicket,
  faTrash,
  faXmark,
  faHeart,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

// 只添加需要的圖標到庫中
library.add(
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faBars,
  faBreadSlice,
  faCakeCandles,
  faCartShopping,
  faCheck,
  faClipboardList,
  faCookieBite,
  faFacebook,
  faDollarSign,
  faGreaterThan,
  faHeart,
  faInstagram,
  faMugHot,
  faPenToSquare,
  faPlus,
  faRegularHeart,
  faRightFromBracket,
  faSearch,
  faStroopwafel,
  faTicket,
  faTrash,
  faXmark,
  faXTwitter,
  faTag,
);

// Define the validation rules that will be used in the project
defineRule("required", required);
defineRule("integer", integer);
defineRule("min_value", min_value);
defineRule("max_value", max_value);

// Configure vee-validate for Vue 3 with i18n
configure({
  generateMessage: localize({
    zh_TW: zhTW,
  }),
  validateOnInput: true, // Optional: to trigger validation on input
});

// Set the active locale
setLocale("zh_TW");

let app: App<Element>;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(Application);

    // 創建 Pinia 實例
    const pinia = createPinia();

    // 註冊 Font Awesome 組件
    app.component("fa-icon", FontAwesomeIcon);

    // 註冊 VueRollerSwiper 插件
    app.use(VueRollerSwiper);

    app.use(router);
    app.use(store); // Vuex store
    app.use(pinia); // Pinia store
    app.mount("#app");
  }
});
