import { createRouter, createWebHistory } from "vue-router";

import AdminLayout from "@/layouts/admin.vue";
import AdminProducts from "@/pages/admin/products.vue";
import AdminOrders from "@/pages/admin/orders.vue";
import AdminCoupons from "@/pages/admin/coupons.vue";

import ClientLayout from "@/layouts/client.vue";
import ClientHome from "@/pages/client/home.vue";
import ClientShop from "@/pages/client/shop.vue";
import ClientProduct from "@/pages/client/product.vue";
import ClientCart from "@/pages/client/cart.vue";
import ClientOrder from "@/pages/client/order.vue";

import Login from "@/pages/Login.vue";
// import Client from "@/pages/Client.vue";
// import Main from "@/pages/Main.vue";
// import Product from "@/pages/Product.vue";
// import ProductMain from "@/pages/ProductMain.vue";
// import ProductDetail from "@/pages/ProductDetail.vue";
// import Coupon from "@/pages/Coupon.vue";
// import Cart from "@/pages/Cart.vue";
// import CartForm from "@/pages/CartForm.vue";
// import CartPayment from "@/pages/CartPayment.vue";
// import News from "@/pages/News.vue";

const routes = [
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
    component: ClientLayout,
    children: [
      {
        path: "",
        name: "ClientHome",
        component: ClientHome,
      },
      {
        path: "shop",
        name: "ClientShop",
        component: ClientShop,
      },
      {
        path: "shop/:productId",
        name: "ClientProduct",
        component: ClientProduct,
      },
      {
        path: "cart",
        name: "ClientCart",
        component: ClientCart,
      },
      {
        path: "order",
        name: "ClientOrder",
        component: ClientOrder,
      },
    ],
  },
  // {
  //   path: "/",
  //   component: Client,
  //   children: [
  //     {
  //       path: "",
  //       name: "Main",
  //       component: Main,
  //     },
  //     {
  //       path: "shop",
  //       component: Product,
  //       children: [
  //         {
  //           path: "/",
  //           name: "ProductMain",
  //           component: ProductMain,
  //         },
  //         {
  //           path: ":productId",
  //           name: "ProductDetail",
  //           component: ProductDetail,
  //         },
  //       ],
  //     },
  //     {
  //       path: "coupon",
  //       name: "Coupon",
  //       component: Coupon,
  //     },
  //     {
  //       path: "cart",
  //       component: Cart,
  //       children: [
  //         {
  //           path: "/",
  //           name: "CartForm",
  //           component: CartForm,
  //         },
  //         {
  //           path: "/payment/:orderId",
  //           name: "CartPayment",
  //           component: CartPayment,
  //         },
  //       ],
  //     },
  //     {
  //       path: "news",
  //       name: "News",
  //       component: News,
  //     },
  //   ],
  // },
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
