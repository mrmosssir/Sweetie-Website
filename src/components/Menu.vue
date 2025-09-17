<template>
  <div id="menu">
    <div class="navbar-frame">
      <div class="d-flex justify-content-between align-items-center">
        <router-link to="/" class="navbar-home">
            <h1 class="font-weight-bold great_vibes-style text-brown m-0">
                AfterSweet
            </h1>
        </router-link>
        <i class="fas fa-bars"
            @mouseover.prevent="menuEnabled = true"
            @mouseout.prevent="menuEnabled = false">
        </i>
      </div>
      <div class="navbar-group text-brown" :class="{'navbar-open': menuEnabled}">
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

<script lang="ts" setup>
import { ref } from 'vue';

const menuEnabled = ref(false);
</script>

<style lang="scss" scoped>
.navbar-frame {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 64px 11%;
  background: transparent;
  * {
    text-decoration: none !important;
  }
  i {
    display: none;
    cursor: pointer;
  }
}
.navbar-open {
  height: 135px !important;
}
@media (max-width: 768px) {
  .navbar-frame {
    display: block;
    padding: 0px 16px;
    background: $brown;
    * {
      color: white !important;
    }
    i {
      display: block;
    }
  }
  .navbar-group {
    height: 0px;
    overflow: hidden;
    transition: all 1.5s;
  }
  .navbar-home {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    h1 {
      font-size: 24px !important;
      text-align: left;
      margin-bottom: 0;
    }
  }
  .navbar-link {
    display: block;
    background: $brown;
    text-align: center;
    color: white !important;
    border-top: 1px solid white;
    margin: 0 !important;
    padding: 10px 0;
  }
}
</style>
