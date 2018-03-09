<template>
  <section class="wrapper">
    <div class="search-wrapper">
      <img class="back" src="../../common/img/right.png" @click="hideSearchBar"/>
      <input class="box" v-model="theKey" placeholder="搜索关键词以空格形式隔开"/>
      <img class="search" src="../../common/img/search.png" @click="toSearchKey"/>
    </div>

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
  </section>
</template>

<script>
  import {getHotKey, getHistoryKeys, saveSearchKey, clearHistoryKey} from './js/search';

  export default {
    data() {
      return {
        hotKeys: [],
        historyKeys: [],
        theKey: ''
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
    methods: {
      hideSearchBar() {
        this.$router.back();
      },
      clearHistory() {
        this.historyKeys = clearHistoryKey();
      },
      toSearchKey() {
        if (this.theKey) {
          this.historyKeys = saveSearchKey(this.theKey);
        }
      },
      selectKey(item) {
        this.theKey = item;
        this.toSearchKey(item);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/css/constant";

  $titleHeight: 30px;
  $itemHeight: 20px;
  @mixin title {
    box-sizing: border-box;
    height: $titleHeight;
    line-height: $titleHeight;
    text-align: center;
    margin-top: 5px;
  }

  @mixin common-ul {
    box-sizing: border-box;
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
  }

  .wrapper {
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: #ffffff;
    z-index: 2;

    .search-wrapper {
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
    .history-key-wrapper {
      @include common-key-wrapper;
      h1 {
        @include title;
      }
      img {
        width: 20px;
        position: absolute;
        right: 50px;
        top: 4px;
      }
      ul {
        @include common-ul;
        li {
          @include common-li;
        }
      }
    }
  }

</style>
