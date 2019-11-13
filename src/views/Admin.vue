<template>
    <div class="container-fluid">
      <div class="row">
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

export default {
  name: 'Admin',
  components: {
    SideBar,
    TopBar,
  },
  methods: {
    checkLogin() {
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
      this.$http.post(api).then((Response) => {
        if (!Response.data.success) {
          this.$router.push('sign');
        }
      });
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>
