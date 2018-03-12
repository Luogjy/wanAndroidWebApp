<template>
  <section class="wrapper">
    <div class="header">
      <img class="back" src="../../common/img/right.png" @click.stop="back"/>
      <span class="title">{{title}}</span>
    </div>
    <section class="form">
      <form>
        <div class="input-wrapper">
          <div>
            <input type="text" v-model="userName" placeholder="请输入用户名">
          </div>
          <div>
            <input type="password" v-model="password1" placeholder="请输入密码">
          </div>
          <div>
            <input type="password" v-model="password2" placeholder="请输入确认密码">
          </div>
        </div>
        <span v-show="!isLogin">去登录</span>
        <span v-show="isLogin">去注册</span>
        <button v-show="isLogin" class="submit">登录</button>
        <button v-show="!isLogin" class="submit">注册</button>
      </form>
    </section>
  </section>

</template>

<script>

  export default {
    data() {
      return {
        userName: '',
        password1: '',
        password2: ''
      };
    },
    props: {
      isLogin: {
        type: Boolean,
        default: true
      },
      showDialog: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      back() {
        this.$router.back();
      }
    },
    watch: {
      showDialog(newValue, oldValue) {
        if (newValue) {

        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/css/constant";

  $inputHeight: 30px;
  .wrapper {
    margin-top: -$headHeight;
    box-sizing: border-box;
    width: 100%;
    z-index: 3;
    font-size: $fontSize;
    .header {
      position: absolute;
      z-index: 2;
      box-sizing: border-box;
      width: 100%;
      background: $bgColor;
      height: $headHeight;
      line-height: $headHeight;
      text-align: center;
      .back {
        position: absolute;
        width: 18px;
        height: 18px;
        left: 5px;
        top: 5px;
      }
      .title {
        height: $headHeight;
        line-height: $headHeight;
        color: #ffffff;
        text-align: center;
      }
    }
    .form {
      position: absolute;
      width: 100%;
      top: $headHeight;
      bottom: 0;
      background: #f5f5f5;
      z-index: 2;
      padding-top: 10px;
      .input-wrapper {
        box-sizing: border-box;
        padding-left: 30px;
        padding-right: 30px;
        display: flex;
        flex-direction: column;
        font-size: $fontSize;
        div {
          box-sizing: border-box;
          height: $inputHeight;
          position: relative;
          margin-top: 10px;

          input {
            box-sizing: border-box;
            padding-left: 5px;
            border: none;
            height: $inputHeight - 1;
            line-height: $inputHeight - 1;
            width: 99.5%;
            position: relative;
            top: 1px;
            left: 1px;
            z-index: 2;

            &:-moz-placeholder {
              color: #DADADA;
            }
            &::-moz-placeholder {
              color: #DADADA;
            }
            &:-ms-input-placeholder {
              color: #DADADA;
            }
            &::-webkit-input-placeholder {
              color: #DADADA;
            }
          }
          &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 200%;
            height: 200%;
            border: 1px solid $bgColor;
            transform: scale(0.5, 0.5);
            transform-origin: left top;
          }

        }

      }

      span {
        position: absolute;
        top: 140px;
        right: 30px;
        color: $bgColor;
      }
      button {
        position: absolute;
        width: 70%;
        height: 32px;
        background: $bgColor;
        top: 170px;
        left: 50%;
        color: #ffffff;
        border: 1px solid $bgColor;
        border-radius: 4px;
        transform: translateX(-50%);
      }
    }

  }

</style>
