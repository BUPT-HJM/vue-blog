<template>
  <div class="article">
    <div class="article__loading" v-if='isLoading'>
      <Loading :loadingMsg='loadingMsg'></Loading>
    </div>
    <Side :isInList='false' :category='category'></Side>
    <div class="article__main">
      <h1 class="article__title">{{post.title}}</h1>
      <p class="article__time">{{post.createTime}}</p>
      <div class="article__content markdown-body" v-html="compiledPost" ref="post">
      </div>
    </div>
  </div>
</template>

<script>
import articleApi from 'api/article.js'
import marked from 'lib/marked.js'
import Side from './common/Side.vue'
import Loading from 'publicComponents/Loading.vue'
export default {
  name: 'article',
  computed: {},
  data() {
    return {
      post: {},
      compiledPost: '',
      category: [],
      hash: '',
      loadingMsg: '加载中...',
      isLoading: true,
      over: false
    }
  },
  components: {
    Side,
    Loading
  },
  mounted() {
    this.hash = window.location.hash
    window.location.hash = '#'
  },
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
            window.location.hash = this.hash
            this.isLoading = false
          })
        });
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
