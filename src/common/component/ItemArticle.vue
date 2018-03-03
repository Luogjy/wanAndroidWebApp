<template>
  <section class="wrapper">
    <a :href="item.link">
      <div class="content">
        <img v-show="!item.collect" class="collect" src="../img/collect.png">
        <img v-show="item.collect" class="collect" src="../img/collected.png">
        <span class="title">{{item.title}}</span>
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
  export default {
    props: {
      item: {
        type: Object,
        default: function () {
          return {
            'apkLink': '',
            'author': '移动开发前线',
            'chapterId': 269,
            'chapterName': '官方发布',
            'collect': false,
            'courseId': 13,
            'desc': '',
            'envelopePic': '',
            'id': 2434,
            'link': 'https://mp.weixin.qq.com/s/gICH9osyIzz9WerXO1C_8g',
            'niceDate': '7小时前',
            'origin': '',
            'projectLink': '',
            'publishTime': 1519961226000,
            'title': '谷歌确认将限制Android非SDK接口使用了',
            'visible': 1,
            'zan': 0
          };
        }
      },
      canOpenChapter: {
        type: Boolean,
        default: true
      },
      canOpenAuthor: {
        type: Boolean,
        default: true
      }

    },
    methods: {
      toChapterPage() {
        if (this.canOpenChapter) {
          this.$router.push('/technologySystem');
        }
      },
      toAuthorPage() {
        if (this.canOpenAuthor) {
          this.$router.push('/author');
        }
      }
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
