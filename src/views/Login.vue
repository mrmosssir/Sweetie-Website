<template>
    <div class="height-100vh d-flex justify-content-center align-items-center text-center">
      <div class="error-alert" v-if="returnError">
        {{ returnErrorMessage }}
      </div>
        <form class="login-width" @submit.prevent="checkUser()">
            <p class="h1 text-brown font-weight-bold great_vibes-style m-0">Afternoon Sweetie</p>
            <h1 class="h3 my-4 font-weight-normal text-brown">管理系統登入</h1>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" class="form-control mt-3"
                   v-model="returnUsername" placeholder="Email address" required autofocus>
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control mt-3"
                   v-model="returnPassword" placeholder="Password" required>
            <button class="btn btn-lg btn-brown btn-block mt-5" type="submit">登入</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    checkUser() {
      this.$store.dispatch('checkUser', {
        username: this.returnUsername,
        password: this.returnPassword,
      });
    },
  },
  computed: {
    returnUsername: {
      get() {
        return this.$store.state.user.username;
      },
      set(value) {
        this.$store.commit('USERNAME', value);
      },
    },
    returnPassword: {
      get() {
        return this.$store.state.user.password;
      },
      set(value) {
        this.$store.commit('PASSWORD', value);
      },
    },
    returnError() {
      return this.$store.state.error;
    },
    returnErrorMessage() {
      return this.$store.state.errorMessage;
    },
  },
};
</script>
