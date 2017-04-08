<template>
  <header class="header">
  </header>
</template>
<script>
export default {
  name: 'header',
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
</style>
