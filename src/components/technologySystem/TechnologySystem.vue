<template>
  <section class="wrapper">
    <div class="chapter-wrapper">
      <span class="one-chapter">{{selectedChapter.name}}</span>
      <img src="../../common/img/right_blue.png" alt="">
      <span class="two-chapter">{{selectedChapter.children.length?selectedChapter.children[0].name:''}}</span>
    </div>

    <div class="article-wrapper">
      <item-article :can-open-chapter="false"/>
    </div>

  </section>
</template>

<script>
  import ItemArticle from '../../common/component/ItemArticle';
  import {getTechnologySystem} from './js/technologySystem';
  export default {
    data() {
      return {
        // 体系结构列表数据
        systems: [],
        // 被选择的体系以及其子级
        selectedChapter: {
          'children': [
            {
              'children': [],
              'courseId': 13,
              'id': 60,
              'name': 'Android Studio相关',
              'order': 1000,
              'parentChapterId': 150,
              'visible': 1
            },
            {
              'children': [],
              'courseId': 13,
              'id': 169,
              'name': 'gradle',
              'order': 1001,
              'parentChapterId': 150,
              'visible': 1
            },
            {
              'children': [],
              'courseId': 13,
              'id': 269,
              'name': '官方发布',
              'order': 1002,
              'parentChapterId': 150,
              'visible': 1
            }
          ],
          'courseId': 13,
          'id': 150,
          'name': '开发环境',
          'order': 1,
          'parentChapterId': 0,
          'visible': 1
        }
      };
    },
    created() {
      this._getTechnologySystem();
    },
    methods: {
      _getTechnologySystem() {
        getTechnologySystem().then((res) => {
          if (res.errorCode >= 0) {
            this.systems = res.data;
            console.log(this.systems);
          }
        });
      }
    },
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
