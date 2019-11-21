<template>
    <div id="carouselSpotlightControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item"
                 v-for="numRow in 2" :key="numRow"
                 :class="{'active': numRow === 1}">
                <div class="row">
                    <div class="col-3" v-for="numCol in 4"
                         :key="returnProducts[4 * (numRow - 1) + (numCol - 1)].id">
                        <div class="spotlight-image spotlight-link"
                             :style="`background-image: url('${
                                 returnProducts[4 * (numRow - 1) + (numCol - 1)].imageUrl
                             }')`"
                             @click.prevent="
                              showProductDetail(returnProducts[4 * (numRow - 1) + (numCol - 1)].id)
                             ">
                        </div>
                        <div class="mt-2 text-brown">
                            <small>
                              {{returnProducts[4 * (numRow - 1) + (numCol - 1)].title}} - NT $
                              {{returnProducts[4 * (numRow - 1) + (numCol - 1)].price}}
                            </small>
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
    </div>
</template>

<script>
export default {
  name: 'Spotlight',
  methods: {
    getProducts() {
      this.$store.dispatch('clientGetProducts', true);
    },
    showProductDetail(id) {
      this.$store.dispatch('clientShowProductDetail', id);
    },
  },
  computed: {
    returnProducts() {
      return this.$store.state.client.products;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
