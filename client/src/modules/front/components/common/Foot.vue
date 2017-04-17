<template>
  <footer class="footer" :class="{ 'footer--fixed': isFixed }">
    <p>Copyright © <a href='https://github.com/BUPT-HJM'>BUPT-HJM</a>&nbsp;&nbsp;2017 </p>
    <p>Created by <a href="https://github.com/BUPT-HJM/vue-blog.git">vue-blog</a></p>
  </footer>
</template>
<script>
import tagApi from 'api/tag.js'
import throttle from 'lib/throttle.js'
export default {
  name: 'footer',
  data() {
    return {
    }
  },
  props: {
    isFixed: {
      type: Boolean,
      required: false
    }
  },
  mounted() {

  },
  created() {
    
  },
  beforeDestroy() {

  },
  methods: {

  },
  computed: {},
  watch: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../assets/stylus/_settings.styl'
  .footer
    clear both
    text-align center
    color #bfbfbf
    text-align center
    height 60px
    line-height 20px
    a
      text-decoration none
      color #868686
      &:hover
        text-decoration underline
    &--fixed
      position fixed
      bottom 0
      left 50%
      width 400px
      margin-left -(@width/2)+125
  @media screen and (max-width: 850px) 
    .footer
      &--fixed
        width 400px
        margin-left -(@width/2)
</style>
