<template>
    <div class="step-list">
        <div class="step-list-header">
            <span class="step-circle"
                  :class="{'circle-active': cartPage == 'first'}">1</span>
            <span class="step-line"></span>
            <span class="step-circle"
                  :class="{'circle-active': cartPage == 'second' && paid == false}">2</span>
            <span class="step-line"></span>
            <span class="step-circle"
                  :class="{'circle-active': cartPage == 'second' && paid == true}">3</span>
        </div>
        <div class="step-list-body mb-5 mt-3">
            <p class="mx-4" :class="{'text-active': cartPage == 'first'}">輸入資料</p>
            <p class="mx-4" :class="{'text-active': cartPage == 'second' && paid == false}">付款</p>
            <p class="mx-4" :class="{'text-active': cartPage == 'second' && paid == true}">訂單完成</p>
        </div>
        <router-link to="/shop" class="text-green-light">
            <i class="fas fa-backward mr-3"></i>回到商品區
        </router-link>
        <router-view @transferSchdule="transferSchdule"></router-view>
    </div>
</template>

<script>
export default {
  data() {
    return {
      cartPage: 'first',
      paid: false,
    };
  },
  methods: {
    transferSchdule(cartPage, paid) {
      this.cartPage = cartPage;
      this.paid = paid;
    },
  },
  created() {
    this.cartPage = 'first';
    this.paid = false;
  },
};
</script>
