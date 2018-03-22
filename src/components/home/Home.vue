<template>
  <section class="wrapper">
    <!--使用Toast组件【2】-->
    <toast :show-option="toastOption"/>
    <div ref="bannerWrapper" class="banner-wrapper">
      <slide v-if="banners.length">
        <div :key="index" v-for="(item,index) in banners">
          <a :href="item.url">
            <img :src="item.imagePath" alt="">
          </a>
        </div>
      </slide>
    </div>
    <div>
      <item-article :item="item" :key="index" v-for="(item,index) in articles"/>
    </div>
  </section>
</template>

<script>
  import ItemArticle from '../../common/component/ItemArticle';
  import {getArticleList, getBannerList} from './js/home';
  import {baseFunction} from '../../common/js/mixin'; // 【使用mixins】【2】 引入mixin
  import Slide from '../../common/component/Slide';

  export default {
    mixins: [baseFunction], // 【使用mixins】【3】 使用mixin // 使用Toast组件【1】
    data() {
      return {
        articles: [],
        banners: []
      };
    },
    created() {
      this._getPageData();
    },
    mounted() {
      // 使用Toast组件【3】
      this.initToastTop(this.$refs.bannerWrapper.getBoundingClientRect().top);
    },
    methods: {
      // 获取新闻列表
      _getArticleList() {
        if (this.nextPage > this.pageCount) {
          this.showToast({text: '已经到底了'});
          return;
        }
        this.isGettingList = true;
        this.addLoading(1);
        getArticleList(this.nextPage).then((res) => {
          if (res.errorCode >= 0) { // 成功
            if (this.isRefresh) {
              window.scrollTo(0, 0); // 页面滚回顶部
              this.articles = [];
            }
            this.articles = this.articles.concat(res.data.datas);
            this.pageCount = res.data.pageCount;
            this.nextPage++;
            this.showToast({text: this.articles.length ? '获取文章成功' : '没有数据 ╮(╯▽╰)╭'}); // 使用Toast组件【4】
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
          this.initPageCount();
          this._getPageData();
        }
      }
    },
    components: {
      ItemArticle, Slide
    }
  };
</script>

<style scoped lang="scss">
  .wrapper {
    .banner-wrapper {
      a {
        text-decoration: none;
        img {
          display: block;
          width: 100%;
          min-height: 177px;
        }
      }
    }
  }

</style>
