<template>
  <center-dialog :show-dialog="showDialog" :title="title" @userHideDialog="userHideDialog">
    <ul class="item-wrapper">
      <li @click.stop="selectedItem({item,index})" :key="item.name" v-for="(item,index) in items"
          :class="items.selectedPosition===index?'selected':''">
        {{item.name}}
      </li>
    </ul>
  </center-dialog>
</template>

<script>
  import CenterDialog from './CenterDialog';

  export default {
    props: {
      showDialog: {
        type: Boolean,
        default: true
      },
      items: {
        type: Array,
        default: function () {
          return [{
            id: '',
            name: ''
          }];
        }
      },
      // 选择条目以后自动隐藏对话框
      autoHide: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      // 用户主动隐藏对话框
      userHideDialog() {
        this.$emit('userHideDialog', {
          'item': this.items[this.items.selectedPosition],
          'index': this.items.selectedPosition
        });
      },
      selectedItem({item, index}) {
        if (this.autoHide) {
          this.$emit('hideDialog');
        }
        this.$emit('selectedItem', {item, index});
      }
    },
    components: {
      CenterDialog
    }
  };
</script>

<style scoped lang="scss">
  @import "../css/constant";

  $itemHeight: 26px;

  .item-wrapper {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    min-height: 80px;
    max-height: 360px;
    color: $bgColor;
    overflow: scroll;
    li {
      box-sizing: border-box;
      height: $itemHeight;
      line-height: $itemHeight;
      padding-left: 5px;
      padding-right: 5px;
      text-align: center;
      margin: 3px 3px;
    }
    .selected {
      border: 1px solid $bgColor;
      border-radius: 2px;
    }
  }

</style>
