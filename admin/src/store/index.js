import Vue from 'vue'
import Vuex from 'vuex'
//import * as actions from './actions'
//import * as getters from './getters'
import auth from './modules/auth'
import article from './modules/article'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  //actions,
  //getters,
  modules: {
    auth,
    article
  },
  strict: debug,
  //plugins: debug ? [createLogger()] : []
})
