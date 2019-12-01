<template>
  <div>
    <!-- pc -->
    <div id="carouselSpotlightControls" class="carousel slide mb-4" data-ride="carousel"
         v-if="returnProducts.length > 0">
      <div class="carousel-inner open-pc">
        <div class="carousel-item"
             v-for="numRow in 2" :key="numRow"
             :class="{'active': numRow === 1}">
          <div class="row">
            <div class="col-md-3" v-for="numCol in 4"
                 :key="returnProducts
                 [returnProducts.length - 1 -
                 (4 * (numRow - 1) + (numCol - 1))].id">
              <div class="image-spotlight spotlight-link"
                   style="position: relative;"
                   :style="`background-image: url('${
                            returnProducts
                            [returnProducts.length - 1 -
                            (4 * (numRow - 1) + (numCol - 1))].imageUrl
                          }')`"
                  @click.prevent="
                    showProductDetail(
                      returnProducts
                      [returnProducts.length - 1 -
                      (4 * (numRow - 1) + (numCol - 1))].id)">
                <div class="spotlight-hover">
                  <p class="h5">
                    {{ returnProducts
                    [returnProducts.length - 1 -
                    (4 * (numRow - 1) + (numCol - 1))].title
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselSpotlightControls"
           role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselSpotlightControls"
           role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
        <!-- mobile -->
      <div id="carouselSpotlightControlsMobile"
            class="carousel slide mb-4" data-ride="carousel">
        <div class="carousel-inner open-mobile h-50">
          <div class="carousel-item"
               v-for="num in 8" :key="num"
               :class="{'active': num === 1}">
            <div class="image-spotlight spotlight-link"
                 :style="`background-image: url('${
                          returnProducts[returnProducts.length - 1 - num].imageUrl}')`"
                @click.prevent="
                showProductDetail(returnProducts[returnProducts.length - 1 - num].id)">
              <div class="spotlight-hover">
                <p class="h5">
                  {{returnProducts[returnProducts.length - 1 - num].title}}
                </p>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselSpotlightControlsMobile"
            role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselSpotlightControlsMobile"
            role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Spotlight',
  methods: {
    getProducts() {
      this.$store.dispatch('clientProduct/clientGetProducts', true);
    },
    showProductDetail(id) {
      this.$store.dispatch('clientProduct/clientShowProductDetail', id);
    },
  },
  computed: {
    ...mapGetters('clientProduct', ['returnProducts']),
  },
  created() {
    this.getProducts();
  },
};
</script>
