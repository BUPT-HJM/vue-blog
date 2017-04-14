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
Vue.prototype.$message = (options) => {
  options = Object.assign(options, { duration: 500 });
  return Message(options);
}
Vue.prototype.$message.error = (err) => {
  var options = {
    message: err,
    duration: 500,
    type: 'error'
  };
  return Message(options);
}


Vue.use(VueRouter)

const routes = [
  { path: '/admin/login', component: Login, meta: { authPage: true } },
  { path: '/admin', component: Admin }
  // {
  //   path: '*',
  //   redirect: '/admin' // 输入其他不存在的地址自动跳回首页
  // }
]


const router = new VueRouter({
  mode: 'history',
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
      next('/admin/login')
    }
  }
})

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    if(error.response.data.error.indexOf("token expired") !== -1) {
      store.commit("DELETE_TOKEN")
    }
    // Do something with response error
    return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
