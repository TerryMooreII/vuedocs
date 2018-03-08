import * as types from '../mutation-types';
import axios from 'axios';

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
  updateUser ({ commit, state }, user) {
    return axios.put('/users/me', user).then((response) => {
      commit(types.SET_USER, { user: response.data });
    });
  }
};

// mutations
const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user.user;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
