<template>
  <div class="hello">
    <editor :content="content" :title="title"></editor>
  </div>
</template>
<script>
import Axios from 'axios'
import Editor from './common/Editor.vue'
export default {
  name: 'hello',
  components: {
    Editor
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      content: '',
      title: ''
    }
  },
  methods: {
    test() {
      Axios.post('/api/123', 123);
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>
