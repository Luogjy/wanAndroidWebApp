<template>
  <div id="app">
    <my-header class="my-header"/>
    <article>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </article>
    <nav-bar class="nav-bar" :class="showNavBar"/>
  </div>
</template>

<script>
  import MyHeader from './common/component/MyHeader';
  import NavBar from './common/component/NavBar';
  import {mapMutations} from 'vuex';

  export default {
    data() {
      return {
        preScrollTop: 0,
        toShowNavBar: true
      };
    },
    computed: {
      showNavBar() {
        return this.toShowNavBar ? 'nav-bar-enter' : 'nav-bar-exit';
      }
    },
    mounted() {
      this.$nextTick(function () {
        window.addEventListener('scroll', this.onScroll);
      });
    },
    methods: {
      onScroll() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.touchBottomListener(); // 触底监听
        this.showHideNavBar(scrollTop); // 导航栏的交互
      },
      showHideNavBar(scrollTop) {
        this.toShowNavBar = this.preScrollTop > scrollTop;
        this.preScrollTop = scrollTop;
      },
      touchBottomListener() {
        if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight) { // 滚动高度 + 可视高度 >= 文档高度
          this.setTouchBottom(true);
        } else {
          this.setTouchBottom(false);
        }
      },
      ...mapMutations({
        setTouchBottom: 'TOUCH_BOTTOM'
      })
    },
    components: {
      MyHeader, NavBar
    }
  };
</script>

<style lang="scss" scoped>
  @import "./common/css/constant";

  $navBarBottom: 30px;

  #app {
    .my-header {
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 2;
    }
    article {
      margin-top: $headHeight;
    }
    .nav-bar {
      position: fixed;
      bottom: $navBarBottom;
      z-index: 1;
    }

    .nav-bar-exit {
      transform: translateY($navBarHeight+$navBarBottom+1);
      transition-property: transform, opacity;
      transition-duration: 300ms;
      /*多加一个属性变化会卡顿，暂时不知道为什么*/
      /*opacity: 0;*/
    }

    .nav-bar-enter {
      transform: translateY(0);
      transition-property: transform, opacity;
      transition-duration: 300ms;
      /*多加一个属性变化会卡顿，暂时不知道为什么*/
      /*opacity: 1;*/
    }

  }
</style>
