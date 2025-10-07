<template>
  <div class="mt-5">
    <div class="container step-list mb-5">
      <div class="step-list-header">
        <span class="step-circle"
              :class="{
                'circle-active': returnPageStatus == 'first'
              }">
              1
        </span>
        <span class="step-line"></span>
        <span class="step-circle"
              :class="{
                'circle-active': returnPageStatus == 'second' && returnPaidStatus == false
              }">
              2
        </span>
        <span class="step-line"></span>
        <span class="step-circle"
              :class="{
                'circle-active': returnPageStatus == 'second' && returnPaidStatus == true
              }">
              3
        </span>
      </div>
      <div class="step-list-body mb-5 mt-3">
        <p class="mx-4"
            :class="{'text-active': returnPageStatus == 'first'}">
          輸入資料
        </p>
        <p class="mx-4"
            :class="{'text-active': returnPageStatus == 'second' && returnPaidStatus == false}">
          付款
        </p>
        <p class="mx-4"
            :class="{'text-active': returnPageStatus == 'second' && returnPaidStatus == true}">
          訂單完成
        </p>
      </div>
      <router-link to="/shop" class="text-green-light">
        <i class="fas fa-backward mr-3"></i>
        回到商品區
      </router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Cart',
  computed: {
    ...mapGetters('clientCart', ['returnPageStatus', 'returnPaidStatus']),
  },
};
</script>
