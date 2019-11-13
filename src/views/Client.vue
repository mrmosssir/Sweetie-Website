<template>
    <div>
        <div class="container">
            <header>
                <Navbar />
            </header>
            <router-view/>
        </div>
        <footer class="bg-gray p-5 text-center text-white mt-5">
            <h2 class="h1 great_vibes-style">Afternoon Sweetie</h2>
            <ul class="d-flex justify-content-center p-0 my-5">
                <li class="mx-3">
                    <a href="#">
                        <i class="fab fa-facebook-square text-white h3"></i>
                    </a>
                </li>
                <li class="mx-3">
                    <a href="#">
                        <i class="fab fa-github text-white h3"></i>
                    </a>
                </li>
                <li class="mx-3">
                    <a href="#">
                        <i class="fab fa-instagram text-white h3"></i>
                    </a>
                </li>
                <li class="mx-3">
                    <a href="#">
                        <i class="fab fa-twitter-square text-white h3"></i>
                    </a>
                </li>
            </ul>
            <p>Copyright © 2019 SuTo Creative Collective.</p>
        </footer>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>
