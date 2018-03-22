<template>
  <div id="app">
    <my-header class="my-header" @discover="showDiscoverDialog"/>
    <discover :show-discover="isShowDiscoverDialog" @hideDiscover="hideDiscoverDialog" @clickNav="clickNav"
              @clickTool="clickTool" @clickWebsite="clickWebsite" @clickContactUs="clickContactUs"/>
    <article>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </article>
    <nav-bar class="nav-bar" :class="showNavBar"/>
    <flow-dialog :title="flowDialogTitle" :items="flowItems" :auto-hide="autoHideFlowDialog"
                 :show-dialog="showFlowDialog" @hideDialog="hideFlowDialogEvent" @userHideDialog="userHideDialogEvent"
                 @selectedItem="selectedItemByFlowDialog"/>

  </div>
</template>

<script>
  import MyHeader from './common/component/MyHeader';
  import NavBar from './common/component/NavBar';
  import Discover from './common/component/Discover';
  import {mapMutations, mapGetters} from 'vuex';
  import {appHeadFunction} from './common/js/mixin';

  export default {
    mixins: [appHeadFunction],
    data() {
      return {
        preScrollTop: 0,
        toShowNavBar: true,
        isShowDiscoverDialog: false,
        touchStartY: 0,
        timeout: null,
        // 是否触发了滚动事件
        isScrollEvent: false
      };
    },
    computed: {
      showNavBar() {
        return this.toShowNavBar ? 'nav-bar-enter' : 'nav-bar-exit';
      },
      ...mapGetters(['pageScrollTop', 'isScrollByRecord'])
    },
    mounted() {
      this.$nextTick(function () {
        window.addEventListener('scroll', this.onScroll);
        window.addEventListener('touchstart', this.onTouchStart);
        window.addEventListener('touchmove', this.onTouchMove);
      });
    },
    methods: {
      onScroll() {
        // 记录每个页面滚动高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.recordPageScrollTop(scrollTop);

        this.isScrollEvent = true;
        this.touchBottomListener(); // 触底监听
        this.showHideNavBarByScrollEvent(scrollTop); // 导航栏的交互
      },
      onTouchStart(e) {
        this.isScrollEvent = false;
        this.touchStartY = e.touches[0].pageY;
      },
      onTouchMove(e) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          if (!this.isScrollEvent) {
            // 有时候内容太少页面没有滚动的，所以用触摸去控制导航栏，如果只用触摸事件去控制的话抖动太厉害太容易导致导航栏被频繁控制
            this.toShowNavBar = this.touchStartY < e.touches[0].pageY;
          }
        }, 20);
      },
      showHideNavBarByScrollEvent(scrollTop) {
        if (this.isScrollByRecord) {
          this.setIsScrollByRecord(false);
          return;
        }

        // 有时候内容太少页面没有滚动的，所以用触摸去控制导航栏，如果只用触摸事件去控制的话抖动太厉害太容易导致导航栏被频繁控制
        this.toShowNavBar = this.preScrollTop > scrollTop;

        this.preScrollTop = scrollTop;
      },
      // 记录页面的滚动高度
      recordPageScrollTop(scrollTop) {
        let obj = Object.assign({}, this.pageScrollTop);
        if (this.$route.path === '/home') {
          obj.home = scrollTop;
          this.setPageScrollTop(obj);
        }
        if (this.$route.path === '/technologySystem') {
          obj.technologySystem = scrollTop;
          this.setPageScrollTop(obj);
        }
        if (this.$route.path === '/project') {
          obj.project = scrollTop;
          this.setPageScrollTop(obj);
        }
        if (this.$route.path === '/search') {
          obj.search = scrollTop;
          this.setPageScrollTop(obj);
        }
      },
      touchBottomListener() {
        if (window.pageYOffset + window.innerHeight + 10 /* 加10避免由于小数导致永远大不过右边 */ >= document.documentElement.scrollHeight) { // 滚动高度 + 可视高度 >= 文档高度
          this.setTouchBottom(true);
        } else {
          this.setTouchBottom(false);
        }
      },
      showDiscoverDialog() {
        this.isShowDiscoverDialog = true;
      },
      hideDiscoverDialog() {
        this.isShowDiscoverDialog = false;
      },
      ...mapMutations({
        setTouchBottom: 'TOUCH_BOTTOM',
        setPageScrollTop: 'PAGE_SCROLL_TOP',
        setIsScrollByRecord: 'IS_SCROLL_BY_RECORD'
      })
    },
    components: {
      MyHeader, NavBar, Discover
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
