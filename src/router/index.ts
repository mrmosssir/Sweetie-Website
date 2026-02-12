import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
  {
    path: "/admin",
    component: () => import("@/layouts/admin.vue"),
    meta: {
      title: "後台管理",
    },
    children: [
      {
        path: "",
        name: "AdminProducts",
        component: () => import("@/pages/admin/products.vue"),
        meta: {
          title: "商品",
          icon: "cookie-bite",
        },
      },
      {
        path: "category",
        name: "AdminCategory",
        component: () => import("@/pages/admin/category.vue"),
        meta: {
          title: "類別",
          icon: "tag",
        },
      },
      {
        path: "advertise",
        name: "AdminAdvertise",
        component: () => import("@/pages/admin/advertise.vue"),
        meta: {
          title: "廣告",
          icon: "rectangle-ad",
        },
      },
      {
        path: "orders",
        name: "AdminOrders",
        component: () => import("@/pages/admin/orders.vue"),
        meta: {
          title: "訂單",
          icon: "clipboard-list",
        },
      },
      {
        path: "coupons",
        name: "AdminCoupons",
        component: () => import("@/pages/admin/coupons.vue"),
        meta: {
          title: "優惠券",
          icon: "ticket",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/client.vue"),
    children: [
      {
        path: "",
        name: "ClientHome",
        component: () => import("@/pages/client/home.vue"),
        meta: {
          ads: true,
        },
      },
      {
        path: "shop",
        name: "ClientShop",
        component: () => import("@/pages/client/shop.vue"),
        meta: {
          ads: true,
        },
      },
      {
        path: "product/:id",
        name: "ClientProduct",
        component: () => import("@/pages/client/product.vue"),
      },
      {
        path: "cart",
        name: "ClientCart",
        component: () => import("@/pages/client/cart.vue"),
      },
      {
        path: "order",
        name: "ClientOrder",
        children: [
          {
            path: "",
            name: "ClientOrderForm",
            component: () => import("@/pages/client/order.vue"),
          },
          {
            path: "history",
            name: "ClientOrderHistory",
            component: () => import("@/pages/client/history.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/admin/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
