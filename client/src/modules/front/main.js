// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from "vue-router";
import Axios from "axios";

import './assets/stylus/main.styl'

import App from './App'
import Blog from './components/Blog.vue'
import Article from './components/Article.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Blog},
  { path: '/article/:id', component: Article }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
