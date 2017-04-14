<template>
  <div id="app">
    <Top></Top> 
    <transition name="fade" mode="out-in">
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
	.fade-enter-active, .fade-leave-active
    transition all .5s

  .fade-enter, .fade-leave-active
  	opacity 0

  .fade-enter
    transform translateX(50px);

  .fade-leave-active
    transform translateX(-50px);

</style>
