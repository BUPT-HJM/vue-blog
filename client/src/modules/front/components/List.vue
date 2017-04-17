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
            <p><router-link :to="'article/'+article.id" class="continue-reading">继续阅读...</router-link></p>
          </div>
        </li>
        <pagination :curPage='curPage' :allPage='allPage' @changePage='changePage'></pagination>
      </template>
      <div v-if="articleList.length==0 && isLoading==false" class="msg-box">
        <p>暂时没有相关文章</p>
      </div>
      <Foot :isFixed="footerIsFixed"></Foot>  
    </ul>
  </div>
</template>
<script>
import Pagination from 'publicComponents/Pagination.vue'
import Loading from 'publicComponents/Loading.vue'
import Side from './common/Side.vue'
import Foot from './common/Foot.vue'
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
      return msg.replace(/、$/,'')
    }
  },
  components: {
    Pagination,
    Side,
    Loading,
    Foot
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
      loadingMsg: '加载中...',
      footerIsFixed: false
    }
  },
  created() {
    this.$eventBus.$on('filterListByTag', this.filterListByTag);
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
    filterListByTag({tag}) {
      if(this.selectTagArr.length == 0 && tag.length == 0) {
        return;
      }
      this.isLoading = true
      this.selectTagArr = tag
      this.searchTag = []
      if(tag.length) {
        tag.forEach((item) => {
          this.searchTag.push(item.id)
        })
      }
      articleApi.getAllPublishArticles(this.searchTag,'',this.limit).then(res => {
        this.allPage = res.data.allPage;
        this.articleList = res.data.articleArr;
        this.isLoading = false
        if(this.articleList.length == 0) {
          this.footerIsFixed = true
        } else {
          this.footerIsFixed = false
        }
        this.$nextTick(() => {
          // DOM updated
          if(document.querySelector('.list__article').getBoundingClientRect().height < 550) {
              this.footerIsFixed = true
           } else {
              this.footerIsFixed = false
           }
        })   
      });
    }
  },

  mounted() {
    articleApi.getAllPublishArticles('','',this.limit).then(res => {
      this.allPage = res.data.allPage;
      this.articleList = res.data.articleArr;
      this.isLoading = false;
    });
  },
  watch: {
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/_settings.styl'
.list
  padding 10px
  &__sideBox
    width 200px
    float left
    text-align center
    &__img
      width 150px
      border-radius 50%
      box-shadow 0 0 2px black
      margin-top 10px
    &__name
      color #808080
      font-size 20px
      margin-top 5px
      margin-bottom 5px
    &__motto
      color #bfbfbf
      margin-bottom 10px
    
    &__tagList
      list-style none
    &__tagItem
      display inline-block
      border 1px solid #bfbfbf
      border-radius 4px
      margin 5px
      padding 10px
      color #bfbfbf
      cursor pointer
      &:hover
        color $dark-blue
    &__tagItem--active
      color $dark-blue
      border 1px solid $dark-blue


  &__article
    //flex 1
    //max-width 800px
    margin-top 5px
    list-style none
    margin-left 250px
  &__article__item
    //position relative
    margin 0 auto
    padding 10px
    margin-bottom 5px
    
  &__article__item__title
    font-size 28px
    a
      text-decoration none
      color black
  &__article__item__time
    color #7f8c8d
    font-weight 400
    margin-bottom 10px
  &__article__item__abstract
    margin-bottom 5px
  .continue-reading
    text-decoration none
    color #0366d6
  &__article__filterMsg
    font-size 20px
    text-align center
    span
      color $dark-blue
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
