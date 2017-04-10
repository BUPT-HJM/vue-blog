<template>
  <div class="admin">
    <div class="admin__list">
      <list></list>
    </div>
    <div class="admin__editor">
      <editor></editor>
    </div>
  </div>
</template>
<script>
import Editor from './Editor.vue'
import List from './List.vue'
export default {
  name: 'admin',
  components: {
    Editor,
    List
  },
  data() {
    return {}
  },
  created() { //写成created：{}让你找不到错误= =

  },
  methods: {
  },
  computed: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.admin
  //display flex
  //flex-flow row wrap
  &__list
    position fixed 
    left 0
    top 0
    bottom 0
    width 500px
    overflow-y auto
    overflow-x hidden
  &__editor
    // width 200px
    margin-left 500px
    // flex-grow 1
    // flex-shrink 1
    // flex-wrap nowrap
</style>
