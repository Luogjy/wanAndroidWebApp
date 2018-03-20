import * as types from './mutationTypes';

const mutations = {
  [types.TOUCH_BOTTOM](state, touchBottom) {
    state.touchBottom = touchBottom;
  },
  /**
   * 点击了头部刷新按钮
   * @param state
   * @param refresh true/false
   */
  [types.REFRESH](state, refresh) {
    state.refresh = refresh;
  },
  /**
   * 主动调起的请求任务数，计数器加1或加-1
   * @param state
   * @param loading 计数器加1或加-1
   */
  [types.LOADING](state, loading) {
    state.loading = state.loading + loading;
  },
  // [types.SEARCH_PAGE_IS_SHOWING](state, searchPageIsShowing) {
  //   state.searchPageIsShowing = searchPageIsShowing;
  // },
  [types.DEFAULT_TWO_CHAPTER](state, defaultTwoChapter) {
    state.defaultTwoChapter = defaultTwoChapter;
  },
  [types.DEFAULT_PROJECT_CHAPTER](state, defaultProjectChapter) {
    state.defaultProjectChapter = defaultProjectChapter;
  },
  [types.DEFAULT_ONE_NAV_DATA](state, defaultOneNavData) {
    state.defaultOneNavData = defaultOneNavData;
  }
  // [types.THE_SEARCH_KEY](state, theSearchKey) {
  //   state.theSearchKey = theSearchKey;
  // }

};
export default mutations;
