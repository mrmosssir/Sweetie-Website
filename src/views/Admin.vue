<template>
    <div class="container-fluid">
      <div class="admin-open-mobile">
        <h1 class="h2">非常抱歉 系統尚未開放</h1>
        <p>目前管理系統未提供手機螢幕使用</p>
        <p>不便之處敬請見諒</p>
        <button class="btn btn-brown"
                @click.prevent="returnHome">
                返回首頁
        </button>
      </div>
      <div class="row open-pc" :class="{'loading-target': returnLoading}">
        <Loading v-if="returnLoading" />
        <div class="col-md-2">
          <SideBar />
        </div>
        <div class="col-md-10">
          <TopBar />
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import TopBar from '../components/TopBar.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'Admin',
  components: {
    SideBar,
    TopBar,
    Loading,
  },
  methods: {
    returnHome() {
      this.$router.push('/');
    },
  },
  computed: {
    returnLoading() {
      return this.$store.state.loadingStatus;
    },
  },
  created() {
    this.$store.dispatch('checkLogin');
  },
};
</script>
