<template>
  <section>
    <div class="banner-wrapper">
      <div class="left">
        <swiper :options="swiperOption" class="my-swiper">
          <swiper-slide class="my-slide">
            <a href="#">
              <img src="./img/1.png" alt="">
            </a>
          </swiper-slide>
          <swiper-slide class="my-slide">
            <a href="#">
              <img src="./img/2.png" alt="">
            </a>
          </swiper-slide>
          <swiper-slide class="my-slide">
            <a href="#">
              <img src="./img/3.png" alt="">
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="right"></div>
    </div>
  </section>
</template>

<script>
  import 'swiper/dist/css/swiper.css'; // vue-awesome-swiper的样式表
  import {swiper, swiperSlide} from 'vue-awesome-swiper';

  export default {
    data() {
      return {
        swiperOption: { // vue-awesome-swiper所有参数都写这里，所有的参数同 swiper 官方 api 参数
          scrollbar: {
            el: '.swiper-scrollbar'
          },
          speed: 300, // 划动时的切换速度，默认300毫秒
          watchSlidesProgress: true,
          loop: true,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
          },
          pagination: {
            el: '.swiper-pagination'
          },
          on: {
            progress: function (progress) {
              // that.setSwiperProgress(progress);
            },
            slideChange: function () {
              // that.setSwiperActiveIndex(this.activeIndex);
            }
          }
        }
      };
    },
    components: {
      swiper, swiperSlide
    }
  };
</script>

<style scoped lang="scss">
  .banner-wrapper {
    .right {
      display: none;
    }
    .left {
      .my-swiper {
        .my-slide {
          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>
