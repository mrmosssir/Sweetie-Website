<template>
  <div>
    <div class="homepage-circle"></div>
    <div class="page-selector">
      <div class="page-selector-point" @click.prevent="changePage(1)"></div>
      <div class="page-selector-line"></div>
      <div class="page-selector-point" @click.prevent="changePage(3)"></div>
      <div class="page-selector-line"></div>
      <div class="page-selector-point" @click.prevent="changePage(4)"></div>
    </div>
    <section id="part2" class="container">
      <div class="homepage-content">
        <h2 class="open-pc">You deserve this happiness in here</h2>
        <h2 class="open-pc">For you much warm</h2>
        <h2 class="open-mobile-text">Welcome AfterSweet</h2>
        <p>打開你的心房 進入這個甜點的夢幻國度 我們很樂意為您服務</p>
        <router-link to="/shop" class="homepage-link">
          <small>前往預約</small>
          <hr class="homepage-link-line">
        </router-link>
      </div>
      <Spotlight />
    </section>
    <section id="part3" class="bg-brown-light py-5">
      <div class="container">
        <h2 class="h1 great_vibes-style font-weight-bold text-brown text-center my-4">
          About us
        </h2>
        <div class="row mb-4">
          <div class="col-md-5 open-pc">
            <div class="image-about" style="background-image: url('https://images.unsplash.com/photo-1471646174523-327e108889e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80');"></div>
          </div>
          <div class="col-md-7">
            <p class="text-secondary text-indent">
              堅持從原料手工製作，最後成為每一份在您口中散發溫暖的甜點；我們希望來過我們這裡的每一位客人，都能夠品嘗到幸福的滋味，這是我們一直持續努力的動力；
              草莓及檸檬的酸甜味，不僅中和了蛋糕的甜膩，也為它襯托出了另一種奇妙的滋味，一口咬下，像是咬下了一朵用幕斯用奶油細細織成的雲；
              巧克力像魔鬼一般，強行的為平凡無奇的糕點注入濃郁的香氣，並與之同化；而我們則是魔法師，將所有美味的元素中和，讓他們聚集成一顆名為甜點的鑽石。<br/>
            </p>
            <p class="text-secondary text-indent">
              AfterSweet創立於2017年，在以將幸福帶給大家為宗旨中用餐車的形式開幕了，老闆放棄了500萬的年薪，決定回到家鄉自己出來開創一片天地，並秉持著良心企業，
              原料手工製作的精神，每天和早餐店一樣三點多起床備料，為的就是客人吃下我們做得甜點後那滿足的表情，2019年老闆終於在台北的精華地段買下店面，並開始擴大
              這個甜點世界的板圖，一直到今天，我們仍然秉持著初衷在努力經營，目的就是希望客人能夠吃得健康，吃得幸福。
            </p>
          </div>
        </div>
        <div class="row open-pc">
          <div class="col-md-7">
            <div class="image-about"
                  style="background-image: url('https://images.unsplash.com/photo-1531172079369-5f1a80aa8a99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80');
                        height: 250px">
            </div>
          </div>
          <div class="col-md-5">
            <div class="image-about"
                  style="background-image: url('https://images.unsplash.com/photo-1507009977554-470051a8d4d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=942&q=80');
                        height: 250px">
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="part4" class="bg-white height-100vh">
      <div class="container py-5">
        <h2 class="great_vibes-style font-weight-bold text-brown text-center my-5">Contact Us</h2>
        <div class="row">
          <div class="col-md-5">
            <h3 class="font-weight-bold">店家資訊</h3>
            <hr class="my-5">
            <p>
              <i class="fas fa-phone text-brown mr-2"></i>
              聯絡電話：0912-345678
            </p>
            <p>
              <i class="fas fa-map-marker-alt text-brown ml-1 mr-2"></i>
              地址：台北市信義區信義路五段7號
            </p>
            <p>
              <i class="fas fa-envelope text-brown mr-2"></i>
              信箱：mrmosssir@gmail.com
            </p>
            <p>
              <i class="fas fa-user-alt text-brown mr-2"></i>
              聯絡人：侯先生
            </p>
            <p>
              <i class="fas fa-clock text-brown mr-2"></i>
              營業時間：11：00 ~ 18：00 每週三公休
            </p>
          </div>
          <div class="col-md-7">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615
            .0032467299634!2d121.56228351500631!3d25.033963883972344!2m3!1f0!2f0!3f
            0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6da9c9e1f%3A0x1206bcf082fd
            10a6!2zMTEw5Y-w5YyX5biC5L-h576p5Y2A5L-h576p6Lev5LqU5q61N-iZnw!5e0!3m2!1
            szh-TW!2stw!4v1574754796456!5m2!1szh-TW!2stw"
            width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen="">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery';
import Spotlight from '../components/Spotlight.vue';

export default {
  name: 'Main',
  components: {
    Spotlight,
  },
  methods: {
    changePage(page) {
      $('html, body').animate({
        scrollTop: $(`#part${page}`).offset().top,
      }, 800);
    },
  },
};
</script>
