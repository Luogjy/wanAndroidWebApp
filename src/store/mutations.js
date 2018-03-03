import * as types from './mutationTypes';

const mutations = {
  [types.TOUCH_BOTTOM](state, touchBottom) {
    state.touchBottom = touchBottom;
  },
  [types.REFRESH](state, refresh) {
    state.refresh = refresh;
  }

};
export default mutations;
