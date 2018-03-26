<template>
  <section class="wrapper">
    <toast :show-option="toastOption"/>
    <div class="chapter-wrapper">
      <span class="tip">选择分类：</span>
      <span class="chapter" @click="toSelectChapter">{{selectedChapter.name}}</span>
    </div>

    <div ref="listWrapper" class="list-wrapper">
      <item-project :key="item.title" :item="item" v-for="(item) in projects"/>
    </div>

    <flow-dialog :show-dialog="toShowFlowDialog" @userHideDialog="userHideFlowDialog" @hideDialog="hideFlowDialog"
                 @selectedItem="selectedItemByFlowDialog" :items="flowItems" :auto-hide="true"
                 :title="flowDialogTitle"/>
  </section>
</template>

<script>
  import FlowDialog from '../../common/component/FlowDialog';
  import ItemProject from '../../common/component/ItemProject';
  import {getProjectTree, getProjectList} from './js/project';
  import {baseFunction} from '../../common/js/mixin';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    mixins: [baseFunction],
    data() {
      return {
        chapters: [],
        selectedChapter: {
          // 自己在父级的位置
          position: -1
        },
        projects: [],
        toShowFlowDialog: false,
        flowItems: [],
        flowDialogTitle: ''
      };
    },
    created() {
      this._getProjectTree();
    },
    mounted() {
      this.initToastTop(this.$refs.listWrapper.getBoundingClientRect().top);
    },
    activated() {
      if (this.defaultProjectChapter) {
        this.useDefaultProjectChapter();
      }
    },
    methods: {
      useDefaultProjectChapter() {
        for (let i = 0; i < this.chapters.length; i++) {
          let item = this.chapters[i];
          console.log('this.defaultProjectChapter.chapterId-' + this.defaultProjectChapter.chapterId);
          console.log('item.id-' + item.id);
          if (item.id === this.defaultProjectChapter.chapterId) {
            console.log('进来了');
            this.selectedChapter = item;
            this.selectedChapter.position = i;
            this.setDefaultProjectChapter(null);
            this.refreshProjectList();
            return;
          }
        }
      },
      _getProjectList() {
        if (this.nextPage > this.pageCount) {
          this.showToast({text: '已经到底了'});
          return;
        }
        this.isGettingList = true;
        this.addLoading(1);
        getProjectList(this.nextPage, this.selectedChapter.id).then((res) => {
          if (res.errorCode >= 0) { // 成功
            if (this.isRefresh) {
              window.scrollTo(0, 0); // 页面滚回顶部
              this.projects = [];
            }
            this.projects = this.projects.concat(res.data.datas);
            this.pageCount = res.data.pageCount;
            this.nextPage++;
            this.showToast({text: this.projects.length ? '获取文章成功' : '没有数据 ╮(╯▽╰)╭'});
          }
          this.isGettingList = false;
          this.addLoading(-1);
          this.setRefresh(false);
        });
      },
      _getProjectTree() {
        getProjectTree().then((res) => {
          if (res.errorCode >= 0) {
            this.chapters = res.data;
            if (this.chapters.length > 0) {
              if (this.defaultProjectChapter) { // 从其他地方带着指定分类过来
                this.useDefaultProjectChapter();
              } else {
                this.selectedChapter = this.chapters[0];
                this.selectedChapter.position = 0;
                this._getProjectList();
              }
            }
          }
        });
      },
      refreshProjectList() {
        this.isRefresh = true;
        this.initNextPage();
        this.initPageCount();
        this._getProjectList();
      },
      _touchBottom(newValue, oldValue) {
        if (newValue && this.pageActivated && !this.isGettingList) { // 触底加载更多
          this.isRefresh = false;
          this._getProjectList();
        }
      },
      _clickRefreshButton(newValue, oldValue) {
        if (newValue && this.pageActivated && !this.isGettingList) { // 刷新页面数据
          this.refreshProjectList();
        }
      },
      _selectedItemByFlowDialog({item, index}) {
        let differ = item.id !== this.selectedChapter.id;
        this.selectedChapter = JSON.parse(JSON.stringify(item));
        this.selectedChapter.position = index;
        if (differ) {
          this.refreshProjectList();
        }
      },
      // 从FlowDialog选择到的item
      selectedItemByFlowDialog({item, index}) {
        this._selectedItemByFlowDialog({item, index});
      },
      showFlowDialog() {
        this.toShowFlowDialog = true;
      },
      hideFlowDialog() {
        this.toShowFlowDialog = false;
      },
      userHideFlowDialog({item, index}) {
        this.toShowFlowDialog = false;
        this._selectedItemByFlowDialog({item, index});
      },
      // 去选择一级分类
      _toSelectChapter() {
        this.flowDialogTitle = '选择分类';
        this.flowItems = this.chapters;
        this.flowItems.selectedPosition = this.selectedChapter.position;
        this.showFlowDialog();
      },
      toSelectChapter() {
        this._toSelectChapter();
      },
      ...mapMutations({
        setDefaultProjectChapter: 'DEFAULT_PROJECT_CHAPTER'
      })
    },
    computed: {
      ...mapGetters(['defaultProjectChapter'])
    },
    components: {
      ItemProject, FlowDialog
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
      white-space: nowrap;

      z-index: 1;
      .tip,
      .chapter {
        box-sizing: border-box;
        display: inline-block;
        height: $chapterWrapperHeight;
        line-height: $chapterWrapperHeight;
        padding-left: 10px;
        font-size: 12px;
        color: $bgColor;
      }
      .chapter {
        flex-grow: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
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
    }
    .list-wrapper {
      position: absolute;
      width: 100%;
      top: $chapterWrapperHeight;
    }
  }
</style>
