<template>
  <section class="wrapper">
    <a :href="item.link">
      <div class="content">
        <div class="above">
          <div class="left">
            <span class="title">{{item.title}}</span>
            <span class="abstract">{{item.desc}}</span>
          </div>
          <div class="right">
            <img :src="item.envelopePic">
          </div>
        </div>
        <div class="below">
          <span class="author">{{item.author}}</span>
          <span class="time">{{item.niceDate}}</span>
          <a v-show="item.apkLink" class="download" :href="item.apkLink">
            <span>下载apk</span>
          </a>
          <div class="collect">
            <img v-show="!item.collect" src="../img/collect.png">
            <img v-show="item.collect" src="../img/collected.png">
          </div>
        </div>
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
          return {};
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../css/constant";

  $textColor: #767676;
  $titleHeight: 35px;
  $belowHeight: 35px;
  .wrapper {
    box-sizing: border-box;
    width: 100%;
    padding-left: 5px;
    padding-right: 5px;
    margin-top: 6px;
    margin-bottom: 6px;
    color: $textColor;
    font-size: $fontSize;
    a {
      text-decoration: none;
      .content {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 140px;
        font-size: 12px;
        color: $textColor;
        box-sizing: border-box;
        background: #ffffff;
        /*水平偏移、垂直偏移、模糊、扩展、颜色*/
        box-shadow: 0 1px 1px 0 #C9C9C9;
        border-top: solid #E8E8E8 1px;
        border-radius: 2px;
        .above {
          width: 100%;
          display: flex;
          flex-direction: row;
          .left {
            width: 75%;
            display: flex;
            flex-direction: column;
            .title {
              display: inline-block;
              box-sizing: border-box;
              height: $titleHeight;
              line-height: $titleHeight;
              margin-left: 8px;
              margin-right: 8px;
              font-size: 16px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .abstract {
              display: inline-block;
              box-sizing: border-box;
              margin-left: 16px;
              margin-right: 8px;
              line-height: 16px;
              height: 50px;
              /*对象作为弹性伸缩盒子模型显示*/
              display: -webkit-box;
              /*设置或检索伸缩盒对象的子元素的排列方式*/
              -webkit-box-orient: vertical;
              /*溢出省略的界限*/
              -webkit-line-clamp: 3;
              overflow: hidden;
            }
          }
          .right {
            box-sizing: border-box;
            width: 25%;
            padding: 16px 10px;
            height: 100px;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
        }
        .below {
          box-sizing: border-box;
          margin-left: 16px;
          height: $belowHeight;
          line-height: $belowHeight;
          position: relative;
          &:before {
            content: "";
            position: absolute;
            height: 1px;
            width: 70%;
            background: #DCDCDC;
            transform: scaleY(0.5);
          }
          .author {
          }
          .time,
          .download {
            padding-left: 5px;
          }
          .download {
            display: inline-block;
            padding-right: 5px;
            color: $bgColor;
            height: $belowHeight;
            line-height: $belowHeight;
          }
          .collect {
            position: absolute;
            top: ($belowHeight - 18) / 2;
            right: 10px;
            img {
              width: 18px;
            }
          }
        }
      }
    }
  }
</style>
