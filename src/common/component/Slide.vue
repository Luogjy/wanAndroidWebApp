<template>
  <div class="slide" ref="slide">
    <div ref="slideGroup">
      <slot>
      </slot>
    </div>

    <div v-if="showDot" class="dots">
      <span :key="index" class="dot" :class="{active: currentPageIndex === index }"
            v-for="(item, index) in dots"></span>
    </div>
  </div>
</template>

<script>
  import {addClass} from '../js/util';
  import BScroll from 'better-scroll';

  export default {
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 3000
      },
      showDot: {
        type: Boolean,
        default: true
      },
      click: {
        type: Boolean,
        default: true
      },
      threshold: {
        type: Number,
        default: 0.3
      },
      speed: {
        type: Number,
        default: 300
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      };
    },
    mounted() {
      this.update();

      window.addEventListener('resize', () => {
        if (!this.slide || !this.slide.enabled) {
          return;
        }
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          if (this.slide.isInTransition) { // 判断当前 scroll 是否处于滚动动画过程中
            this._onScrollEnd();
          } else {
            if (this.autoPlay) {
              this._play();
            }
          }
          this.refresh();
        }, 60);
      });
    },
    activated() {
      if (!this.slide) {
        return;
      }
      this.slide.enable();
      let pageIndex = this.slide.getCurrentPage().pageX;
      this.slide.goToPage(pageIndex, 0, 0);
      this.currentPageIndex = pageIndex;
      if (this.autoPlay) {
        this._play();
      }
    },
    deactivated() {
      this.slide.disable();
      clearTimeout(this.timer);
    },
    beforeDestroy() {
      this.slide.disable();
      clearTimeout(this.timer);
    },
    methods: {
      update() {
        if (this.slide) {
          this.slide.destroy();
        }
        this.$nextTick(() => {
          this.init();
        });
      },
      refresh() {
        this._setSlideWidth(true);
        this.slide.refresh();
      },
      prev() {
        this.slide.prev();
      },
      next() {
        this.slide.next();
      },
      init() {
        clearTimeout(this.timer);
        this.currentPageIndex = 0;
        this._setSlideWidth();
        if (this.showDot) {
          this._initDots();
        }
        this._initSlide();

        if (this.autoPlay) {
          this._play();
        }
      },
      _setSlideWidth(isResize) {
        this.children = this.$refs.slideGroup.children;

        let width = 0;
        let slideWidth = this.$refs.slide.clientWidth;
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          addClass(child, 'slide-item');

          child.style.width = slideWidth + 'px';
          width += slideWidth;
        }
        if (this.loop && !isResize) {
          width += 2 * slideWidth;
        }
        this.$refs.slideGroup.style.width = width + 'px';
      },
      _initSlide() {
        this.slide = new BScroll(this.$refs.slide, {
          eventPassthrough: 'vertical', // 纵向的滚动保留原生滚动
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: this.threshold, // 切换页面临界值 0~1
            speed: this.speed
          },
          bounce: false,
          click: this.click
        });

        this.slide.on('scrollEnd', this._onScrollEnd);

        this.slide.on('touchEnd', () => {
          if (this.autoPlay) {
            this._play();
          }
        });

        this.slide.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer);
          }
        });
      },
      _onScrollEnd() {
        this.currentPageIndex = this.slide.getCurrentPage().pageX; // pageX 和 pageY 表示横轴方向和纵轴方向的页面数
        if (this.autoPlay) {
          this._play();
        }
      },
      _initDots() {
        this.dots = new Array(this.children.length);
      },
      _play() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.slide.next();
          // 在这里也赋值一下，让自动切换页面时小圆点指示器看起来马上生效，而不是等到切换管道结束时才切换指示器
          this.currentPageIndex = this.slide.getCurrentPage().pageX;
        }, this.interval);
      }
    },
    watch: {
      loop() {
        this.update();
      },
      autoPlay() {
        this.update();
      },
      speed() {
        this.update();
      },
      threshold() {
        this.update();
      }
    }
  };
</script>

<style scoped lang="scss">
  .slide {
    position: relative;
    overflow: hidden;
    .slide-item {
      float: left;
    }
    .dots {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 12px;
      text-align: center;
      font-size: 0;
      .dot {
        box-sizing: border-box;
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(0, 0, 0, .3);
      }
      .active {
        background: #0177FF;
      }
    }
  }
</style>
