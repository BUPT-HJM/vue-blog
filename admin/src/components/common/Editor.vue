<template>
  <div>
    <input type="text" placeholder="文章标题" v-model="articleTitle">
    <textarea id="editor"></textarea>
    <button @click="createArticle" v-if="currentArticle._id === -1">创建</button>
    <button @click="saveArticle" v-else>保存</button>
    <button @click="publishArticle" v-if="!currentArticle.publish">发布</button>
    <button @click="notPublishArticle" v-else>撤回发布</button>
    <button @click="deleteArticle" v-if="currentArticle._id !== -1">删除</button>
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
      }
      this.articleContent = value;
    })
  },
  methods: {
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
    saveArticle() {
      let abstract;
      if (this.currentArticle.content.indexOf("<!--more-->") !== -1) {
        abstract = this.currentArticle.content.split("<!--more-->")[0];
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
        if (res.data.success) {
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
    }
  },
  watch: {
    content(val) {
      this.articleContent = val;
      simplemde.value(this.articleContent);
    },
    title(val) {
      this.articleTitle = val;
    }
  }
}
</script>

