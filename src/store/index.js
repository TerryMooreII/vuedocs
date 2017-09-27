import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import comment from './modules/comment';
import loading from './modules/loading';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    auth,
    comment,
    loading
  },
  strict: debug
});
