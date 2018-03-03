<template>
  <section class="wrapper">
    <div class="chapter-wrapper">
      <span class="one-chapter">一级分类</span>
      <img src="../../common/img/right_blue.png" alt="">
      <span class="two-chapter">二级分类</span>
    </div>

    <div class="article-wrapper">
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
      <item-article :can-open-chapter="false"/>
    </div>

  </section>
</template>

<script>
  import ItemArticle from '../../common/component/ItemArticle';

  export default {
    components: {
      ItemArticle
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/css/constant";

  $chapterWrapperHeight: 30px;
  .wrapper {
    position: relative;
    .chapter-wrapper {
      position: fixed;
      top: $headHeight;
      width: 100%;
      height: $chapterWrapperHeight;
      background: #ffffff;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      z-index: 1;

      &:after {
        content: "";
        position: absolute;
        top: $chapterWrapperHeight;
        background: $bgColor;
        width: 100%;
        height: 1px;
        transform: scaleY(0.5);
        transform-origin: 0 0;
      }

      .one-chapter,
      .two-chapter {
        width: 40%;
        box-sizing: border-box;
        height: $chapterWrapperHeight;
        line-height: $chapterWrapperHeight;
        padding-left: 10px;
        flex-grow: 1;
        font-size: 12px;
        color: $bgColor;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .two-chapter {
        padding-left: 5px;
      }
      img {
        width: 16px;
      }
    }
    .article-wrapper {
      position: absolute;
      width: 100%;
      top: $chapterWrapperHeight;
    }
  }
</style>
