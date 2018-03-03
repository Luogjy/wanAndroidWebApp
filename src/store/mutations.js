import * as types from './mutationTypes';

const mutations = {
  [types.TOUCH_BOTTOM](state, touchBottom) {
    state.touchBottom = touchBottom;
  }
};
export default mutations;
