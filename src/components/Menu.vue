<template>
  <div id="part1">
    <div class="navbar-frame">
      <div class="d-flex justify-content-between align-items-center">
        <router-link to="/" class="navbar-home">
            <h1 class="font-weight-bold great_vibes-style text-brown m-0">
                AfterSweet
            </h1>
        </router-link>
        <i class="fas fa-bars"
            @mouseover.prevent="openMenu"
            @mouseout.prevent="closeMenu">
        </i>
      </div>
      <div class="navbar-group text-brown">
        <router-link to="/news" class="navbar-link mx-3">
          最新消息
        </router-link>
        <router-link to="/coupon" class="navbar-link mx-3">
          特別優惠
        </router-link>
        <router-link to="/shop" class="navbar-link mx-3 ">
          預約餐點
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Menu',
  methods: {
    openMenu() {
      $('.navbar-group').addClass('navbar-open');
    },
    closeMenu() {
      $('.navbar-group').removeClass('navbar-open');
    },
  },
};
</script>
