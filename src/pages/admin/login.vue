<template>
  <div class="height-100vh d-flex justify-content-center align-items-center text-center">
    <div class="error-alert" v-if="returnError">
      {{ returnErrorMessage }}
    </div>
    <form class="login-width" @submit.prevent="login()">
      <p class="h1 text-brown font-weight-bold great_vibes-style m-0">Afternoon Sweetie</p>
      <h1 class="h3 my-4 font-weight-normal text-brown">管理系統登入</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control mt-3"
        v-model="user.username"
        placeholder="Email address"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control mt-3"
        v-model="user.password"
        placeholder="Password"
        required
      />
      <button class="btn btn-lg btn-brown btn-block mt-5" type="submit">登入</button>
      <hr class="my-4" />
      <button class="btn btn-lg btn-danger btn-block" @click.prevent="loginWithGoogle">
        使用 Google 登入
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";

const router = useRouter();

const user = ref({
  username: "",
  password: "",
});

const returnError = ref(false);
const returnErrorMessage = ref("");

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, user.value.username, user.value.password);
    router.push("/admin");
  } catch (error: any) {
    returnError.value = true;
    returnErrorMessage.value = error.message;
  }
};

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    router.push("/admin");
  } catch (error: any) {
    returnError.value = true;
    returnErrorMessage.value = error.message;
  }
};
</script>
