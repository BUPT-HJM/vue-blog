import Vue from 'vue'
import VueRouter from 'vue-router'
// import List from '../components/List.vue'
// import Article from '../components/Article.vue'

Vue.use(VueRouter)

const List = resolve => require(['../components/List.vue'], resolve)
const Article = resolve => require(['../components/Article.vue'], resolve)

export function createRouter() {
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
    routes: [
      { path: '/', component: List },
      { path: '/article/:id', component: Article, meta: { scrollToTop: true } },
      { path: '/page/:page', component: List },
      { path: '*', redirect: '/' }
    ]
  })
  if (typeof window !== "undefined") {
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
  return router
}
