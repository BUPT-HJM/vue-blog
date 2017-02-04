// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from "vue-router";
import Axios from "axios";

import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';

import './assets/stylus/main.styl'

import App from './App'
import Login from './components/Login.vue'
import Admin from './components/Admin.vue'

import store from './store'

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Login, meta: { authPage: true } },
  { path: '/admin', component: Admin }, {
    path: '*',
    redirect: '/' // 输入其他不存在的地址自动跳回首页
  }
]


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(store.state);
  console.log(to)
  if (to.meta.authPage) { //login
    console.log("login")
    if (store.state.auth.token) {
      next('/admin')
    }
    next()
  } else {
    console.log("admin")
    if (store.state.auth.token) {
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.auth.token; // 全局设定header的token验证，注意Bearer后有个空格
      next()
    } else {
      console.log('没有token')
      next('/')
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
