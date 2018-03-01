<template>
  <section class="wrapper">
    <div class="nav-wrapper">
      <span>首页</span>
      <span>体系</span>
      <span>项目</span>
      <span v-show="collection">收藏</span>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      collection: {
        type: Boolean,
        default: false
      }
    },
    name: 'nav-bar'
  };
</script>

<style scoped lang="scss">
  @import "../css/constant";

  .wrapper {
    box-sizing: border-box;
    position: fixed;
    bottom: 30px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    .nav-wrapper {
      display: flex;
      flex-direction: row;
      width: 200px;
      margin: 0 auto;
      border: 1px solid $bgColor;
      border-radius: 4px;
      span {
        font-size: $fontSize;
        flex-grow: 1;
        text-align: center;
      }
    }

  }
</style>
