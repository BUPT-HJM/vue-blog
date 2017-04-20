<template>
  <div class="list">
    <Side :isInList='true'></Side>
    <div class="list__loading" v-if="isLoading">
      <Loading :loadingMsg='loadingMsg'></Loading>
    </div>
    <ul class="list__article">
      <li class="list__article__filterMsg" v-if="(selectTagArr.length !== 0)">
        筛选
        <span>{{filterMsg}}</span> 
        分类
      </li>
      <template v-if="articleList.length!==0 && isLoading == false">
        <li v-for="(article, index) in articleList" class="list__article__item">
          <h1 class="list__article__item__title"><router-link :to="'article/'+article.id">{{ article.title }}</router-link></h1>
          <div class="list__article__item__info">
            <p class="list__article__item__time">{{article.createTime}}</p>
            <div class="list__article__item__abstract markdown-body" v-html="compiledMarkdown(article.abstract)"></div>
            <!-- <span v-for="tag in article.tags"> {{tag.name}}</span> -->
            <p>
              <router-link :to="'article/'+article.id" class="continue-reading">继续阅读...</router-link>
            </p>
          </div>
        </li>
        <pagination :curPage='curPage' :allPage='allPage' @changePage='changePage'></pagination>
      </template>
      <div v-if="articleList.length==0 && isLoading==false" class="msg-box">
        <p>暂时没有相关文章</p>
      </div>
    </ul>
  </div>
</template>

<script>
import Pagination from 'publicComponents/Pagination.vue'
import Loading from 'publicComponents/Loading.vue'
import Side from './common/Side.vue'
import articleApi from 'api/article.js'
import marked from 'lib/marked.js'
export default {
  name: 'list',
  computed: {
    filterMsg() {
      let msg = ''
      this.selectTagArr.forEach((item) => {
        msg += item.name + '、'
      })
      return msg.replace(/、$/, '')
    }
  },
  components: {
    Pagination,
    Side,
    Loading
  },
  data() {
    return {
      allPage: 0,
      curPage: 1,
      limit: 5,
      selectTagArr: [],
      searchTag: [],
      articleList: [],
      tagList: [],
      sideBoxClose: false,
      isLoading: true,
      loadingMsg: '加载中...'
    }
  },
  created() {
    this.$eventBus.$on('filterListByTag', this.filterListByTag);
  },
  mounted() {
    articleApi.getAllPublishArticles('', '', this.limit).then(res => {
      this.allPage = res.data.allPage;
      this.articleList = res.data.articleArr;
      this.isLoading = false;
    });
  },
  methods: {
    compiledMarkdown(value) {
      return marked(value)
    },
    changePage(cur) {
      articleApi.getAllPublishArticles(this.searchTag, cur, this.limit).then(res => {
        this.allPage = res.data.allPage;
        this.articleList = res.data.articleArr;
        this.curPage = cur;
      });
    },
    filterListByTag({
      tag
    }) {
      if (this.selectTagArr.length == 0 && tag.length == 0) {
        return;
      }
      this.isLoading = true
      this.selectTagArr = tag
      this.searchTag = []
      if (tag.length) {
        tag.forEach((item) => {
          this.searchTag.push(item.id)
        })
      }
      articleApi.getAllPublishArticles(this.searchTag, '', this.limit).then(res => {
        this.allPage = res.data.allPage;
        this.articleList = res.data.articleArr;
        this.isLoading = false
      });
    }
  },
  watch: {}
}
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/_settings.styl'
.list
  padding 10px
  &__article
    list-style none
    margin-left 260px
  &__article__item
    margin 0 auto
    padding 10px
    margin-bottom 5px
    
  &__article__item__title
    font-size 24px
    word-break break-all
    a
      text-decoration none
      color black
  &__article__item__time
    color #7f8c8d
    font-weight 400
    margin-bottom 10px
    margin-top 2px
  &__article__item__abstract
    margin-bottom 5px
  .continue-reading
    text-decoration none
    color #0366d6
  &__article__filterMsg
    font-size 20px
    text-align center
    span
      color $blue
  &__loading
    position fixed
    top 50%
    left 50%
    width 300px
    height 200px
    margin-left -(@width/2)+125
    margin-top  -(@height/2)+60
  .msg-box
    position fixed
    top 50%
    left 50%
    width 200px
    height 200px
    margin-left -(@width/2)+125
    margin-top  -(@height/2)+60
    text-align center
    color #bfbfbf
    
@media screen and (max-width: 850px) 
  .list
    position relative
    &__article
      margin-left 0
    &__article__filterMsg
      font-size 18px
    .msg-box
      position absolute
      top 250px
      left 50%
      width 300px
      margin-left -(@width/2)
    &__loading
      position absolute
      top 250px
      left 50%
      width 300px
      margin-left -(@width/2)
    
</style>
