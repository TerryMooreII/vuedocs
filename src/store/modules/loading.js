import * as types from '../mutation-types';

// initial state
const state = {
  isLoading: null
};

// getters
const getters = {
  isLoading: state => state.isLoading
};

// actions
const actions = {
};

// mutations
const mutations = {
  [types.LOADING] (state, isLoading) {
    state.isLoading = isLoading;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
