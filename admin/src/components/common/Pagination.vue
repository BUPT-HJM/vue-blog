<template>
  <ul class="pagination">
    <li class="pagination__button" @click="prevPage"><i class="fa fa-chevron-left" aria-hidden="true"></i>
</li>
    <li class="pagination__item" v-for="page in pageArr" @click="switchPage(page)" :class="{'pagination__item--active':page==curPage}">{{page}}
    </li>
    <li class="pagination__button" @click="nextPage"><i class="fa fa-chevron-right" aria-hidden="true"></i></li>
  </ul>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  name: 'pagination',
  data() {
    return {
      curPage: this.cur,
      allPage: this.all,
    }
  },

  computed: {
    pageArr() {
      let arr = [];
      if (this.allPage <= 7) { //1 2 3 4 5 6 7
        for (let i = 1; i <= this.allPage; i++) {
          arr.push(i);
        }
      } else {
        if (this.curPage - 1 < 3) { //1 2 3 4 ... allpage
          for (let i = 1; i <= this.curPage + 1; i++) {
            arr.push(i);
          }
          arr.push('...');
          arr.push(this.allPage)
        } else if (this.allPage - this.curPage < 3) { // 1 ... 34 35 36 37
          arr.push(1);
          arr.push('...');
          for (let i = this.curPage - 1; i <= this.allPage; i++) {
            arr.push(i);
          }
        } else { //1 ... 3 4 5 ... 37
          arr.push(1);
          arr.push('...');
          arr.push(this.curPage - 1);
          arr.push(this.curPage);
          arr.push(this.curPage + 1);
          arr.push('...');
          arr.push(this.allPage);
        }
      }
      return arr;
    }
  },
  props: {
    cur: {
      type: Number,
      required: true
    },
    all: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'getAllArticles',
      'getCurrentArticle'
    ]),
    prevPage() {
      if (this.curPage == 1) {
        return;
      }
      this.curPage--;
    },
    nextPage() {
      if (this.curPage == this.allPage) {
        return;
      }
      this.curPage++;
    },
    switchPage(page) {
      if (page == '...') {
        return;
      }
      this.curPage = page;
    }
  },
  watch: {
    curPage(val) {
      this.getAllArticles({
        page: val
      }).then(res => {
        this.getCurrentArticle(0);
      });
    },
    all(val) {
      this.allPage = val;
    },
    cur(val) {
      this.curPage = val;
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/stylus/_settings.styl'
.pagination
  display flex
  max-width 300px
  list-style none
  margin 25px auto
  .pagination__button
    flex 1
    text-align center
    color $dark-blue
    cursor pointer
  .pagination__item
    flex 1
    text-align center
    cursor pointer
    margin 0 10px
    &:hover
      background-color $grey
  .pagination__item--active
    background-color $grey
</style>
