import * as types from '../mutation-types'
import api from '../../../../api/login.js'

const state = {
  token: sessionStorage.getItem('vue-blog-token')
};
// actions
const actions = {
  createToken({ commit, state }, { username, password }) {
    return api.createToken(username, password).then(res => {
      if (res.data.success) {
        console.log(res.data.token)
        commit(types.CREATE_TOKEN, res.data.token);
      } else {
        commit(types.DELETE_TOKEN);
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      });
    });
  }
}

const mutations = {
  [types.CREATE_TOKEN](state, token) {
    state.token = token;
    sessionStorage.setItem('vue-blog-token', token);
  },
  [types.DELETE_TOKEN](state) {
    state.token = null;
    sessionStorage.setItem('vue-blog-token', '');
  }
}
export default {
  state,
  actions,
  mutations
}
