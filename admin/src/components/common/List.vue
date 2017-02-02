<template>
  <div>
    <input type="text" placeholder="文章标题" v-model="title">
    <textarea id="editor"></textarea>
    <button>发布</button>
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
      title: '',
      content: ''
    }
  },
  mounted: function() {
    simplemde = new SimpleMDE({
      element: document.getElementById("editor"),
      spellChecker: false,
    });
    simplemde.codemirror.on("change", ()=>{
      let value = simplemde.value();
      if(this.content === value){
        return;
      }
      this.content = value;
    })
  },
  methods: {

  }
}
</script>
