<template>
  <div>
    <ul id="example-1">
      <li v-for="(article, index) in articleList" @click="switchArticle(index)">
        {{ article.title }}   {{ article.createTime }}
      </li>
      <li @click="createArticle">新建</li>
    </ul>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  name: 'list',
  computed: {
    ...mapGetters([
      'articleList',
      'currentArticle'
    ]),
  },
  methods: {
    ...mapActions([
      'getAllArticles',
      'getCurrentArticle'
    ]),
    switchArticle(index) {
      if (!this.currentArticle.save) {
        this.$message.error('请先保存当前文章');
        return;
      }
      this.getCurrentArticle(index);
    },
    createArticle() {
      this.getCurrentArticle(-1);
    }
  },

  mounted() {
    this.getAllArticles().then(res => {
      this.getCurrentArticle(0);
    });
    //this.getCurrentArticle();
    //console.log(articles)
  }
}
</script>
<style lang="stylus" scoped>
    li
      cursor pointer
</style>
