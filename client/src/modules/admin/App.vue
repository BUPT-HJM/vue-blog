<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view>
      </router-view>
    </transition>
  </div>
</template>

<script>
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
