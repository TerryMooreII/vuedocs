// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import './services/FirebaseService.js';

import Vue from 'vue';
import VueFire from 'vuefire';
import VeeValidate from 'vee-validate';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueFire);
Vue.use(VeeValidate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
