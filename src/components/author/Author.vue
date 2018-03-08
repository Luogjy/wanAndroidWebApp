<template>
  <section class="wrapper">
    <toast :show-option="toastOption"/>
    <div class="name-wrapper">
      <span class="tip">作者昵称：</span>
      <span class="name">{{author}}</span>
    </div>

    <div ref="listWrapper" class="list-wrapper">
      <item-article :can-open-author="false" :item="item" :key="index" v-for="(item,index) in articles"/>
    </div>

  </section>
</template>

<script>
  import ItemArticle from '../../common/component/ItemArticle';
  import {baseFunction} from '../../common/js/mixin';
  import {getAuthorArticleList} from './js/author';

  export default {
    mixins: [baseFunction],
    data() {
      return {
        author: null,
        articles: []
      };
    },
    created() {
      this.author = this.$route.params.author;
      this._getAuthorArticleList();
    },
    mounted() {
      this.initToastTop(this.$refs.listWrapper.getBoundingClientRect().top);
    },
    methods: {
      _getAuthorArticleList() {
        if (this.nextPage > this.pageCount) {
          this.showToast({text: '已经到底了'});
          return;
        }
        this.isGettingList = true;
        this.addLoading(1);
        getAuthorArticleList(this.nextPage, this.author).then((res) => {
          if (res.errorCode >= 0) { // 成功
            if (this.isRefresh) {
              window.scrollTo(0, 0); // 页面滚回顶部
              this.articles = [];
            }
            this.articles = this.articles.concat(res.data.datas);
            this.pageCount = res.data.pageCount;
            this.nextPage++;
            this.showToast({text: this.articles.length ? '获取文章成功' : '没有数据 ╮(╯▽╰)╭'});
          }
          this.isGettingList = false;
          this.addLoading(-1);
          this.setRefresh(false);
        });
      },
      _touchBottom(newValue, oldValue) {
        if (newValue && this.pageActivated && !this.isGettingList) { // 触底加载更多
          this.isRefresh = false;
          this._getAuthorArticleList();
        }
      },
      _clickRefreshButton(newValue, oldValue) {
        if (newValue && this.pageActivated && !this.isGettingList) { // 刷新页面数据
          this.isRefresh = true;
          this.initNextPage();
          this.initPageCount();
          this._getAuthorArticleList();
        }
      }
    },
    components: {
      ItemArticle
    },
    name: 'author-page'
  };
</script>

<style scoped lang="scss">
  @import "../../common/css/constant";

  $chapterWrapperHeight: 30px;

  .wrapper {
    position: relative;
    .name-wrapper {
      position: fixed;
      top: $headHeight;
      width: 100%;
      height: $chapterWrapperHeight;
      background: #ffffff;
      box-sizing: border-box;

      display: flex;
      flex-direction: row;
      align-items: center;
      white-space: nowrap;

      z-index: 1;
      .tip,
      .name {
        box-sizing: border-box;
        display: inline-block;
        height: $chapterWrapperHeight;
        line-height: $chapterWrapperHeight;
        padding-left: 10px;
        font-size: 12px;
        color: #000000;
      }
      .name {
        flex-grow: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &:after {
        content: "";
        position: absolute;
        top: $chapterWrapperHeight;
        background: $bgColor;
        width: 100%;
        height: 1px;
        transform: scaleY(0.5);
        transform-origin: 0 0;
      }
    }
    .list-wrapper {
      position: absolute;
      width: 100%;
      top: $chapterWrapperHeight;
    }
  }
</style>
