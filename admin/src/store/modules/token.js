import login from '../../api/login'
import * as types from '../mutation-types'

const state = {
  token: sessionStorage.getItem('token')
}
// actions
const actions = {
  // checkout ({ commit, state }, products) {
  //   const savedCartItems = [...state.added]
  //   commit(types.CHECKOUT_REQUEST)
  //   shop.buyProducts(
  //     products,
  //     () => commit(types.CHECKOUT_SUCCESS),
  //     () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
  //   )
  // }
}

const mutations = {
  [types.CREATE_TOKEN](state,token){
    state.token = token;
    sessionStorage.setItem('token',token);
  },
  [types.DELETE_TOKEN](state){
    sessionStorage.removeItem('token');
    state.token = null;
  }
}
export default {
  state,
  actions,
  mutations
}




