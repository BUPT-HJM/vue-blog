<template>
  <div class="editor-box">
    <p class="editor-box__title"><i class="fa fa-pencil-square" aria-hidden="true"></i>&nbsp;&nbsp;请开始你的表演</p>
    <div class="editor-box__input-box">
      <label for="title">文章标题:</label>
      <input type="text" placeholder="文章标题" v-model="articleTitle" class="editor-box__input" id="title">
    </div>
    <div class="editor-box__input-box">
      <label for="title">添加标签:</label>
      <input type="text" placeholder="回车添加文章标签" v-model="articleTag" @keyup.enter="AddTag">
    </div>
    <ul class="editor-box__tagList">
      <li v-for="(tag, index) in currentArticle.tags">
        <span>{{tag.name}}</span>&nbsp;&nbsp;
        <i class="fa fa-trash-o" aria-hidden="true" @click="deleteCurrentTag(index)"></i>
      </li>
    </ul>
    <textarea id="editor"></textarea>
    <div class="editor-box__button-box">
      <button @click="createArticle" v-if="currentArticle.id === -1">创建</button>
      <button @click="saveArticle('button')" v-else>保存</button>
      <template v-if="currentArticle.id !== -1">
        <button @click="publishArticle" v-if="!currentArticle.publish">发布</button>
        <button @click="notPublishArticle" v-else>撤回发布</button>
      </template>
      <button @click="deleteArticle">删除</button>
    </div>
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
      articleTag: '',
      tags: []
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
    //console.log(1)
    simplemde = new SimpleMDE({
      autoDownloadFontAwesome: false,
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
        if (this.currentArticle.id !== -1) {
          this.articleContent = value;
          this.saveArticle()
        }

      }
      this.articleContent = value;
    })
  },
  methods: {
    ...mapActions([
      'getCurrentArticle',
      'getAllTags'
    ]),
    createArticle() {
      const info = {
        title: this.articleTitle,
        content: this.articleContent,
        publish: false,
        tags: this.currentArticle.tags
      }
      this.$store.dispatch('createArticle', info).then((res) => {
        if (res.data.success) {
          this.$message({
            message: '创建成功',
            type: 'success'
          });
          this.getCurrentArticle(0);
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
        tags: this.currentArticle.tags,
        lastEditTime: new Date()
      }
      this.$store.dispatch('saveArticle', {
        id: this.currentArticle.id,
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
        id: this.currentArticle.id
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
        id: this.currentArticle.id
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
        if (this.currentArticle.id === -1) {
          this.getCurrentArticle(0)
          return;
        }
        this.$store.dispatch('deleteArticle', {
          id: this.currentArticle.id,
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
    AddTag() {
      if (this.currentArticle.tags.find(p => p.name === this.articleTag)) {
        this.$message.error("该标签已存在")
      } else {
        if(this.currentArticle.tags.length >= 5) {
          this.$message({
            type: 'error',
            message: '不能创建超过5个标签'
          });
          return;
        }
        this.$store.dispatch('createTag', {
          name: this.articleTag
        }).then((res) => {
          if (res.data.success) {
            this.$message({
              message: '创建成功',
              type: 'success',
              duration:500
            });
            this.getAllTags();
            this.articleTag = ''
            if (this.currentArticle.id !== -1) {
              this.saveArticle()
            }
          }
        }).catch((err) => {
          this.$message.error(err.response.data.error)
        })
      }
    },
    deleteCurrentTag(index) {
      this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //console.log(1)
        this.$store.dispatch('deleteCurrentTag', index).then((res) => {
          //console.log(3)
          if (this.currentArticle.id !== -1) {
            this.saveArticle()
          }
          this.getAllTags();
        }).catch((err) => {
          this.$message.error(err)
        })
      }).catch(() => {});
    }
  },
  watch: {
    content(val) {
      this.articleContent = val;
      simplemde.value(this.articleContent);
    },
    title(val) {
      this.articleTitle = val;
      this.articleTag = '';
    },
    articleContent(val) {

    },
    articleTitle(val) {
      if (this.title !== val && this.currentArticle.id !== -1) {
        this.$store.dispatch('changeArticle');
        this.saveArticle()
        console.log(this.articleTitle)
      }
    },
    articleTag(val) {
      //if()
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '../../assets/stylus/_settings.styl'
  .editor-box 
    position relative
    padding 15px
    input
      padding 7px
      background-color $grey
    &__title
      font-size 25px
      color $dark-blue
      padding 10px
    &__input-box
      font-size 17px
      margin 15px 0    
    &__tagList
      list-style none
      overflow hidden
      margin-bottom 15px
      li
        float left
        height 30px
        line-height @height
        margin-right 20px  
        verticle-align center
        text-algin center
        //border 1px solid black
        border-radius 5px
        padding 0 5px
        cursor pointer
      li:hover
        background-color $grey
    &__button-box
      float right
      margin 10px
      button
        width 80px
        padding 5px
        background-color $dark-blue
        color white
        margin-left 15px
</style>
