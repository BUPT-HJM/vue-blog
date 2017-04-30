import Vue from 'vue'
import VueRouter from "vue-router";
import Axios from "axios";

import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';

import './assets/stylus/main.styl'

import App from './App.vue'
import store from './store'

// 按需引入element-ui相关弹出
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = (options) => { //重新定义默认参数
  options = Object.assign(options, { duration: 500 });
  return Message(options);
}
Vue.prototype.$message.error = (err) => { //重新定义默认参数
  var options = {
    message: err,
    duration: 500,
    type: 'error'
  };
  return Message(options);
}

Vue.use(VueRouter)

const Login = resolve => require(['./components/Login.vue'], resolve)
const Admin = resolve => require(['./components/Admin.vue'], resolve)
const routes = [
  { path: '/admin/login', component: Login, meta: { authPage: true } },
  { path: '/admin', component: Admin }, {
    path: '*',
    redirect: '/admin' // 输入其他不存在的地址自动跳回首页
  }
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

// axios拦截返回，拦截token过期
Axios.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  if (error.response.data.error.indexOf("token") !== -1) {
    store.commit("DELETE_TOKEN")
  }
  return Promise.reject(error);
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
