<template>
    <div class="height-100vh d-flex justify-content-center align-items-center text-center">
        <form class="login-width" @submit.prevent="userCheck()">
            <p class="h1 text-brown font-weight-bold great_vibes-style m-0">Afternoon Sweetie</p>
            <h1 class="h3 my-4 font-weight-normal text-brown">管理系統登入</h1>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" class="form-control mt-3"
                   v-model="user.username" placeholder="Email address" required autofocus>
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control mt-3"
                   v-model="user.password" placeholder="Password" required>
            <button class="btn btn-lg btn-brown btn-block mt-5" type="submit">登入</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    userCheck() {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      const vm = this;
      this.$http.post(api, vm.user).then((Response) => {
        if (Response.data.success) {
          vm.$router.push('/admin');
        } else {
          vm.user.username = '';
          vm.user.password = '';
          // alert('帳號或密碼錯誤');
        }
      });
    },
  },
};
</script>
