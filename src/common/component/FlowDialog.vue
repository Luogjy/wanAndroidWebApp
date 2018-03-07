<template>
  <div class="wrapper">
    <div class="dialog" :class="showDialog?'dialog-enter':'dialog-exit'">
      <div class="title">
        <span>{{title}}</span>
        <div @click.stop="userHideDialog">
          <img src="../img/close.png" alt="">
        </div>
      </div>
      <ul class="item-wrapper">
        <li @click.stop="selectedItem({item,index})" :key="index" v-for="(item,index) in items"
            :class="items.selectedPosition===index?'selected':''">
          {{item.name}}
        </li>
      </ul>
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
      items: {
        type: Array,
        default: function () {
          return [{
            id: '',
            name: ''
          }];
        }
      },
      // 选择条目以后自动隐藏对话框
      autoHide: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      // 用户主动隐藏对话框
      userHideDialog() {
        this.$emit('userHideDialog', {
          'item': this.items[this.items.selectedPosition],
          'index': this.items.selectedPosition
        });
      },
      selectedItem({item, index}) {
        if (this.autoHide) {
          this.$emit('hideDialog');
        }
        this.$emit('selectedItem', {item, index});
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
      .item-wrapper {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        min-height: 80px;
        max-height: 360px;
        color: $bgColor;
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
        .selected {
          border: 1px solid $bgColor;
          border-radius: 2px;
        }
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
