<template>
  <div class="article">
    <Side :isInList='false' :category='category'></Side>
    <div class="article__main">
      <h1 class="article__title">{{currentPost.title}}</h1>
      <p class="article__time">{{currentPost.createTime}}</p>
      <div class="article__content markdown-body" v-html="currentPostCompile" ref="post">
      </div>
    </div>
  </div>
</template>

<script>
import articleApi from 'api/article.js'
import marked from 'lib/marked.js'
import Side from './common/Side.vue'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: 'article',
  computed: {},
  data() {
    return {
      category: []
    }
  },
  computed: {
    ...mapGetters([
      'currentPost',
      'currentPostCompile'
    ]),
    compiledPost() {
      return this.compiledMarkdown(this.$store.state.currentPost.content)
    }
  },
  components: {
    Side
  },
  beforeMount() {
    this.getPost(this.$route.params.id).then(() => {
      this.$nextTick(() => {
        // 提取文章标签，生成目录
        Array.from(this.$refs.post.querySelectorAll("h1,h2,h3,h4,h5,h6")).forEach((item, index) => {
          item.id = item.localName + '-' + index;
          this.category.push({
            tagName: item.localName,
            text: item.innerText,
            href: '#' + item.localName + '-' + index
          })
        })
      })
    })
    
  },
  preFetch(store) {
    return store.dispatch('getPost',store.state.route.params.id)
  },
  mounted() {
    //this.compiledPost = this.compiledMarkdown(this.currentPost.content)
    //this.isLoading = false
  },
  methods: {
    ...mapActions([
      'getPost'
    ]),
    compiledMarkdown(value) {
      return marked(value)
    }
  }
}
</script>

<style lang="stylus">
  @import '../assets/stylus/markdown.styl'
</style>
<style lang="stylus" scoped>
@import '../assets/stylus/_settings.styl'
.article
  max-width 1000px
  margin 80px auto 0 auto
  padding 0 20px 0px 20px
  &__main
    margin-left 260px
    min-height 100%
  &__title
    font-size 24px
    word-break break-all
  &__time
    color #7f8c8d
    font-weight 400
    margin-bottom 10px
  &__loading
    position fixed
    top 50%
    left 50%
    width 300px
    height 200px
    margin-left -(@width/2)+125
    margin-top  -(@height/2)+60
@media screen and (max-width: 850px) 
  .article
    position relative
    &__main
      margin-left 0
    &__loading
      position absolute
      top 200px
      left 50%
      width 300px
      margin-left -(@width/2)
</style>
