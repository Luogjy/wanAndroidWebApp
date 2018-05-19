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

// 把webAPP打包成apk项目，参考https://www.jianshu.com/p/25d797b983cd 或 教你用Cordova打包Vue项目 - 简书.mhtml
// 当Cordova完全加载好deviceready事件会触发。这个事件对每一个应用程序都是必须的。他是Cordova设备API准备好并可以访问的信号。
// http://cordova.axuer.com/docs/zh-cn/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', function () {
  new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
  });
  window.navigator.splashscreen.hide();
}, false);
