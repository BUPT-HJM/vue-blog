<template>
  <div class="sideBox" :class="{ 'sideBox--open': sideBoxOpen}">
    <div class="mask" @click="closeSideBox"></div>
      <img src="http://7xp9v5.com1.z0.glb.clouddn.com/touxiang.png" alt="" class="sideBox__img">
      <p class="sideBox__name">小深刻的秋鼠</p>
      <p class="sideBox__motto">Love Life, Love sharing</p>
      <ul class="sideBox__tagList" v-if="isInList">
        <li v-for="tag in tagList" class="sideBox__tagItem" :class="{ 'sideBox__tagItem--active': (typeof selectTagArr.find(function(e){return e.id == tag.id}) !== 'undefined')}" @click="toggleSelect(tag.id, tag.name)">
          <span>{{tag.name}}</span>
        </li>
      </ul>
      <div class="categoryBox" v-if="!isInList" :class="{ 'categoryBox--fixed': (scrollTop >236)}" ref="categoryBox">
        <p class="categoryBox__title">文章目录</p>
        <ul>
          <li v-for="item in category" :class="'categoryBox__'+item.tagName">
            <a :href="item.href">{{item.text}}</a>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import tagApi from '../../../../api/tag.js'
import throttle from '../../../../lib/throttle.js'
export default {
  name: 'sideBox',
  data() {
    return {
      tagList: [],
      selectTagArr: [],
      sideBoxOpen: false,
      scrollTop: 0
    }
  },
  props: {
    isInList: {
      type: Boolean,
      required: true
    },
    category: {
      type: Array,
      required: false
    }
  },
  mounted() {
    tagApi.getAllTags().then(res => {
      this.tagList = res.data.tagArr;
    });
  },
  created() {
    this.$eventBus.$on('toggleSideBox', this.toggleSideBox);
    this.$eventBus.$on('clearSelectTagArr', this.clearSelectTagArr)
    window.addEventListener('scroll', throttle(this.getScrollTop, 50))
  },
  methods: {
    toggleSideBox() {
      this.sideBoxOpen = !this.sideBoxOpen;
    },
    closeSideBox() {
      this.sideBoxOpen = false
    },
    toggleSelect(id, name) {
      if (typeof this.selectTagArr.find(function(e){return e.id == id}) == 'undefined') {
        this.selectTagArr.push({id,name})
      } else {
        this.selectTagArr = this.selectTagArr.filter((e) => {
          return e.id !== id;
        })
      }
      this.$eventBus.$emit('filterListByTag', {
        tag: this.selectTagArr
      });
    },
    getScrollTop() {
      let scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;　　
      if (document.body) {　　　　
        bodyScrollTop = document.body.scrollTop;　　
      }　　
      if (document.documentElement) {　　　　
        documentScrollTop = document.documentElement.scrollTop;　　
      }　　
      this.scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    },
    clearSelectTagArr() {
      this.selectTagArr = []
    }
  },
  computed: {},
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../assets/stylus/_settings.styl'
  .sideBox
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
    .categoryBox
      padding-left 20px
      padding-right 15px
      &__title
        margin-top 15px
        margin-bottom 10px
        font-weight 400
        color #808080
        font-size 18px
      ul
        list-style none
      li
        text-align left
        //list-style-type: square;
        margin-bottom 5px
        word-wrap break-word
        word-break all
        a
          color #bfbfbf
          text-decoration none
          margin-left -18px
          word-wrap break-word
          word-break break-all
          &:hover
            color $dark-blue 
            text-decoration underline
      &__h1 
        margin-left 0 
      &__h2
        margin-left 20px
      &__h3
        margin-left 40px
      &__h4
        margin-left 60px
      &__h5
        margin-left 80px 
      &__h6
        margin-left 100px
    .categoryBox--fixed
      position fixed
      top 60px 
      width 200px     
  @media screen and (max-width: 850px) 
    .sideBox
      position fixed
      left -250px
      top 60px
      //width 0px
      height 100%
      transition left 0.3s
      -webkit-transtion left 0.3s
      background-color white
      .mask
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        display none
      &--open
        left 0
        width 250px
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        z-index 2
        opacity 1
        transition left 0.3s
        -webkit-transtion left 0.3s
        .mask
          display block
          z-index -1
      &__tagItem:hover
        color #bfbfbf
      &__tagItem--active:hover
        color $dark-blue
      .categoryBox--fixed
        position static  
</style>
