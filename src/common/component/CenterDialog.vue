<template>
  <div class="wrapper">
    <div class="dialog" :class="showDialog?'dialog-enter':'dialog-exit'">
      <div class="title">
        <span>{{title}}</span>
        <div @click.stop="userHideDialog">
          <img src="../img/close.png" alt="">
        </div>
      </div>
      <div class="content-wrapper">
        <slot/>
      </div>
    </div>

    <div @click.stop="userHideDialog" class="mask"
         :class="showDialog?'mask-enter':'mask-exit'">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showDialog: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      dialogTop: {
        type: Number,
        default: -999999
      }
    },
    methods: {
      // 用户通过点击遮罩层或关闭按钮主动隐藏对话框
      userHideDialog() {
        this.$emit('userHideDialog');
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../css/constant";

  $itemHeight: 26px;
  $titleHeight: 30px;
  $closeImgHeight: 18px;

  .wrapper {
    width: 100%;
    .dialog {
      box-sizing: border-box;
      width: 85%;
      font-size: $fontSize;
      background: #ffffff;
      border-radius: 3px;
      border: 1px solid $bgColor;

      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      z-index: 100;
      .title {
        background: $bgColor;
        height: $titleHeight;
        span {
          height: $titleHeight;
          line-height: 30px;
          padding-left: 10px;
          color: #ffffff;
        }
        div {
          box-sizing: content-box;
          width: $titleHeight;
          height: $titleHeight;
          float: right;
          img {
            width: $closeImgHeight;
            margin-top: ($titleHeight - $closeImgHeight) / 2;
            margin-left: ($titleHeight - $closeImgHeight) / 2;
          }
        }

      }
      .content-wrapper {
      }
    }
    .dialog-enter {
      display: block;
    }
    .dialog-exit {
      display: none;
    }
    .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      background: black;
      opacity: .6;
      z-index: 99;
    }
    .mask-enter {
      display: block;
    }
    .mask-exit {
      display: none;
    }

  }
</style>
