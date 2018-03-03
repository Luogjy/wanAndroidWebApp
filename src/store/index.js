import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
// import createLogger from 'vuex/dist/logger';
import {debug} from '../common/js/constant';

Vue.use(Vuex);

// https://vuex.vuejs.org/zh-cn/mutations.html
// 在src/main.js中引入
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug
  // plugins: debug ? [createLogger()] : []
});
