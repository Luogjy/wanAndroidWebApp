<template>
  <section>
    <!--一般状态-->
    <div v-show="!showSearch" class="default-wrapper">
      <span class="user-wrapper">
        <span class="login">登录</span>|<span class="register">注册</span>
        <span class="user">luogjy</span>
      </span>
      <span class="logo-wrapper">
        <img class="logo" src="../img/logo.png"/>
        <span class="app-name">玩Android</span>
        <img class="refresh" src="../img/refresh.png" @click="refresh">
      </span>
      <span class="right-wrapper">
        <span class="discover">发现</span>
        <img class="search" src="../img/search.png"/>
      </span>
    </div>

    <!--搜索状态-->
    <div v-show="showSearch" class="search-wrapper">
      <img class="back" src="../img/right.png"/>
      <input class="box" ref="query" v-model="query" placeholder="搜索关键词以空格形式隔开"/>
      <img class="search" src="../img/search.png"/>
    </div>
  </section>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    props: {
      showSearch: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        query: ''
      };
    },
    methods: {
      refresh() {
        this.setRefresh(true);
      },
      ...mapMutations({
        setRefresh: 'REFRESH'
      })
    }
  };
</script>

<style scoped lang="scss">
  @import "../css/constant";

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

  .default-wrapper {
    box-sizing: border-box;
    width: 100%;
    background: $bgColor;
    height: $headHeight;
    line-height: $headHeight;
    color: #ffffff;
    font-size: $fontSize;
    position: relative;
    .user-wrapper {
      float: left;
      margin-left: 8px;
      .login {
        margin-right: 10px;
      }
      .register {
        margin-left: 10px;
      }
      .user {
        display: none;
      }
      .box {

      }
    }
    .right-wrapper {
      float: right;
      margin-right: 8px;
      .search {
        float: right;
        margin-top: 5px;
        width: 18px;
        margin-left: 16px;
      }
    }

    .logo-wrapper {
      display: inline-block;
      width: 98px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -42px;
      margin-top: -($headHeight/2);
      .logo {
        float: left;
        margin-top: 7px;
        width: 20px;
      }
      .refresh {
        float: right;
        margin-top: 7px;
        width: 16px;
      }
      .app-name {
      }
    }
  }

</style>
