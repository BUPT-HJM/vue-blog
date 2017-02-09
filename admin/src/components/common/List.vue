<template>
  <ul class="list">
    <li v-for="tag in tagList" @click="selectTag(tag.id)">{{tag.name}}<span v-if="selectTagArr.includes(tag.id)" @click.stop="notSelectTag(tag.id)">&nbsp;&nbsp;&nbsp;&nbsp;选中</span><span @click.stop="deleteTagFn(tag.id)">&nbsp;&nbsp;&nbsp;&nbsp;X</span></li>
    <li>----</li>
    <li @click="createArticle" class="list__item_button">新建</li>
    <li v-for="(article, index) in articleList" @click="switchArticle(index)" class="list__item">
      {{ article.title }} &nbsp;&nbsp;&nbsp;&nbsp;<span v-for="tag in article.tags"> {{tag.name}}</span>
      <span @click.stop="deleteArticle" v-if="currentArticle.index == index">&nbsp;&nbsp;&nbsp;&nbsp;X</span>
    </li>
    <pagination :cur='curPage' :all='allPage'></pagination>
  </ul>
</template>
<script>
import Pagination from './Pagination.vue'
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  name: 'list',
  computed: {
    ...mapGetters([
      'articleList',
      'tagList',
      'currentArticle'
    ])
  },
  components: {
    Pagination
  },
  data() {
    return {
      "activeIndex": 0,
      "searchKey": '',
      allPage: 0,
      curPage: 1,
      selectTagArr: []
    }
  },
  methods: {
    ...mapActions([
      'getAllArticles',
      'getAllTags',
      'getCurrentArticle',
      'deleteTag'
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
    },
    deleteArticle() {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('deleteArticle', {
          id: this.currentArticle._id,
          index: this.currentArticle.index
        }).then((res) => {
          if (res.data.success) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }
        }).catch((err) => {
          console.log(err)
          this.$message.error(err.response.data.error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    selectTag(id) {
      this.selectTagArr.push(id);
    },
    notSelectTag(id) {
      this.selectTagArr = this.selectTagArr.filter((e) => {
        return e !== id;
      })
    },
    deleteTagFn(id) {
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteTag({
          id
        }).then((res) => {
          if (res.data.success) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.notSelectTag(id)
            this.getAllArticles({
              tag: this.selectTagArr
            })
          }
        }).catch((err) => {
          console.log(err)
          this.$message.error(err.response.data.error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    }
  },

  mounted() {
    this.getAllArticles().then(res => {
      this.allPage = res.data.allPage;
      this.getCurrentArticle(0);
    });
    this.getAllTags();
  },
  watch: {
    selectTagArr(val) {

      this.getAllArticles({
        tag: val
      }).then(res => {
        this.allPage = res.data.allPage;
        //this.getCurrentArticle(0);
      });
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
