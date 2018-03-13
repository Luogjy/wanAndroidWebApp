<template>
  <section class="wrapper">
    <toast :show-option="toastOption"/>

    <div class="search-wrapper">
      <img class="back" src="../../common/img/right.png" @click="hideSearchBar"/>
      <input class="box" v-model="theKey" placeholder="搜索关键词以空格形式隔开"/>
      <img class="search" src="../../common/img/search.png" @click="toSearchKey"/>
    </div>

    <div ref="content" class="content">
      <div class="hot-key-wrapper">
        <h1>大家都在搜</h1>
        <ul>
          <li :key="index" v-for="(item,index) in hotKeys" @click="selectKey(item.name)">{{item.name}}</li>
        </ul>
      </div>

      <div class="history-key-wrapper">
        <h1>历史搜索</h1>
        <img src="../../common/img/clear.png" alt="" @click="clearHistory">
        <ul>
          <li :key="index" v-for="(item,index) in historyKeys" @click="selectKey(item)">{{item}}</li>
        </ul>
      </div>

      <div class="list">
        <item-article :item="item" :key="index" v-for="(item,index) in articles"/>
      </div>
    </div>

  </section>
</template>

<script>
  import {getHotKey, getHistoryKeys, saveSearchKey, clearHistoryKey, searchByKey} from './js/search';
  import {baseFunction} from '../../common/js/mixin';
  import ItemArticle from '../../common/component/ItemArticle';

  export default {
    mixins: [baseFunction],
    data() {
      return {
        hotKeys: [],
        historyKeys: [],
        theKey: '',
        articles: []
      };
    },
    activated() {
      getHotKey().then((res) => {
        if (res.errorCode >= 0) {
          this.hotKeys = res.data;
        }
      });
      this.historyKeys = getHistoryKeys();
    },
    mounted() {
      console.log(this.$refs.content.getBoundingClientRect().top);
      this.initToastTop(this.$refs.content.getBoundingClientRect().top);
    },
    methods: {
      hideSearchBar() {
        this.$router.back();
      },
      clearHistory() {
        this.historyKeys = clearHistoryKey();
      },
      _searchByKey() {
        if (this.nextPage > this.pageCount) {
          this.showToast({text: '已经到底了'});
          return;
        }
        this.isGettingList = true;
        this.addLoading(1);
        this.historyKeys = saveSearchKey(this.theKey);
        searchByKey(this.theKey, this.nextPage).then((res) => {
          if (res.errorCode >= 0) {
            if (this.isRefresh) {
              window.scrollTo(0, 0); // 页面滚回顶部
              this.articles = [];
            }
            this.articles = this.articles.concat(res.data.datas);
            this.pageCount = res.data.pageCount;
            this.nextPage++;
            this.showToast({text: this.articles.length ? '为你找到了这些~' : '没有数据 ╮(╯▽╰)╭'}); // 使用Toast组件【4】
          }
          this.isGettingList = false;
          this.addLoading(-1);
          this.setRefresh(false);
        });
      },
      toSearchKey() {
        if (this.theKey) {
          this.isRefresh = true;
          this.initNextPage();
          this.initPageCount();
          this._searchByKey();
        }
      },
      selectKey(item) {
        this.theKey = item;
        this.toSearchKey(item);
      },
      _touchBottom(newValue, oldValue) {
        if (newValue && this.pageActivated && !this.isGettingList) { // 触底加载更多
          this.isRefresh = false;
          this._searchByKey();
        }
      },
      _clickRefreshButton(newValue, oldValue) {
      }
    },
    components: {
      ItemArticle
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/css/constant";

  $titleHeight: 30px;
  $itemHeight: 20px;
  @mixin title {
    padding-top: 5px;
    height: $titleHeight;
    line-height: $titleHeight;
    text-align: center;
  }

  @mixin common-ul {
    /*box-sizing: border-box;*/
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    min-height: $itemHeight;
    max-height: 79px;
    color: $bgColor;
    font-size: $fontSize+2;
    overflow: scroll;
    justify-content: center;
  }

  @mixin common-li {
    box-sizing: border-box;
    height: $itemHeight;
    line-height: $itemHeight;
    padding-left: 5px;
    padding-right: 5px;
    text-align: center;
    margin: 3px 3px;
  }

  @mixin common-key-wrapper {
    box-sizing: border-box;
    width: 100%;
    position: relative;
    background: #ffffff;
  }

  @mixin top-bottom-line {
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      background: $bgColor;
      top: 0;
      transform: scaleY(0.5);
    }
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      background: $bgColor;
      bottom: 0;
      transform: scaleY(0.5);
    }
  }

  .wrapper {
    margin-top: -$headHeight;
    box-sizing: border-box;
    width: 100%;
    position: relative;
    z-index: 2;

    .search-wrapper {
      position: fixed;
      z-index: 3;
      display: flex;
      flex-direction: row;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      background: $bgColor;
      height: $headHeight;
      line-height: $headHeight;
      font-size: $fontSize;
      .back {
        width: 20px;
        height: 20px;
        padding: 0 3px;
      }
      .search {
        width: 18px;
        height: 18px;
        padding: 0 5px;
      }
      .box {
        box-sizing: border-box;
        height: 20px;
        flex-grow: 1;
        border: none;
        padding-left: 5px;
        padding-right: 5px;
      }
    }
    .content {
      position: absolute;
      top: $headHeight;
      padding-top: 5px;
      .hot-key-wrapper {
        @include common-key-wrapper;
        h1 {
          @include title;
        }
        padding-bottom: 5px;
        ul {
          @include common-ul;
          li {
            @include common-li;
          }
        }
        @include top-bottom-line;
      }
      .history-key-wrapper {
        @include common-key-wrapper;
        margin-top: 5px;
        h1 {
          @include title;
        }
        padding-bottom: 5px;
        img {
          width: 20px;
          position: absolute;
          right: 50px;
          top: 9px;
        }
        ul {
          @include common-ul;
          li {
            @include common-li;
          }
        }
        @include top-bottom-line;
      }
      .list {
        background: #F5F5F5;
      }
    }

  }

</style>
