import Vue from 'vue'
import Axios from "axios"
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'

import App from './App.vue'

// 解决移动端300ms延迟问题
if (typeof window !== "undefined") {
  const Fastclick = require('fastclick')
  Fastclick.attach(document.body)
}

// 每次服务端请求渲染时会重新createApp，初始化这些store、router
// 不然会出现数据还是原来的数据没有变化的问题
export function createApp(ssrContext) {
  const store = createStore()
  const router = createRouter()

  sync(store, router)

  if (typeof window !== "undefined") {
    router.beforeEach((to, from, next) => {
      if (to.path === '/' && store.state.sideBoxOpen) {
        store.commit('CLOSE_SIDEBOX')
        setTimeout(function() {
          next()
        }, 100)
      } else {
        next()
      }
    })
  }

  const app = new Vue({
    router,
    store,
    ssrContext,
    render: h => h(App)
  })

  return { app, router, store }
}
