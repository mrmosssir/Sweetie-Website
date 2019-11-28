<template>
    <div>
        <div class="error-alert" v-if="returnError">
            {{ returnErrorMessage }}
        </div>
        <Loading v-if="returnLoading" />
        <header>
            <Menu />
        </header>
        <router-view>
        </router-view>
        <footer class="bg-gray p-5 text-center text-white">
            <h2 class="h1 great_vibes-style">
                Afternoon Sweetie
            </h2>
            <ul class="d-flex justify-content-center p-0 my-5">
                <li class="mx-3">
                    <a href="https://www.facebook.com/profile.php?id=100003069111691">
                        <i class="fab fa-facebook-square text-white h3"></i>
                    </a>
                </li>
                <li class="mx-3">
                    <a href="https://github.com/mrmosssir">
                        <i class="fab fa-github text-white h3"></i>
                    </a>
                </li>
                <li class="mx-3">
                    <a href="https://medium.com/@mrmosssir">
                        <i class="fab fa-medium text-white h3"></i>
                    </a>
                </li>
                <li class="mx-3">
                    <a href="https://twitter.com/mrmosssir">
                        <i class="fab fa-twitter-square text-white h3"></i>
                    </a>
                </li>
            </ul>
            <p>Copyright © 2019 SuTo Creative Collective.</p>
        </footer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loading from '../components/Loading.vue';
import Menu from '../components/Menu.vue';

export default {
  name: 'App',
  components: {
    Loading,
    Menu,
  },
  computed: {
    ...mapGetters(['returnLoading', 'returnError', 'returnErrorMessage']),
  },
};
</script>
