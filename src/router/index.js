import { createRouter, createWebHistory } from "vue-router";

import AdminLayout from "@/layouts/Admin.vue";
import AdminProducts from "@/views/AdminProducts.vue";
import AdminOrders from "@/views/AdminOrders.vue";
import AdminCoupons from "@/views/AdminCoupons.vue";

import Login from "@/views/Login.vue";
import Client from "@/views/Client.vue";
import Main from "@/views/Main.vue";
import Product from "@/views/Product.vue";
import ProductMain from "@/views/ProductMain.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Coupon from "@/views/Coupon.vue";
import Cart from "@/views/Cart.vue";
import CartForm from "@/views/CartForm.vue";
import CartPayment from "@/views/CartPayment.vue";
import News from "@/views/News.vue";

// import test from "@/views/test.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "Test",
  //   component: test,
  // },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: {
      title: "後台管理",
    },
    children: [
      {
        path: "",
        name: "AdminProducts",
        component: AdminProducts,
        meta: {
          title: "商品",
          icon: "cookie-bite",
        },
      },
      {
        path: "orders",
        name: "AdminOrders",
        component: AdminOrders,
        meta: {
          title: "訂單",
          icon: "clipboard-list",
        },
      },
      {
        path: "coupons",
        name: "AdminCoupons",
        component: AdminCoupons,
        meta: {
          title: "優惠券",
          icon: "ticket",
        },
      },
    ],
  },
  {
    path: "/",
    component: Client,
    children: [
      {
        path: "",
        name: "Main",
        component: Main,
      },
      {
        path: "shop",
        component: Product,
        children: [
          {
            path: "/",
            name: "ProductMain",
            component: ProductMain,
          },
          {
            path: ":productId",
            name: "ProductDetail",
            component: ProductDetail,
          },
        ],
      },
      {
        path: "coupon",
        name: "Coupon",
        component: Coupon,
      },
      {
        path: "cart",
        component: Cart,
        children: [
          {
            path: "/",
            name: "CartForm",
            component: CartForm,
          },
          {
            path: "/payment/:orderId",
            name: "CartPayment",
            component: CartPayment,
          },
        ],
      },
      {
        path: "news",
        name: "News",
        component: News,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
