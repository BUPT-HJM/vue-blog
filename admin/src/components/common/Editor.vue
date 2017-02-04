<template>
  <div class="editor-box">
    <input type="text" placeholder="文章标题" v-model="articleTitle">
    <textarea id="editor"></textarea>
    <button @click="createArticle" v-if="currentArticle._id === -1">创建</button>
    <button @click="saveArticle('button')" v-else>保存</button>
    <template v-if="currentArticle._id !== -1">
      <button @click="publishArticle" v-if="!currentArticle.publish">发布</button>
      <button @click="notPublishArticle" v-else>撤回发布</button>
    </template>
    <button @click="deleteArticle">删除</button>
  </div>
</template>
<script>
import SimpleMDE from 'simplemde'
import css from 'simplemde/dist/simplemde.min.css'
import {
  mapGetters,
  mapActions
} from 'vuex'

let simplemde;
export default {
  name: 'editor',
  data() {
    return {
      articleTitle: this.title,
      articleContent: this.content,
    }
  },
  computed: {
    ...mapGetters([
      'currentArticle'
    ]),
  },
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  mounted: function() {
    simplemde = new SimpleMDE({
      //autoDownloadFontAwesome: false,
      element: document.getElementById("editor"),
      spellChecker: false,
    });
    simplemde.codemirror.on("change", () => {
      let value = simplemde.value();
      if (this.articleContent === value) {
        return;
      }
      if (this.currentArticle.save) {
        this.$store.dispatch('changeArticle');
        if (this.currentArticle._id !== -1) {
          this.saveArticle()
        }

      }
      this.articleContent = value;
    })
  },
  methods: {
    ...mapActions([
      'getCurrentArticle'
    ]),
    createArticle() {
      const info = {
        title: this.articleTitle,
        content: this.articleContent,
        publish: false
      }
      this.$store.dispatch('createArticle', info).then((res) => {
        if (res.data.success) {
          this.$message({
            message: '创建成功',
            type: 'success'
          });
        }
      }).catch((err) => {
        this.$message.error(err.response.data.error)
      })
    },
    saveArticle(a) {
      let abstract;
      if (this.articleContent.indexOf("<!--more-->") !== -1) {
        abstract = this.articleContent.split("<!--more-->")[0];
      } else {
        this.$message.error('请填写摘要');
        return;
      }
      const article = {
        title: this.articleTitle,
        content: this.articleContent,
        abstract: abstract,
        lastEditTime: new Date()
      }
      this.$store.dispatch('saveArticle', {
        id: this.currentArticle._id,
        article
      }).then((res) => {
        if (res.data.success && a === "button") {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        }
      }).catch((err) => {
        console.log(err);
        this.$message.error(err.response.data.error)
      })
    },
    publishArticle() {
      this.$store.dispatch('publishArticle', {
        id: this.currentArticle._id
      }).then((res) => {
        if (res.data.success) {
          this.$message({
            message: '发布成功',
            type: 'success'
          });
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error(err.response.data.error)
      })
    },
    notPublishArticle() {
      this.$store.dispatch('notPublishArticle', {
        id: this.currentArticle._id
      }).then((res) => {
        if (res.data.success) {
          this.$message({
            message: '撤回发布成功',
            type: 'success'
          });
        }
      }).catch((err) => {

        this.$message.error(err.response.data.error)
      })
    },
    deleteArticle() {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(this.currentArticle._id === -1) {
          this.getCurrentArticle(0)
          return;
        }
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
    }
  },
  watch: {
    content(val) {
      this.articleContent = val;
      simplemde.value(this.articleContent);
    },
    title(val) {
      this.articleTitle = val;
    },
    articleContent(val) {

    },
    articleTitle(val) {
      if (this.title !== val && this.currentArticle._id !== -1) {
        this.$store.dispatch('changeArticle');
        this.saveArticle()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
