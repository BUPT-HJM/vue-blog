<template>
  <div class="blog">
    <Top></Top>  
    <div class="blog__list">
      <list></list>
    </div>
  </div>
</template>
<script>
import List from './List.vue'
import Top from './common/Top.vue'

export default {
  name: 'blog',
  components: {
    List,
    Top
  },
  data() {
    return {}
  },
  created() {

  },
  methods: {
    test() {
      Axios.post('/api/123', 123);
    }
  },
  computed: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.blog
  //display flex
  //flex-flow row wrap
  &__list
    width 500px
    margin 0 auto
</style>
