import Vue from 'vue'
import VueRouter from "vue-router";
import Axios from "axios"
import store from './store'
import { sync } from 'vuex-router-sync'

import App from './App'
import List from './components/List.vue'
import Article from './components/Article.vue'

// 解决移动端300ms延迟问题
if (typeof window !== "undefined") {
  const Fastclick = require('fastclick')
  Fastclick.attach(document.body)
}

Vue.use(VueRouter)

const routes = [
  { path: '/', component: List },
  { path: '/article/:id', component: Article, meta: { scrollToTop: true } },
  { path: '/page/:page', component: List },
  { path: '*', redirect: '/' }
]

let navigatorAction = false
const router = new VueRouter({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (to == from) {
      navigatorAction = true
    } else {
      navigatorAction = false
    }
  },
  routes
})

if (typeof window !== "undefined") {
  router.beforeEach((to, from, next) => {
    if(to.path === '/' && store.state.sideBoxOpen) {
      store.commit('CLOSE_SIDEBOX')
      setTimeout(function() {
        next()
      }, 100)
    } else {
      next()
    }
  })
  router.afterEach((to, from) => {
    setTimeout(() => {
      if (navigatorAction) {
        return;
      }
      if (document && to.meta.scrollToTop) {
        console.log(to)
        console.log("回到顶部")
        document.body.scrollTop = 0
      }
    }, 200)
  })
}


sync(store, router)

const app = new Vue({
  render: h => h(App),
  router,
  store
})
export { app, router, store }
