<template>
  <header class="top-header">
    <router-link to="/" class="top-header__main-icon">HJM's Blog</router-link>
  </header>
</template>
<script>
export default {
  name: 'top-header',
  data() {
    return {}
  },
  created() {
  },
  methods: {
  },
  computed: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../assets/stylus/_settings.styl'
  .top-header 
    position fixed
    top 0
    height 60px
    line-height @height
    width 100%
    box-shadow: 0 0 1px rgba(0,0,0,0.25);
    padding 0 40px 0 40px
    background white
    z-index 2
    &__main-icon
      text-decoration none
      color $dark-blue
      font-weight 600
      font-size 20px
  @media screen and (max-width: 850px) 
    .top-header 
      text-align center
</style>
