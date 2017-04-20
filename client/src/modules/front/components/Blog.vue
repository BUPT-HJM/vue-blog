<template>
  <div class="blog"> 
    <div class="blog__list">
      <list></list>
    </div>
  </div>
</template>
<script>
import List from './List.vue'

export default {
  name: 'blog',
  components: {
    List
  },
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
<style lang="stylus">
  @import '../assets/stylus/markdown.styl'
</style>
<style lang="stylus" scoped>
.blog
  &__list
    max-width 1000px
    margin 0 auto
    padding-top 60px
</style>
