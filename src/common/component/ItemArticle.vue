<template>
  <section class="wrapper">
    <a :href="item.link">
      <div class="content">
        <img v-show="!item.collect" class="collect" src="../img/collect.png">
        <img v-show="item.collect" class="collect" src="../img/collected.png">
        <div class="title-wrapper">
          <span v-if="item.fresh" class="fresh">新</span>
          <span class="title" v-html="item.title">{{item.title}}</span>
        </div>
        <span class="chapter">分类：</span>
        <div class="chapter-name">
          <span class="one-chapter-name" :class="!canOpenChapter?'cannot-open-chapter':''"
                @click.prevent="clickOneChapter">{{item.superChapterName}}</span>{{!item.superChapterName&&!item.chapterName?'---':'/'}}<span
          class="two-chapter-name"
          :class="!canOpenChapter?'cannot-open-chapter':''"
          @click.prevent="clickTwoChapter">{{item.chapterName}}</span>
        </div>
        <span class="author">作者：</span>
        <span class="author-name" :class="!canOpenAuthor?'cannot-open-author':''" @click.prevent="toAuthorPage">{{item.author}}</span>
        <div class="tags">
          <div class="tag-wrapper" :key="tag.url" v-for="(tag) in item.tags"
               @click.prevent="clickTag(tag)">
            <span class="tag">{{tag.name}}</span>
          </div>
        </div>
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
      clickOneChapter() {
        if (this.canOpenChapter) {
          // superChapterName是一级分类名称，superChapterId是该一级分类下第一个子类目
          this.setDefaultTwoChapter({chapterId: this.item.superChapterId, chapterName: ''});
          this.$router.push('/technologySystem');
        }
      },
      clickTwoChapter() {
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
      // 是否项目
      isProject(tag) {
        // "url": "/project/list/1?cid=333"
        return tag.name === '项目';
      },
      // 是否导航
      isNav(tag) {
        // "url": "/navi#281"
        return tag.name === '导航';
      },
      clickTag(tag) {
        if (this.isProject(tag)) {
          this.setDefaultProjectChapter({
            chapterId: tag.url.slice(tag.url.indexOf('cid=') + 4) - 0, // 减0是为了把值转化为数字
            chapterName: tag.name
          });
          this.$router.push('/project');
        }
        if (this.isNav(tag)) {
          this.setDefaultOneNavData({
            id: tag.url.slice(tag.url.indexOf('navi#') + 5) - 0,
            name: ''
          });
        }
      },
      ...mapMutations({
        setDefaultTwoChapter: 'DEFAULT_TWO_CHAPTER',
        setDefaultProjectChapter: 'DEFAULT_PROJECT_CHAPTER',
        setDefaultOneNavData: 'DEFAULT_ONE_NAV_DATA'
      })
    },
    name: 'item-article'
  };
</script>

<style scoped lang="scss">
  @import "../css/constant";

  $textColor: #767676;
  $titleFontSize: 16px;
  .wrapper {
    a {
      text-decoration: none;
      /*点击效果设置为全透明*/
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
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
      .title-wrapper {
        position: absolute;
        left: 30px;
        right: 8px;
        top: 10px;
        height: $titleFontSize;
        line-height: $titleFontSize;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .fresh {
          position: relative;
          top: -5px;
          color: red;
          font-size: 10px;
        }
        .title {
          font-size: $titleFontSize;
        }
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
        .one-chapter-name,
        .two-chapter-name {
          color: $bgColor;
        }
        .cannot-open-chapter {
          color: $textColor;
        }
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
      .tags {
        display: flex;
        flex-direction: row;
        justify-content: left;
        position: absolute;
        left: 30px;
        top: 80px;
        .tag-wrapper {
          width: 30px;
          height: 14px;
          position: relative;
          text-align: center;
          margin-right: 10px;
          .tag {
            color: green;
            line-height: 14px;
            text-align: center;
            font-size: 12px;
          }
          &:after {
            content: "";
            border: 1px green solid;
            border-radius: 4px;
            position: absolute;
            width: 200%;
            height: 200%;
            top: -1px;
            left: 0;
            transform-origin: left top;
            transform: scale(0.5);
          }
        }

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
    color: #B20000;
  }
</style>
