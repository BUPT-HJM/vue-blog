<template>
  <div class="list">
    <ul class="list__tag">
      <li class="list__tag__title">
        标签
      </li>
      <li v-for="tag in tagList" @click="toggleSelect(tag.id)" class="list__tag__item" :class="{ 'list__tag__item--active': selectTagArr.includes(tag.id)}">
        <span>{{tag.name}}</span>
      </li>
    </ul>
    <ul class="list__article">
      <li v-for="(article, index) in articleList" class="list__article__item">
        <a :href="('/article/'+article.id)">
          <h1>{{ article.title }}</h1>
          <div class="list__article__item__info">
            <span v-for="tag in article.tags"> {{tag.name}}</span>
            <p class="list__article__item__abstract">{{article.createTime}}</p>
            <!-- <i class="fa fa-trash-o" aria-hidden="true" @click.stop="deleteArticle" v-if="currentArticle.index == index"></i> -->
          </div>
          <!--  <p class="list__article__item__abstract">{{ article.abstract }}</p> -->
        </a>
      </li>
      <pagination :curPage='curPage' :allPage='allPage' @changePage='changePage'></pagination>
    </ul>
  </div>
</template>
<script>
import Pagination from '../../../components/Pagination.vue'
import articleApi from '../../../api/article.js'
import tagApi from '../../../api/tag.js'
export default {
  name: 'list',
  computed: {},
  components: {
    Pagination
  },
  data() {
    return {
      searchKey: '',
      allPage: 0,
      curPage: 1,
      limit: 10,
      selectTagArr: [],
      articleList: [],
      tagList: []
    }
  },
  methods: {
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
  padding 15px
  &__tag
    display flex
    flex-direction row
    flex-wrap wrap
    list-style none
  &__tag__title
    width 100%
    font-size 25px
    padding 10px
    color $dark-blue
    span
      padding-left 15px
    //background-color $dark-blue
  &__tag__item
    //flex-grow 1
    flex-shrink 1
    background-color $dark-blue
    color white
    border-radius 5px
    text-align center
    margin 5px
    padding 7px
    cursor pointer
  &__tag__item--active
    background-color $orange


  &__article
    margin-top 5px
    list-style none
  &__article__button
    padding 10px
    font-size 25px
    color $dark-blue
    cursor pointer
  &__article__item
    position relative
    width 100%
    height 100px
    background-color $grey
    padding 15px
    margin-bottom 5px
    cursor pointer
  &__article__item--active
    border-left 10px solid $dark-blue
  &__article__item__info
    position absolute
    bottom 5px
    right 15px
    text-align right
  &__article__item__abstract
    width 100%
    max-height 50px   
    word-wrap: break-word; 
    word-break all
</style>
