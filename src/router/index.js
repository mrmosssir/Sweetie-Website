import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import Login from '../views/Login.vue';
import AdminProducts from '../views/AdminProducts.vue';
import AdminOrders from '../views/AdminOrders.vue';
import AdminCoupons from '../views/AdminCoupons.vue';
import Client from '../views/Client.vue';
import Main from '../views/Main.vue';
import Product from '../views/Product.vue';
import ProductMain from '../views/ProductMain.vue';
import ProductDetail from '../views/ProductDetail.vue';
import Coupon from '../views/Coupon.vue';
import Cart from '../views/Cart.vue';
import CartForm from '../views/CartForm.vue';
import CartPayment from '../views/CartPayment.vue';
import News from '../views/News.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/admin',
    component: Admin,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'AdminProducts',
        component: AdminProducts,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: AdminOrders,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'coupons',
        name: 'AdminCoupons',
        component: AdminCoupons,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: Client,
    children: [
      {
        path: '',
        name: 'Main',
        component: Main,
      },
      {
        path: 'shop',
        component: Product,
        children: [
          {
            path: '/',
            name: 'ProductMain',
            component: ProductMain,
          },
          {
            path: ':productId',
            name: 'ProductDetail',
            component: ProductDetail,
          },
        ],
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: Coupon,
      },
      {
        path: 'cart',
        component: Cart,
        children: [
          {
            path: '/',
            name: 'CartForm',
            component: CartForm,
          },
          {
            path: '/payment/:orderId',
            name: 'CartPayment',
            component: CartPayment,
          },
        ],
      },
      {
        path: 'news',
        name: 'News',
        component: News,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
