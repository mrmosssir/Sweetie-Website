<template>
    <div>
      <Banner />
      <section>
        <h2 class="great_vibes-style text-brown text-center my-5">Hot Sales</h2>
        <Spotlight />
      </section>
      <section>
        <h2 class="great_vibes-style text-brown text-center my-5">Our persistence</h2>
        <p class="text-secondary text-indent">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Possimus minima officia cupiditate doloremque esse cumq
          ue debitis distinctio incidunt magni totam. Doloribus,
          culpa. Voluptates a quae eveniet in, voluptatem cum, la
          bore culpa veniam rerum veritatis tempore excepturi ill
          o cupiditate non tenetur alias corporis qui facere, sim
          ilique vel. Magni dolor vitae quis iure, consequatur be
          atae tenetur voluptas in aperiam ipsa labore voluptates
           nihil deleniti natus eos optio voluptatum iste quos nu
           mquam incidunt provident accusantium quisquam. Necessi
           tatibus perspiciatis recusandae quod minima blanditiis
            explicabo qui odio voluptatem quae suscipit quos tota
            m veritatis deleniti corrupti tempore error dolore co
            mmodi ut sed, quasi placeat? Voluptatibus, eaque.
          </p>
      </section>
      <section>
        <h2 class="great_vibes-style text-brown text-center my-5">Contact Us</h2>
        <div class="d-flex justify-content-center align-items-center">
          <div class="mr-5">
            <p>聯絡電話：0912-345678</p>
            <p>地址：花蓮縣花蓮市中山路一號</p>
            <p>聯絡人：陳先生</p>
            <p>營業時間：11：00 ~ 18：00 每週三公休</p>
          </div>
          <iframe src="
                  https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.44223
                  26304107!2d121.6045335146937!3d23.980155985877833!2m3!1f0!2f0!3f
                  0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34689fc0be4a7ca5%3A0x4443b
                  d6e02836ee!2zOTcw6Iqx6JOu57ij6Iqx6JOu5biC5Lit5bGx6LevMzI3LTHomZ8
                  !5e0!3m2!1szh-TW!2stw!4v1563267714244!5m2!1szh-TW!2stw"
                  width="600" height="450" frameborder="0" style="border:0" allowfullscreen>
          </iframe>
        </div>
      </section>
    </div>
</template>

<script>
import Banner from '../components/Banner.vue';
import Spotlight from '../components/Spotlight.vue';

export default {
  name: 'Main',
  components: {
    Banner,
    Spotlight,
  },
};
</script>
