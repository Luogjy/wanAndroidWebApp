<template>
  <section class="wrapper">
    <toast :show-option="toastOption"/>
    <div class="chapter-wrapper">
      <span @click="toSelectOneChapter" class="one-chapter">{{selectedOneChapter.name}}</span>
      <img src="../../common/img/right_blue.png" alt="">
      <span @click="toSelectTwoChapter" class="two-chapter">{{selectedTwoChapter.name}}</span>
    </div>

    <div ref="articleWrapper" class="article-wrapper">
      <item-article :can-open-chapter="false" :item="item" :key="item.title" v-for="(item) in articles"/>
    </div>

    <flow-dialog :show-dialog="toShowFlowDialog" @userHideDialog="userHideFlowDialog" @hideDialog="hideFlowDialog"
                 @selectedItem="selectedItemByFlowDialog"
                 :items="flowItems" :auto-hide="autoHideFlowDialog" :title="flowDialogTitle"/>
  </section>
</template>

<script>
  import ItemArticle from '../../common/component/ItemArticle';
  import {getTechnologySystem, getArticleList} from './js/technologySystem';
  import FlowDialog from '../../common/component/FlowDialog';
  import {baseFunction} from '../../common/js/mixin';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    mixins: [baseFunction],
    data() {
      return {
        flowItems: [],
        // 体系结构列表数据
        systems: [],
        // 被选择的一级分类
        selectedOneChapter: {
          // 自己在父级的位置
          position: -1
        },
        // 被选择的二级分类
        selectedTwoChapter: {
          // 自己在父级的位置
          position: -1
        },
        toShowFlowDialog: false,
        // 选择类型：1为选择一级分类，2为选择二级分类，-1为没有要选择的
        selectType: -1,
        // 自动隐藏FlowDialog
        autoHideFlowDialog: true,
        flowDialogTitle: '',
        articles: [],
        resetSelectedTwoChapterPosition: false,
        // 打开FlowDialog选择一级分类后，用户什么都没选又关闭了隐藏FlowDialog
        isUserHideFlowDialog: false
      };
    },
    computed: {
      ...mapGetters(['defaultTwoChapter'])
    },
    created() {
      this._getTechnologySystem();
    },
    mounted() {
      this.initToastTop(this.$refs.articleWrapper.getBoundingClientRect().top);
    },
    activated() {
      if (this.defaultTwoChapter) {
        this.useDefaultTwoChapter();
      }
    },
    methods: {
      // 使用从其他地方带过来的指定二级分类
      useDefaultTwoChapter() {
        for (let i = 0; i < this.systems.length; i++) {
          let one = this.systems[i];
          for (let j = 0; j < one.children.length; j++) {
            let item = one.children[j];
            if (item.id === this.defaultTwoChapter.chapterId) {
              this.selectedTwoChapter = item;
              this.selectedTwoChapter.position = j;
              this.selectedOneChapter = JSON.parse(JSON.stringify(one));
              this.selectedOneChapter.position = i;
              this.setDefaultTwoChapter(null);
              this.refreshArticleList();
              return;
            }
          }
        }
      },
      _getTechnologySystem() {
        getTechnologySystem().then((res) => {
          if (res.errorCode >= 0) {
            this.systems = res.data;
            if (this.systems.length > 0) {
              if (this.defaultTwoChapter) { // 从其他地方带着指定分类过来
                this.useDefaultTwoChapter();
              } else { // 并没有从其他地方带着指定分类过来
                this.selectedOneChapter = JSON.parse(JSON.stringify(this.systems[0]));
                this.selectedOneChapter.position = 0;
                if (this.selectedOneChapter.children.length > 0) {
                  this.selectedTwoChapter = this.selectedOneChapter.children[0];
                  this.selectedTwoChapter.position = 0;
                  this._getArticleList();
                }
              }
            }
          }
        });
      },
      _getArticleList() {
        if (this.nextPage > this.pageCount) {
          this.showToast({text: '已经到底了'});
          return;
        }
        if (this.selectedTwoChapter.id) {
          this.isGettingList = true;
          this.addLoading(1);
          getArticleList(this.nextPage, this.selectedTwoChapter.id).then((res) => {
            if (res.errorCode >= 0) { // 成功
              if (this.isRefresh) {
                window.scrollTo(0, 0); // 页面滚回顶部
                this.articles = [];
              }
              this.articles = this.articles.concat(res.data.datas);
              this.pageCount = res.data.pageCount;
              this.nextPage++;
              this.showToast({text: this.articles.length ? '获取文章成功' : '没有数据 ╮(╯▽╰)╭'});
            }
            this.isGettingList = false;
            this.addLoading(-1);
            this.setRefresh(false);
          });
        }
      },
      showFlowDialog() {
        this.toShowFlowDialog = true;
      },
      hideFlowDialog() {
        this.toShowFlowDialog = false;
      },
      userHideFlowDialog({item, index}) {
        this.toShowFlowDialog = false;
        this.isUserHideFlowDialog = true;
        this._selectedItemByFlowDialog({item, index});
      },
      // 去选择一级分类
      _toSelectOneChapter() {
        this.selectType = 1;
        this.flowDialogTitle = '选择一级分类';
        this.flowItems = this.systems;
        this.flowItems.selectedPosition = this.selectedOneChapter.position;
        this.autoHideFlowDialog = false;
        this.isUserHideFlowDialog = false;
        this.showFlowDialog();
      },
      toSelectOneChapter() {
        this._toSelectOneChapter();
      },
      /**
       * 去选择二级分类
       * @param resetPos 是否需要重置已被选择的二级分类
       */
      _toSelectTwoChapter() {
        this.selectType = 2;
        this.flowDialogTitle = '选择二级分类';
        this.flowItems = this.selectedOneChapter.children;
        if (this.resetSelectedTwoChapterPosition) {
          if (this.flowItems.length > 0) {
            this.selectedTwoChapter = JSON.parse(JSON.stringify(this.flowItems[0]));
            this.selectedTwoChapter.position = 0;
          } else {
            this.selectedTwoChapter = {};
            this.selectedTwoChapter.position = -1;
          }
        }
        this.flowItems.selectedPosition = this.selectedTwoChapter.position;
        this.autoHideFlowDialog = true;
        this.showFlowDialog();
      },
      toSelectTwoChapter() {
        this._toSelectTwoChapter();
      },
      _selectedItemByFlowDialog({item, index}) {
        if (this.selectType === 1) {
          this.resetSelectedTwoChapterPosition = item.id !== this.selectedOneChapter.id; // 跟上一次选择的一级分类不是同一个就要重选二级分类
          this.selectedOneChapter = JSON.parse(JSON.stringify(item));
          this.selectedOneChapter.position = index;
          if (!this.isUserHideFlowDialog) { // 用户不是打开对话框不选择就关闭
            this._toSelectTwoChapter(); // 进行二级分类选择
          }
        } else if (this.selectType === 2) {
          let differ = item.id !== this.selectedTwoChapter.id;
          this.selectedTwoChapter = JSON.parse(JSON.stringify(item));
          this.selectedTwoChapter.position = index;
          if (differ || this.resetSelectedTwoChapterPosition) {
            this.refreshArticleList();
          }
        } else {
          this.selectType = -1;
          this.flowDialogTitle = '';
          this.flowItems = [];
          this.autoHideFlowDialog = true;
        }
      },
      // 从FlowDialog选择到的item
      selectedItemByFlowDialog({item, index}) {
        this._selectedItemByFlowDialog({item, index});
      },
      refreshArticleList() {
        this.isRefresh = true;
        this.initNextPage();
        this.initPageCount();
        this._getArticleList();
      },
      _touchBottom(newValue, oldValue) {
        if (newValue && this.pageActivated && !this.isGettingList) { // 触底加载更多
          this.isRefresh = false;
          this._getArticleList();
        }
      },
      _clickRefreshButton(newValue, oldValue) {
        if (newValue && this.pageActivated && !this.isGettingList) { // 刷新页面数据
          this.refreshArticleList();
        }
      },
      ...mapMutations({
        setDefaultTwoChapter: 'DEFAULT_TWO_CHAPTER'
      })
    },
    watch: {
      defaultTwoChapter(newValue, oldValue) {
        // 从“发现”里的“常用网站”跳转过来的没有携带标题，用这个来避免在本页处于activated状态时点击“常用网站”没有切换二级分类的情况
        if (newValue && newValue.chapterId && !newValue.chapterName) {
          this.useDefaultTwoChapter();
        }
      }
    },
    components: {
      ItemArticle, FlowDialog
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
