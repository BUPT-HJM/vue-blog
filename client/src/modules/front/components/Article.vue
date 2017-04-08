<template>
  <div class="article">
    {{post}}
  </div>
</template>
<script>
import articleApi from '../../../api/article.js'
export default {
  name: 'article',
  computed: {},
  data() {
    return {
      post: {}
    }
  },
  mounted() {},
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  methods: {
    fetchData() {
      articleApi.getArticle(this.$route.params.id)
        .then(res => {
          console.log(res)
          this.post = res.data.article;
          //this.getCurrentArticle(0);
        });
    }
  },
  watch: {}
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
