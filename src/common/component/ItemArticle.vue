<template>
  <section class="wrapper">
    <a :href="item.link">
      <div class="content">
        {{item.chapterName}}
        <img v-show="!item.collect" class="collect" src="../img/collect.png">
        <img v-show="item.collect" class="collect" src="../img/collected.png">
        <span class="title" v-html="item.title">{{item.title}}</span>
        <span class="chapter">分类：</span>
        <span class="chapter-name" :class="!canOpenChapter?'cannot-open-chapter':''" @click.prevent="toChapterPage">{{item.chapterName}}</span>
        <span class="author">作者：</span>
        <span class="author-name" :class="!canOpenAuthor?'cannot-open-author':''" @click.prevent="toAuthorPage">{{item.author}}</span>
        <span class="date">{{item.niceDate}}</span>
      </div>
    </a>
  </section>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    props: {
      item: {
        type: Object,
        default: function () {
          return {};
        }
      },
      // 分类可以点击
      canOpenChapter: {
        type: Boolean,
        default: true
      },
      // 作者名可以点击
      canOpenAuthor: {
        type: Boolean,
        default: true
      }

    },
    methods: {
      toChapterPage() {
        if (this.canOpenChapter) {
          this.setDefaultTwoChapter({chapterId: this.item.chapterId, chapterName: this.item.chapterName});
          this.$router.push('/technologySystem');
        }
      },
      toAuthorPage() {
        if (this.canOpenAuthor) {
          this.$router.push(`/author/${this.item.author}`);
        }
      },
      ...mapMutations({
        setDefaultTwoChapter: 'DEFAULT_TWO_CHAPTER'
      })
    },
    name: 'item-article'
  };
</script>

<style scoped lang="scss">
  @import "../css/constant";

  $textColor: #767676;
  .wrapper {
    box-sizing: border-box;
    width: 100%;
    padding-left: 5px;
    padding-right: 5px;
    margin-top: 6px;
    margin-bottom: 6px;
    .content {
      height: 100px;
      font-size: 12px;
      color: $textColor;
      box-sizing: border-box;
      background: #ffffff;
      /*水平偏移、垂直偏移、模糊、扩展、颜色*/
      box-shadow: 0 1px 1px 0 #C9C9C9;
      border-top: solid #E8E8E8 1px;
      border-radius: 2px;
      position: relative;
      .collect {
        width: 18px;
        position: absolute;
        top: 8px;
        left: 8px;
      }
      .title {
        display: inline-block;
        position: absolute;
        font-size: 16px;
        left: 30px;
        right: 8px;
        top: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .chapter {
        position: absolute;
        left: 30px;
        top: 40px;
      }
      .chapter-name {
        position: absolute;
        left: 65px;
        top: 40px;
        color: $bgColor;
      }
      .cannot-open-chapter {
        color: $textColor;
      }
      .author {
        position: absolute;
        left: 30px;
        top: 60px;
      }
      .author-name {
        position: absolute;
        left: 65px;
        top: 60px;
        color: $bgColor;
      }
      .cannot-open-author {
        color: $textColor;
      }
      .date {
        float: right;
        margin-top: 80px;
        margin-right: 8px;
      }
    }

  }

</style>
<style lang="css">
  .highlight {
    color: #B30000;
  }
</style>
