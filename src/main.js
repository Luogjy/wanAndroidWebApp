import Vue from 'vue';
import App from './App';
import router from './router';
import './common/css/reset.scss';
import store from './store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
