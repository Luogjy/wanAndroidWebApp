import {mapGetters, mapMutations} from 'vuex';
import Toast from '../component/Toast';
import FlowDialog from '../component/FlowDialog';
import {getNavDatas} from '../../js/navData';
import {getOftenVisitWebsiteList} from '../../js/oftenVisitWebsite';
import tools from '../../js/tools';

export const baseFunction = { // 【使用mixins】【1】
  data() {
    return {
      nextPage: 1,
      // 页面激活
      pageActivated: false,
      // 正在获取文章/项目列表
      isGettingList: false,
      // 刷新文章列表
      isRefresh: false,
      toastOption: {
        text: '',
        top: 0
      },
      toastTop: 0,
      // 总页数
      pageCount: 1
    };
  },
  computed: {
    ...mapGetters(['touchBottom', 'refresh'])
  },
  activated() {
    this.pageActivated = true;
  },
  deactivated() {
    this.pageActivated = false;
  },
  methods: {
    // 触底加载更多
    _touchBottom(newValue, oldValue) {
      throw new Error('必须在methods重写_touchBottom函数，实现触底加载更多'); // 要求此函数必须重写，否则抛异常
    },
    // 点击了头部刷新按钮刷新页面数据
    _clickRefreshButton(newValue, olrValue) {
      throw new Error('必须在methods重写_refresh函数，实现点击了头部刷新按钮刷新页面数据');
    },
    // 初始化数据页码
    initNextPage() {
      this.nextPage = 1;
    },
    showToast({text, top}) {
      this.toastOption = {
        text, 'top': top || this.toastTop
      };
    },
    initToastTop(top) {
      this.toastTop = top;
    },
    initPageCount() {
      this.pageCount = 1;
    },
    ...mapMutations({
      // 点击了头部刷新按钮
      setRefresh: 'REFRESH',
      // 主动调起的请求任务数，计数器加1或加-1
      addLoading: 'LOADING'
    })
  },
  watch: {
    // 触底加载更多
    touchBottom(newValue, oldValue) {
      this._touchBottom(newValue, oldValue);
    },
    // 刷新页面数据
    refresh(newValue, oldValue) {
      this._clickRefreshButton(newValue, oldValue);
    }
  },
  components: {
    Toast
  }
};
/**
 * App组件头部的功能
 * @type {{}}
 */
export const appHeadFunction = {
  data() {
    return {
      navDatas: [],
      flowDialogTitle: '',
      flowItems: [],
      autoHideFlowDialog: true,
      showFlowDialog: false,
      SELECT_TYPE: {
        ONE_NAV: 'ONE_NAV',
        TWO_NAV: 'TWO_NAV',
        TOOLS: 'TOOLS',
        OFTEN_VISIT_WEBSITE: 'OFTEN_VISIT_WEBSITE'
      },
      selectType: null,
      oftenVisitWebsiteList: [],
      // flowDialog被占用，即被主动打开等等数据中
      flowDialogIsBusing: false
    };
  },
  mounted() {
    this._getNavDatas();
    this._getOftenVisitWebsiteList();
  },
  methods: {
    // 获取导航数据
    _getNavDatas(showDialog = false) {
      if (!this.flowDialogIsBusing) {
        // 先打开窗口再请求等待数据返回吧，否则网络太慢用户以为点击了按钮没反应
        this.showFlowDialog = showDialog;
        this.flowDialogTitle = '(正在获取导航分类...)';
        this.autoHideFlowDialog = false;
      }
      if (this.navDatas.length <= 0) {
        getNavDatas().then((res) => {
          if (res.errorCode === 0) {
            this.navDatas = res.data;
            if (!this.flowDialogIsBusing) {
              this.selectType = this.SELECT_TYPE.ONE_NAV;
              this.flowItems = this.navDatas;
              this.flowDialogTitle = '导航分类';
            }
          }
        });
      } else {
        if (!this.flowDialogIsBusing) {
          this.selectType = this.SELECT_TYPE.ONE_NAV;
          this.flowItems = this.navDatas;
          this.flowDialogTitle = '导航分类';
        }
      }
    },
    // 获取常用网站
    _getOftenVisitWebsiteList(showDialog = false) {
      if (!this.flowDialogIsBusing) {
        this.showFlowDialog = showDialog;
        this.flowDialogTitle = '(正在获取常用网站...)';
        this.autoHideFlowDialog = true;
      }
      if (this.oftenVisitWebsiteList.length <= 0) {
        getOftenVisitWebsiteList().then((res) => {
          if (res.errorCode === 0) {
            this.oftenVisitWebsiteList = res.data;
            if (!this.flowDialogIsBusing) {
              this.selectType = this.SELECT_TYPE.OFTEN_VISIT_WEBSITE;
              this.flowItems = this.oftenVisitWebsiteList;
              this.flowDialogTitle = '常用网站';
            }
          }
        });
      } else {
        if (!this.flowDialogIsBusing) {
          this.selectType = this.SELECT_TYPE.OFTEN_VISIT_WEBSITE;
          this.flowItems = this.oftenVisitWebsiteList;
          this.flowDialogTitle = '常用网站';
        }
      }
    },
    // 接收到关闭FlowDialog的事件，就通过变量控制FlowDialog关闭
    hideFlowDialogEvent() {
      this.showFlowDialog = false;
    },
    // 接收到用户关闭FlowDialog的事件，就通过变量控制FlowDialog关闭
    userHideDialogEvent() {
      this.showFlowDialog = false;
    },
    selectedItemByFlowDialog({item, index}) {
      if (this.selectType === this.SELECT_TYPE.ONE_NAV) {
        this.autoHideFlowDialog = true;
        item.articles.forEach((_item, _index) => {
          _item.name = _item.title;
        });
        this.flowItems = item.articles;
        this.flowDialogTitle = item.name;
        this.selectType = this.SELECT_TYPE.TWO_NAV;
      } else if (this.selectType === this.SELECT_TYPE.TWO_NAV) {
        window.open(item.link); // 打开新页面
      } else if (this.selectType === this.SELECT_TYPE.TOOLS) {
        window.open(item.link); // 打开新页面
      } else if (this.selectType === this.SELECT_TYPE.OFTEN_VISIT_WEBSITE) {
        window.open(item.link); // 打开新页面
      }
    },
    clickNav() {
      this._getNavDatas(true);
    },
    clickTool() {
      if (!this.flowDialogIsBusing) {
        this.showFlowDialog = true;
        this.selectType = this.SELECT_TYPE.TOOLS;
        this.flowItems = tools;
        this.flowDialogTitle = '常用工具';
        this.autoHideFlowDialog = true;
      }
    },
    clickWebsite() {
      console.log('clickWebsite')
      this._getOftenVisitWebsiteList(true);
    },
    clickContactUs() {
    }
  },
  watch: {
    showFlowDialog(newValue, oldValue) {
      this.flowDialogIsBusing = newValue;
    }
  },
  components: {
    FlowDialog
  }
};
