<template>
  <div>
    <input type="text" placeholder="文章标题" v-model="articleTitle">
    <textarea id="editor"></textarea>
    <button @click="saveArticle">保存</button>
    <button @click="publishArticle">发布</button>
  </div>
</template>
<script>
import SimpleMDE from 'simplemde'
import css from 'simplemde/dist/simplemde.min.css'
let simplemde;
export default {
  name: 'editor',
  data() {
    return {
      articleTitle: this.title,
      articleContent: this.content
    }
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
      element: document.getElementById("editor"),
      spellChecker: false,
    });
    simplemde.codemirror.on("change", () => {
      let value = simplemde.value();
      if (this.articleContent === value) {
        return;
      }
      this.articleContent = value;
    })
  },
  methods: {
    saveArticle() {
      const info = {
        title: this.articleTitle,
        content: this.articleContent,
        publish: false
      }
      this.$store.dispatch('createArticle', info).then((res) => {
        if (res.data.success) {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        }
      }).catch((err,res) => {
        this.$message.error(err.response.data)
      })
    },
    publishArticle() {

    }
  },
  watch: {
    content(val) {
      this.articleContent = val;
    },
    title(val) {
      this.articleTitle = val;
    }
  }
}
</script>
