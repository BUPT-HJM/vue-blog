<template>
  <div class="list">
    <!-- <ul class="list__tag">
      <li class="list__tag__title">
        标签
      </li>
      <li v-for="tag in tagList" @click="toggleSelect(tag.id)" class="list__tag__item" :class="{ 'list__tag__item--active': selectTagArr.includes(tag.id)}">
        <span>{{tag.name}}</span>
      </li>
    </ul> -->
   <!--  <div class="list__me-box">
      <img src="http://7xp9v5.com1.z0.glb.clouddn.com/touxiang.png" alt="" class="list__me-box__img">
      <p>小深刻的秋鼠</p>
    </div> -->
    <ul class="list__article">
      <li v-for="(article, index) in articleList" class="list__article__item">
        <!-- <a :href="('/article/'+article.id)"> -->
          <h1 class="list__article__item__title"><router-link :to="'article/'+article.id">{{ article.title }}</router-link></h1>
          <div class="list__article__item__info">
            <p class="list__article__item__time">{{article.createTime}}</p>
            <p class="list__article__item__abstract markdown-body" v-html="compiledMarkdown(article.abstract)"></p>
            <span v-for="tag in article.tags"> {{tag.name}}</span>
            <p><router-link :to="'article/'+article.id" class="continue-reading">继续阅读...</router-link></p>
          </div>
          <!--  <p class="list__article__item__abstract">{{ article.abstract }}</p> -->
        <!-- </a> -->
      </li>
      <pagination :curPage='curPage' :allPage='allPage' @changePage='changePage'></pagination>
    </ul>
  </div>
</template>
<script>
import Pagination from '../../../components/Pagination.vue'
import articleApi from '../../../api/article.js'
import tagApi from '../../../api/tag.js'
import marked from '../../../lib/marked.js'
export default {
  name: 'list',
  computed: {
    
  },
  components: {
    Pagination
  },
  data() {
    return {
      searchKey: '',
      allPage: 0,
      curPage: 1,
      limit: 5,
      selectTagArr: [],
      articleList: [],
      tagList: []
    }
  },
  methods: {
    compiledMarkdown(value) {
      return marked(value)
    },
    toggleSelect(id) {
      if (!this.selectTagArr.includes(id)) {
        this.selectTag(id)
      } else {
        this.notSelectTag(id)
      }
    },
    selectTag(id) {
      this.selectTagArr.push(id);
    },
    notSelectTag(id) {
      this.selectTagArr = this.selectTagArr.filter((e) => {
        return e !== id;
      })
    },
    changePage(cur) {
      articleApi.getAllArticles('',cur,this.limit).then(res => {
        this.allPage = res.data.allPage;
        this.articleList = res.data.articleArr;
        this.curPage = cur;
      });
    }
  },

  mounted() {
    articleApi.getAllArticles('','',this.limit).then(res => {
      this.allPage = res.data.allPage;
      this.articleList = res.data.articleArr;
    });
    tagApi.getAllTags().then(res => {
      this.tagList = res.data.tagArr;
    });
  },
  watch: {
    selectTagArr(tag) {
      articleApi.getAllArticles(tag,'',this.limit).then(res => {
        this.allPage = res.data.allPage;
        this.articleList = res.data.articleArr;
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/_settings.styl'
.list
  //display flex
  padding 10px
  // &__tag
  //   display flex
  //   flex-direction row
  //   flex-wrap wrap
  //   list-style none
  // &__tag__title
  //   width 100%
  //   font-size 25px
  //   padding 10px
  //   color $dark-blue
  //   span
  //     padding-left 15px
  //   //background-color $dark-blue
  // &__tag__item
  //   //flex-grow 1
  //   flex-shrink 1
  //   background-color $dark-blue
  //   color white
  //   border-radius 5px
  //   text-align center
  //   margin 5px
  //   padding 7px
  //   cursor pointer
  // &__tag__item--active
  //   background-color $orange
  

  // &__me-box
  //   width 200px
  //   &__img
  //     width 100px


  &__article
    flex 1
    margin-top 5px
    list-style none
  &__article__item
    position relative
    width 850px
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
    &:hover
      text-decoration underline
    //cursor pointer
  // &__article__item--active
  //   border-left 10px solid $dark-blue
  // &__article__item__info
  //   position absolute
  //   bottom 5px
  //   right 15px
  //   text-align right
  // &__article__item__abstract
  //   width 100%
  //   max-height 50px   
  //   word-wrap: break-word; 
  //   word-break all
</style>
<style lang="stylus">
  // .markdown-body
  //   img
  //     width 100%
</style>
