<template>
  <section class="wrapper">
    <div class="banner-wrapper">
      <div class="left">
        <swiper :options="swiperOption" class="my-swiper">
          <swiper-slide class="my-slide">
            <a href="#">
              <img src="./img/1.png" alt="">
            </a>
          </swiper-slide>
          <swiper-slide class="my-slide">
            <a href="#">
              <img src="./img/2.png" alt="">
            </a>
          </swiper-slide>
          <swiper-slide class="my-slide">
            <a href="#">
              <img src="./img/3.png" alt="">
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="right"></div>
    </div>
    <div>
      <div>
        <item-article :item="item" :key="index" v-for="(item,index) in articles"></item-article>
      </div>
    </div>
  </section>
</template>

<script>
  import 'swiper/dist/css/swiper.css'; // vue-awesome-swiper的样式表
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import ItemArticle from '../../common/component/ItemArticle';

  export default {
    data() {
      return {
        articles: [{
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
        },
          {
            'apkLink': '',
            'author': 'xiaoyang',
            'chapterId': 249,
            'chapterName': '干货资源',
            'collect': false,
            'courseId': 13,
            'desc': '',
            'envelopePic': '',
            'id': 2432,
            'link': 'http://www.wanandroid.com/blog/show/2062',
            'niceDate': '19小时前',
            'origin': '',
            'projectLink': '',
            'publishTime': 1519917139000,
            'title': 'Google 上线机器学习速成课程',
            'visible': 1,
            'zan': 0
          },
          {
            'apkLink': '',
            'author': 'CarGuo',
            'chapterId': 294,
            'chapterName': '完整项目',
            'collect': false,
            'courseId': 13,
            'desc': '更好的体验，更丰富的功能，旨在更好的日常管理和维护个人Github，提供更好更方便的驾车体验～～Σ(￣。￣ﾉ)ﾉ。',
            'envelopePic': 'http://www.wanandroid.com/blogimgs/51e36466-a64d-488e-a9ff-5d17dadcfa03.png',
            'id': 2431,
            'link': 'http://www.wanandroid.com/blog/show/2061',
            'niceDate': '19小时前',
            'origin': '',
            'projectLink': 'https://github.com/CarGuo/GSYGithubAPP',
            'publishTime': 1519916851000,
            'title': '开源跨平台的开源Github客户端App GSYGithubAPP',
            'visible': 1,
            'zan': 0
          },
          {
            'apkLink': '',
            'author': 'songhanghang',
            'chapterId': 294,
            'chapterName': '完整项目',
            'collect': false,
            'courseId': 13,
            'desc': '一款帮你远离手机的app',
            'envelopePic': 'http://www.wanandroid.com/blogimgs/0915214b-0597-425a-8a97-975afd7d3b19.png',
            'id': 2429,
            'link': 'http://www.wanandroid.com/blog/show/2060',
            'niceDate': '19小时前',
            'origin': '',
            'projectLink': 'https://github.com/songhanghang/goaway',
            'publishTime': 1519916600000,
            'title': '开源一款帮你远离手机的app goaway',
            'visible': 1,
            'zan': 0
          },
          {
            'apkLink': '',
            'author': 'yoyiyi',
            'chapterId': 294,
            'chapterName': '完整项目',
            'collect': false,
            'courseId': 13,
            'desc': 'rxjava2+okhttp+retrofit+mvp+dagger2搭建的仿B站羡慕。',
            'envelopePic': 'http://www.wanandroid.com/blogimgs/50b75d5d-0d7d-4b28-81f7-903cabdc5d7a.png',
            'id': 2427,
            'link': 'http://www.wanandroid.com/blog/show/2059',
            'niceDate': '20小时前',
            'origin': '',
            'projectLink': 'https://github.com/yoyiyi/bilisoleil',
            'publishTime': 1519912852000,
            'title': '仿哔哩哔哩动画Android客户端（>哔哩哔哩 (゜-゜)つロ 干杯~-bilibili）',
            'visible': 1,
            'zan': 0
          },
          {
            'apkLink': '',
            'author': 'xiaoyang',
            'chapterId': 292,
            'chapterName': 'pdf电子书',
            'collect': false,
            'courseId': 13,
            'desc': '',
            'envelopePic': '',
            'id': 2426,
            'link': 'http://www.wanandroid.com/blog/show/2058',
            'niceDate': '1天前',
            'origin': '',
            'projectLink': '',
            'publishTime': 1519869891000,
            'title': 'pdf 阿里巴巴Android开发规约手册',
            'visible': 1,
            'zan': 0
          }],
        swiperOption: { // vue-awesome-swiper所有参数都写这里，所有的参数同 swiper 官方 api 参数
          scrollbar: {
            el: '.swiper-scrollbar'
          },
          speed: 300, // 划动时的切换速度，默认300毫秒
          watchSlidesProgress: true,
          loop: true,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
          },
          pagination: {
            el: '.swiper-pagination'
          },
          on: {
            progress: function (progress) {
              // that.setSwiperProgress(progress);
            },
            slideChange: function () {
              // that.setSwiperActiveIndex(this.activeIndex);
            }
          }
        }
      };
    },
    components: {
      swiper, swiperSlide, ItemArticle
    }
  };
</script>

<style scoped lang="scss">
  .wrapper {
    width: 100%;
    .banner-wrapper {
      .right {
        display: none;
      }
      .left {
        .my-swiper {
          .my-slide {
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }

</style>
