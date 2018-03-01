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
import Ads from 'vue-google-adsense';
 
axios.defaults.baseURL = process.env.API_URL;

Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(VueTimeagoFilter);
Vue.use(Notifications);

Vue.use(require('vue-script2'));

Vue.use(Ads.Adsense);
Vue.use(Ads.InArticleAdsense);
Vue.use(Ads.InFeedAdsense);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
