<template>
  <section class="wrapper">
    <div class="banner-wrapper">
      <div class="left">
        <swiper :options="swiperOption" class="my-swiper">
          <swiper-slide class="my-slide" :key="index" v-for="(item,index) in banners">
            <a :href="item.url">
              <img :src="item.imagePath" alt="">
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
  import {getArticleList, getBannerList} from './js/home';
  import {baseFunction} from '../../common/js/mixin'; // 【使用mixins】【2】 引入mixin

  export default {
    mixins: [baseFunction], // 【使用mixins】【3】 使用mixin
    data() {
      return {
        articles: [],
        banners: [],
        // vue-awesome-swiper所有参数都写这里，所有的参数同 swiper 官方 api 参数
        swiperOption: {
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
    created() {
      this._getPageData();
    },
    methods: {
      // 获取新闻列表
      _getArticleList() {
        this.isGettingList = true;
        this.addLoading(1);
        getArticleList(this.nextPage).then((res) => {
          if (res.errorCode >= 0) { // 成功
            if (this.isRefresh) {
              this.articles = [];
            }
            this.articles = this.articles.concat(res.data.datas);
            this.nextPage++;
          }
          this.isGettingList = false;
          this.addLoading(-1);
          this.setRefresh(false);
        });
      },
      _getBannerList() {
        this.addLoading(1);
        getBannerList().then((res) => {
          if (res.errorCode >= 0) {
            this.banners = res.data;
          }
          this.addLoading(-1);
        });
      },
      // 获取整页数据
      _getPageData() {
        this._getArticleList();
        this._getBannerList();
      },
      _touchBottom(newValue, oldValue) {
        if (newValue && this.pageActivated && !this.isGettingList) { // 触底加载更多
          this.isRefresh = false;
          this._getArticleList();
        }
      },
      _clickRefreshButton(newValue, oldValue) {
        if (newValue && this.pageActivated && !this.isGettingList) { // 刷新页面数据
          this.isRefresh = true;
          this.initNextPage();
          this._getPageData();
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
              min-height: 177px;
            }
          }
        }
      }
    }
  }

</style>
