<template>
    <div class="container-fluid">
      <div class="row" :class="{'loading-target': returnLoading}">
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
