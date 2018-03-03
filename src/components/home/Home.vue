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
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    data() {
      return {
        articles: [],
        nextPage: 1,
        // 页面激活
        pageActivated: false,
        // 正在获取文章列表
        isGettingArticleList: false,
        // 刷新文章列表
        isRefresh: false,
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
    computed: {
      ...mapGetters(['touchBottom', 'refresh'])
    },
    created() {
      this._getArticleList();
      this._getBannerList();
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
        this.addLoading(1);
        getArticleList(this.nextPage).then((res) => {
          if (res.errorCode >= 0) { // 成功
            if (this.isRefresh) {
              this.articles = [];
            }
            this.articles = this.articles.concat(res.data.datas);
            this.nextPage++;
          }
          this.isGettingArticleList = false;
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
      // 初始化数据页码
      initNextPage() {
        this.nextPage = 1;
      },
      ...mapMutations({
        // 点击了头部刷新按钮
        setRefresh: 'REFRESH',
        // 主动调起的请求任务数，计数器加1或加-1
        addLoading: 'LOADING'
      })
    },
    watch: {
      touchBottom(newValue, oldValue) {
        if (newValue && this.pageActivated && !this.isGettingArticleList) { // 触底加载更多
          this.isRefresh = false;
          this._getArticleList();
        }
      },
      refresh(newValue, olrValue) {
        if (newValue && this.pageActivated && !this.isGettingArticleList) { // 刷新数据
          this.isRefresh = true;
          this.initNextPage();
          this._getArticleList();
          this._getBannerList();
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
