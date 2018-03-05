<template>
  <div ref="toast" v-show="toastText" class="toast">
    <div>
      <div class="toast-bg"></div>
      <span>{{toastText}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // 通过改变此属性显示Toast
      showOption: {
        type: Object,
        default: function () {
          return {
            text: '', // 必须有内容，否则不显示
            top: 0
          };
        }
      }
    },
    data() {
      return {
        timeout: null,
        toastText: ''
      };
    },
    watch: {
      showOption(newValue, oldValue) {
        this.$refs.toast.style.top = newValue.top + 'px';
        this.toastText = newValue.text;
        this.showToast();
      }
    },
    methods: {
      showToast() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.toastText = '';
        }, 1500);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../css/constant";

  .toast {
    width: 100%;
    height: $toastHeight;
    position: fixed;
    top: 0;
    z-index: 2;
    div {
      width: 100%;
      height: $toastHeight;
      position: relative;
      .toast-bg {
        width: 100%;
        height: 100%;
        background: rgba(102, 164, 255, 0.5);
      }
      span {
        width: 100%;
        height: $toastHeight;
        line-height: $toastHeight;
        position: absolute;
        display: inline-block;
        text-align: center;
        font-size: $fontSize;
        top: 0;
        color: #000000;
      }
    }
  }
</style>
