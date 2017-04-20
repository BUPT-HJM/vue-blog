<template>
  <div id="app">
    <div class="wrap">
      <Top></Top>
      <transition name="fade" mode="out-in">
        <!-- keep-alive排除article -->
        <keep-alive exclude="article">
          <router-view>
          </router-view>
        </keep-alive>
      </transition>
    </div>
    <footer class="footer">
      <p>Copyright © <a href='https://github.com/BUPT-HJM'>BUPT-HJM</a>&nbsp;&nbsp;2017 </p>
      <p>Created by <a href="https://github.com/BUPT-HJM/vue-blog.git">vue-blog</a></p>
    </footer>
  </div>
</template>

<script>
import Top from './components/common/Top.vue'

export default {
  name: 'app',
  components: {
    Top
  }
}
</script>

<style lang="stylus">
  @import 'assets/stylus/main.styl'
  @import 'assets/stylus/markdown.styl'
  $footer-height = 60px
  #app
    width 100%
    height 100%
    
	.fade-enter-active, .fade-leave-active
    transition opacity .2s

  .fade-enter, .fade-leave-active
  	opacity 0 
  // side组件 position fixed会跟transform影响，还没有解决，暂时放弃transform 
  // .fade-enter
  //   transform translate(50px, 0px)

  // .fade-leave-active
  //   transform translate(-50px, 0px)
  .wrap 
    min-height 100%
    margin-bottom -($footer-height)
  .wrap:after
    content ""
    display block
    height $footer-height
  .footer 
    height $footer-height
    text-align center
    color $grey
    text-align center
    line-height 20px
    a
      text-decoration none
      color $blue-link
      &:hover
        text-decoration underline
</style>
