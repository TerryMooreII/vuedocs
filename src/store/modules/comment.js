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
