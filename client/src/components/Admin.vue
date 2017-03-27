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
<<<<<<< HEAD:admin/src/components/Admin.vue
    // width 200px
    margin-left 500px
    // flex-grow 1
    // flex-shrink 1
    // flex-wrap nowrap
=======
    width 200px
    flex-grow 1
    flex-shrink 1
    flex-wrap nowrap
>>>>>>> 184e981bceaa0ad7a2d231edcee49322bd62f5bb:client/src/components/Admin.vue
</style>
