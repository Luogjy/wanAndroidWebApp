<template>
  <div class="wrapper">
    <div @click.stop="hideDiscover" class="mask-top" :class="showDiscover?'mask-top-enter':'mask-top-exit'"></div>
    <ul @click.stop="hideDiscover" class="item-wrapper"
        :class="showDiscover?'item-wrapper-enter':'item-wrapper-exit'">
      <li @click="clickNav">导航</li>
      <li @click="clickTool">工具</li>
      <li @click="clickWebsite">常用网站</li>
      <li @click="clickOpenApi">本站开放API</li>
      <li @click="clickDownApk">本站Apk下载</li>
      <li @click="clickHistory">本站历史</li>
      <li @click="clickContactUs">联系我们</li>
      <li class="text">交流群：591683946</li>
    </ul>
    <div @click.stop="hideDiscover" class="mask-bottom"
         :class="showDiscover?'mask-bottom-enter':'mask-bottom-exit'">
      <span class="tip">点击关闭列表</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showDiscover: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hideDiscover() {
        this.$emit('hideDiscover');
      },
      clickNav() {
        this.$emit('clickNav');
      },
      clickTool() {
        this.$emit('clickTool');
      },
      clickWebsite() {
        this.$emit('clickWebsite');
      },
      clickOpenApi() {
        window.open('http://www.wanandroid.com/blog/show/2');
      },
      clickDownApk() {
        window.open('http://www.wanandroid.com/blog/show/2029');
      },
      clickHistory() {
        window.open('http://www.wanandroid.com/blog/show/2042');
      },
      clickContactUs() {
        this.$emit('clickContactUs');
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../css/constant";

  $itemHeight: 30px;

  .wrapper {
    width: 100%;
    .mask-top {
      width: 100%;
      height: $headHeight;
      position: fixed;
      top: 0;
      z-index: 99;
    }
    .mask-top-enter {
      display: block;
    }
    .mask-top-exit {
      display: none;
    }
    .mask-bottom {
      width: 100%;
      height: 150%;
      position: fixed;
      top: $headHeight;
      background: black;
      opacity: .6;
      z-index: 99;
      .tip {
        position: fixed;
        bottom: 150px;
        left: 50%;
        transform: translateX(-50%);
        box-sizing: border-box;
        color: #ffffff;
      }
    }
    .mask-bottom-enter {
      display: block;
    }
    .mask-bottom-exit {
      display: none;
    }
    .item-wrapper {
      position: fixed;
      top: $headHeight;
      width: 100%;
      font-size: $fontSize;
      color: $bgColor;
      background: #ffffff;
      z-index: 100;
      height: 0;
      overflow: hidden;
      li {
        box-sizing: border-box;
        height: $itemHeight;
        line-height: $itemHeight;
        padding-left: 20px;
      }
      .text {
        color: #000000;
      }
    }

    .item-wrapper-enter {
      transition-property: height, opacity;
      transition-duration: 300ms;
      height: $itemHeight*8;
      opacity: 1;
      transform: translate3d(0, 0, 0); /*开启硬件加速*/
      backface-visibility: hidden; /*元素旋转时隐藏背面*/
      transform-style: preserve-3d; /*保留3D空间*/
    }

    .item-wrapper-exit {
      transition-property: height, opacity;
      transition-duration: 300ms;
      height: 0;
      opacity: 0;
      transform: translate3d(0, 0, 0); /*开启硬件加速*/
      backface-visibility: hidden; /*元素旋转时隐藏背面*/
      transform-style: preserve-3d; /*保留3D空间*/
    }
  }

</style>
