<template>
    <div class="py-4">
        <div class="row">
            <div class="col-md-9 d-flex">
                <input class="px-3 text-brown d-block rounded-pill
                              border border-brown w-100 mx-3 input-search"
                       type="text">
                <button class="d-block btn btn-brown btn-search rounded-circle">
                  <i class="fas fa-search text-white"></i>
                </button>
            </div>
            <div class="col-md-3 text-center">
                <button class="d-block btn btn-secondary w-100 rounded-pill"
                        @click.prevent="logout()">登出管理系統
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Topbar',
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then((Response) => {
        if (Response.data.success) {
          vm.$router.push('/sign');
        }
      });
    },
  },
};
</script>
