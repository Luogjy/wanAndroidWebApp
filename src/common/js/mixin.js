import {mapGetters, mapMutations} from 'vuex';

export const baseFunction = { // 【使用mixins】【1】
  data() {
    return {
      nextPage: 1,
      // 页面激活
      pageActivated: false,
      // 正在获取文章/项目列表
      isGettingList: false,
      // 刷新文章列表
      isRefresh: false
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
  }
};
