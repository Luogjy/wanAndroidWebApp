import Vue from 'vue';
import App from './App';
import router from './router';
import './common/css/reset.scss';
import store from './store';
// 【图片懒加载】【1】
import VueLazyLoad from 'vue-lazyload';

// 【图片懒加载】【2】
Vue.use(VueLazyLoad, {
  loading: require('./common/img/default.png') // 可以设置占位图
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
