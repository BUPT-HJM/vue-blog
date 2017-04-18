<template>
  <div id="app">
    <Top></Top>
    <transition name="fade" mode="out-in">
      <!-- keep-alive排除article -->
      <keep-alive exclude="article">
        <router-view>
        </router-view>
      </keep-alive>
    </transition>
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
</style>
