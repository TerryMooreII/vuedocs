import * as types from '../mutation-types';

// initial state
const state = {
  comment: null
};

// getters
const getters = {
  getComment: state => state.comment
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
  [types.COMMENT_ADDED] (state, user) {
    state.comment = user.comment;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
