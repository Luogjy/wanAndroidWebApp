<template>
  <section class="wrapper">
    <div class="chapter-wrapper">
      <span class="tip">选择分类：</span>
      <span class="chapter" @click="toSelectChapter">{{selectedChapter.name}}</span>
    </div>

    <div class="list-wrapper">
      <item-project :key="index" :item="item" v-for="(item,index) in projects"/>
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

  export default {
    mixins: [baseFunction],
    data() {
      return {
        chapters: [{
          'children': [],
          'courseId': 13,
          'id': 294,
          'name': '完整项目',
          'order': 145000,
          'parentChapterId': 293,
          'visible': 0
        }],
        selectedChapter: {
          // 自己在父级的位置
          position: -1,
          'children': [],
          'courseId': 13,
          'id': 294,
          'name': '完整项目',
          'order': 145000,
          'parentChapterId': 293,
          'visible': 0
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
    methods: {
      _getProjectList() {
        this.isGettingList = true;
        this.addLoading(1);
        getProjectList(this.nextPage, this.selectedChapter.id).then((res) => {
          if (res.errorCode >= 0) { // 成功
            if (this.isRefresh) {
              this.projects = [];
            }
            this.projects = this.projects.concat(res.data.datas);
            this.nextPage++;
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
              this.selectedChapter = this.chapters[0];
              this.selectedChapter.position = 0;
              this._getProjectList();
            }
          }
        });
      },
      refreshProjectList() {
        this.isRefresh = true;
        this.initNextPage();
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
      }
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
