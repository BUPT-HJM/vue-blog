<template>
  <div class="admin">
    <div class="admin__list">
      <list></list>
    </div>
    <div class="admin__editor">
      <editor :content="currentArticle.content" :title="currentArticle.title"></editor>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import Editor from './common/Editor.vue'
import List from './common/List.vue'

import {
  mapGetters,
  mapActions
} from 'vuex'
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
    test() {
      Axios.post('/api/123', 123);
    }
  },
  computed: {
    ...mapGetters([
      'currentArticle'
    ]),
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.admin
  display flex
  flex-flow row wrap
  &__list
    width 500px
  &__editor
    width 200px
    flex-grow 1
    flex-shrink 1
    flex-wrap nowrap
</style>
