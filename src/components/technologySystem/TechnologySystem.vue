<template>
  <section class="wrapper">
    <div class="chapter-wrapper">
      <span @click="toSelectOneChapter" class="one-chapter">{{selectedOneChapter.name}}</span>
      <img src="../../common/img/right_blue.png" alt="">
      <span @click="toSelectTwoChapter" class="two-chapter">{{selectedTwoChapter.name}}</span>
    </div>

    <div class="article-wrapper">
      <item-article :can-open-chapter="false"/>
    </div>

    <flow-dialog :show-dialog="toShowFlowDialog" @hideDialog="hideFlowDialog" @selectedItem="selectedItemByFlowDialog"
                 :items="flowItems" :auto-hide="autoHideFlowDialog" :title="flowDialogTitle"/>
  </section>
</template>

<script>
  import ItemArticle from '../../common/component/ItemArticle';
  import {getTechnologySystem} from './js/technologySystem';
  import FlowDialog from '../../common/component/FlowDialog';

  export default {
    data() {
      return {
        flowItems: [],
        // 体系结构列表数据
        systems: [],
        // 被选择的一级分类
        selectedOneChapter: {
          'children': [
            {
              'children': [],
              'courseId': 13,
              'id': 60,
              'name': 'Android Studio相关',
              'order': 1000,
              'parentChapterId': 150,
              'visible': 1
            }
          ],
          position: -1,
          'courseId': 13,
          'id': 150,
          'name': '开发环境',
          'order': 1,
          'parentChapterId': 0,
          'visible': 1
        },
        // 被选择的二级分类
        selectedTwoChapter: {
          position: -1,
          'courseId': 13,
          'id': 60,
          'name': 'Android Studio相关',
          'order': 1000,
          'parentChapterId': 150,
          'visible': 1
        },
        toShowFlowDialog: false,
        // 选择类型：1为选择一级分类，2为选择二级分类，-1为没有要选择的
        selectType: -1,
        // 自动隐藏FlowDialog
        autoHideFlowDialog: true,
        flowDialogTitle: ''
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
            if (this.systems.length > 0) {
              this.selectedOneChapter = JSON.parse(JSON.stringify(this.systems[0]));
              this.selectedOneChapter.position = 0;
              if (this.selectedOneChapter.children.length > 0) {
                this.selectedTwoChapter = this.selectedOneChapter.children[0];
                this.selectedTwoChapter.position = 0;
              }
            }
          }
        });
      },
      showFlowDialog() {
        this.toShowFlowDialog = true;
      },
      hideFlowDialog() {
        this.toShowFlowDialog = false;
      },
      // 去选择一级分类
      _toSelectOneChapter() {
        this.selectType = 1;
        this.flowDialogTitle = '选择一级分类';
        this.flowItems = this.systems;
        this.flowItems.selectedPosition = this.selectedOneChapter.position;
        this.autoHideFlowDialog = false;
        this.showFlowDialog();
      },
      toSelectOneChapter() {
        this._toSelectOneChapter();
      },
      /**
       * 去选择二级分类
       * @param resetPos 是否需要重置二级分类被则的位置
       */
      _toSelectTwoChapter(resetPos = false) {
        this.selectType = 2;
        this.flowDialogTitle = '选择二级分类';
        this.flowItems = this.selectedOneChapter.children;
        if (resetPos) {
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
      // 从FlowDialog选择到的item
      selectedItemByFlowDialog({item, index}) {
        if (this.selectType === 1) {
          let resetPos = !(item.id === this.selectedOneChapter.id);
          this.selectedOneChapter = JSON.parse(JSON.stringify(item));
          this.selectedOneChapter.position = index;
          this._toSelectTwoChapter(resetPos);
        } else if (this.selectType === 2) {
          this.selectedTwoChapter = JSON.parse(JSON.stringify(item));
          this.selectedTwoChapter.position = index;
        } else {
          this.selectType = -1;
          this.flowDialogTitle = '';
          this.flowItems = [];
          this.autoHideFlowDialog = true;
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
