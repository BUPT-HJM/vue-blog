<template>
  <div class="article">
    <h1 class="article__title">{{post.title}}</h1>
    <p class="article__time">{{post.createTime}}</p>
    <div class="article__content markdown-body" v-html="compiledPost">
    </div>
  </div>
</template>
<script>
import articleApi from '../../../api/article.js'
import marked from '../../../lib/marked.js'
export default {
  name: 'article',
  computed: {},
  data() {
    return {
      post: {},
      compiledPost: ''
    }
  },
  mounted() {},
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  methods: {
    compiledMarkdown(value) {
      return marked(value)
    },
    fetchData() {
      articleApi.getArticle(this.$route.params.id)
        .then(res => {
          console.log(res)
          this.post = res.data.article;
          this.compiledPost = this.compiledMarkdown(this.post.content)
          //this.getCurrentArticle(0);
        });
    }
  },
  watch: {}
}
</script>


<style lang="stylus" scoped>
@import '../assets/stylus/_settings.styl'
.article
  max-width 850px
  margin 80px auto 0 auto
  padding 0 20px 20px 20px
  &__title
    font-size 28px
  &__time
    color #7f8c8d
    font-weight 400
    margin-bottom 10px
    
    
  
    
</style>
