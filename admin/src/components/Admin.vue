<template>
  <div class="admin">
    <list></list>
    <editor :content="currentArticle.content" :title="currentArticle.title"></editor>
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
</style>
