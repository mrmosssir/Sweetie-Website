<template>
    <div>
        <nav class="sidebar d-md-block col-md-2">
            <div class="sidebar-sticky">
                <router-link to="/">
                    <h1 class="great_vibes-style text-center text-brown-light py-4 mb-0">
                        Afernoon
                    </h1>
                </router-link>
                <hr class="sidebar-line my-0 mx-3">
                <small class="d-block mt-5 ml-3 text-brown-light">功能列表</small>
                <ul class="nav flex-column">
                    <li class="nav-item" @click.prevent="changeSearchMode('product')">
                        <router-link to="/admin" class="nav-link text-brown-light">
                            商品列表管理
                        </router-link>
                    </li>
                    <li class="nav-item" @click.prevent="changeSearchMode('order')">
                        <router-link to="/admin/orders" class="nav-link text-brown-light">
                            訂單列表管理
                        </router-link>
                    </li>
                    <li class="nav-item" @click.prevent="changeSearchMode('coupon')">
                        <router-link to="/admin/coupons" class="nav-link text-brown-light">
                            優惠券管理
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'SideBar',
  methods: {
    changeSearchMode(mode) {
      this.$store.dispatch('changeSearchMode', mode);
    },
  },
};
</script>
