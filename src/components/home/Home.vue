<template>
  <section class="wrapper">
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
    <div>
      <div>
        <item-article :item="item" :key="index" v-for="(item,index) in articles"/>
      </div>
    </div>
  </section>
</template>

<script>
  import 'swiper/dist/css/swiper.css'; // vue-awesome-swiper的样式表
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import ItemArticle from '../../common/component/ItemArticle';
  import {getArticleList} from './js/home';
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        articles: [],
        nextPage: 1,
        pageActivated: false, // 页面激活
        isGettingArticleList: false, // 正在获取文章列表
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
    computed: {
      ...mapGetters(['touchBottom'])
    },
    created() {
      this._getArticleList();
    },
    activated() {
      this.pageActivated = true;
    },
    deactivated() {
      this.pageActivated = false;
    },
    methods: {
      // 获取新闻列表
      _getArticleList() {
        this.isGettingArticleList = true;
        getArticleList(this.nextPage).then((res) => {
          if (res.errorCode >= 0) { // 成功
            this.articles = this.articles.concat(res.data.datas);
            // this.articles.push(res.data.datas);
            this.nextPage++;
          }
          this.isGettingArticleList = false;
        });
      }
    },
    watch: {
      touchBottom(newValue, oldValue) {
        if (newValue && this.pageActivated && !this.isGettingArticleList) { // 触底加载更多
          this._getArticleList();
        }
      }
    },
    components: {
      swiper, swiperSlide, ItemArticle
    }
  };
</script>

<style scoped lang="scss">
  .wrapper {
    width: 100%;
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
  }

</style>
