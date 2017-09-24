// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Notifications from 'vue-notification';

import App from './App';
import router from './router';
import store from './store';
import axios from 'axios';
import VueTimeagoFilter from './filters/timeago';

axios.defaults.baseURL = process.env.API_URL;

Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(VueTimeagoFilter);
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
