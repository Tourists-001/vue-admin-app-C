import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible';
import api from './api';

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack() {
  this.back = true;
  this.go(-1);
};
Vue.prototype.$api = api;
Vue.use(Vant);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
