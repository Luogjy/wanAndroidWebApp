<template>
  <section class="wrapper">
    <div class="hot-key-wrapper">
      <h1>大家都在搜</h1>
      <ul>
        <li>哈哈哈</li>
        <li>哈哈哈</li>
        <li>哈哈哈</li>
        <li>哈哈哈</li>
        <li>哈哈哈</li>
        <li>哈哈哈</li>
        <li>哈哈哈</li>
        <li>哈哈哈</li>
      </ul>
    </div>

    <div class="history-wrapper">
      <h1>历史搜索</h1>
      <ul>
        <li>哈哈哈</li>
        <li>哈哈哈</li>
        <li>哈哈哈</li>
        <li>哈哈哈</li>
        <li>哈哈哈</li>
        <li>哈哈哈</li>
        <li>哈哈哈</li>
        <li>哈哈哈</li>
      </ul>
    </div>
  </section>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    activated() {
      this.setSearchPageIsShowing(true);
    },
    deactivated() {
      this.setSearchPageIsShowing(false);
    },
    methods: {
      ...mapMutations({
        setSearchPageIsShowing: 'SEARCH_PAGE_IS_SHOWING'
      })
    },
    name: 'search'
  };
</script>

<style scoped lang="scss">
  @import "../../common/css/constant";

  $titleHeight: 30px;
  $itemHeight: 26px;
  .wrapper {
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    height: 100%;
    top: $headHeight;
    background: #ffffff;

    .hot-key-wrapper {
      box-sizing: border-box;
      width: 100%;
      h1 {
        height: $titleHeight;
        line-height: $titleHeight;
        text-align: center;
      }
      ul {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        min-height: $itemHeight;
        max-height: 360px;
        color: $bgColor;
        font-size: $fontSize;
        overflow: scroll;
        li {
          box-sizing: border-box;
          height: $itemHeight;
          line-height: $itemHeight;
          padding-left: 5px;
          padding-right: 5px;
          text-align: center;
          margin: 3px 3px;
        }
      }
    }
    .history-wrapper {
      h1 {

      }
      ul {
        li {

        }
      }
    }
  }

</style>
