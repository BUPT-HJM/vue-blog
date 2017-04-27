<template>
  <header class="top-header">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAD/h4/MvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAADlJREFUWMPt08ERACAIBDEomvqxBh18EQogn9us+HsJAAAAt0BPfQU8A2YKULKSdQAQmpIBAMBm4AAtdCIhmRB8RAAAAABJRU5ErkJggg==" alt="" class="top-header__menu-button" @click.stop="toggleSideBox">
    <router-link to="/" class="top-header__main-icon" @click.native='clearFilter'>HJM's Blog</router-link>
  </header>
</template>
<script>
import {
  mapActions,
  mapMutations
} from 'vuex'

export default {
  name: 'top-header',
  data() {
    return {}
  },
  created() {
  },
  methods: {
    ...mapActions([
      'getAllPosts'
    ]),
    ...mapMutations({
      toggleSideBox: 'TOGGLE_SIDEBOX',
      setSelectTags: 'SET_SELECT_TAGS'
    }),
    clearFilter() {
      this.setSelectTags([])
    }
  },
  computed: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../assets/stylus/_settings.styl'
  .top-header 
    position fixed
    top 0
    height 60px
    line-height @height
    width 100%
    box-shadow: 0 0 1px rgba(0,0,0,0.25);
    padding 0 40px 0 40px
    background white
    z-index 3
    &__main-icon
      text-decoration none
      color $blue
      font-weight 600
      font-size 20px
    &__menu-button
      position absolute
      left 10px
      top 50%
      width 32px
      height 32px
      margin-top -(@height/2)
      display none
  @media screen and (max-width: 850px) 
    .top-header 
      text-align center
      padding 0
      &__menu-button
        display block
</style>
