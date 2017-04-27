import Axios from 'axios'
// 为了让服务端渲染正确请求数据
if(typeof window == "undefined") {
  Axios.defaults.baseURL = 'http://127.0.0.1:8889';
}
export default {
  createArticle(title, content, publish, tags) {
      let abstract;
      if (content.indexOf("<!--more-->") !== -1) {
        abstract = content.split("<!--more-->")[0];
      } else {
        abstract = '';
      }
      return Axios.post('/api/articles', { title, content, publish, abstract, tags })
    },
    getAllArticles(tag = '', page = 1, limit = 0) {
      return Axios.get(`/api/articles?tag=${tag}&page=${page}&limit=${limit}`)
    },
    getAllPublishArticles(tag = '', page = 1, limit = 0) {
      return Axios.get(`/api/publishArticles?tag=${tag}&page=${page}&limit=${limit}`)
    },
    saveArticle(id, article) {
      console.log(article)
      return Axios.patch('/api/articles/' + id, article)
    },
    publishArticle(id) {
      return Axios.patch('/api/articles/' + id, { "publish": true })
    },
    notPublishArticle(id) {
      return Axios.patch('/api/articles/' + id, { "publish": false })
    },
    deleteArticle(id) {
      return Axios.delete('/api/articles/' + id)
    },
    getArticle(id) {
      return Axios.get('/api/articles/' + id)
    }
}
