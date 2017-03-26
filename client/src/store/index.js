import Vue from 'vue'
import Vuex from 'vuex'
//import * as actions from './actions'
//import * as getters from './getters'
import auth from './modules/auth'
import editor from './modules/editor'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  //actions,
  //getters,
  modules: {
    auth,
    editor
  },
  strict: debug,
  //plugins: debug ? [createLogger()] : []
})
