import * as types from '../mutation-types';

// initial state
const state = {
  user: null
};

// getters
const getters = {
  getUser: state => state.user
};

// actions
const actions = {
  // setUser ({ commit }) {
  //   shop.getProducts(products => {
  //     commit(types.RECEIVE_PRODUCTS, { products })
  //   })
  // }
};

// mutations
const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
