<template>
  <section>
    <div class="default-wrapper">
      <span class="user-wrapper">
        <span @click="login" class="login">登录</span>|<span class="register">注册</span>
        <span class="user">luogjy</span>
      </span>
      <span class="logo-wrapper">
        <img class="logo" src="../img/logo.png"/>
        <span class="app-name">玩Android</span>
        <img class="refresh" :class="rotating?'loading':''" src="../img/refresh.png" @click="refresh">
      </span>
      <span class="right-wrapper">
        <span @click="discover" class="discover">发现</span>
        <img class="search" src="../img/search.png" @click="showSearchPage"/>
      </span>
    </div>
  </section>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        // 刷新按钮转动
        rotating: false
      };
    },
    computed: {
      ...mapGetters(['loading'])
    },
    methods: {
      refresh() {
        this.setRefresh(true);
      },
      discover() {
        this.$emit('discover');
      },
      showSearchPage() {
        this.$router.push('/search');
      },
      login() {
        this.$emit('login');
      },
      ...mapMutations({
        setRefresh: 'REFRESH'
      })
    },
    watch: {
      loading(newValue, oldValue) {
        this.rotating = !!newValue;
      },
      searchPageIsShowing(newVal, oldVal) {
        if (!newVal) {
          this.showSearch_ = false;
        }
      }
    },
    deactivated() {
      this.showSearch_ = false;
    }
  };
</script>

<style scoped lang="scss">
  @import "../css/constant";

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

        animation-name: xiaodan;
        animation-duration: 1000ms;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-fill-mode: forwards;
        animation-play-state: paused;
      }
      .loading {
        animation-play-state: running;
      }
      @keyframes xiaodan {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .app-name {
      }
    }
  }

</style>
