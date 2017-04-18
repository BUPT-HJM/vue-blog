import Vue from 'vue'
import VueRouter from "vue-router";
import Axios from "axios";

import './assets/stylus/main.styl'

import App from './App'
import Blog from './components/Blog.vue'
import Article from './components/Article.vue'

// 解决移动端300ms延迟问题
import Fastclick from 'fastclick'
Fastclick.attach(document.body)


Vue.use(VueRouter)

const routes = [
  { path: '/', component: Blog },
  { path: '/article/:id', component: Article },
  { path: '/tag/:id', component: Blog },
  { path: '*', component: Blog }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 定义全局event bus,不使用vuex管理
var EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $eventBus: {
    get: function() {
      return EventBus;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
