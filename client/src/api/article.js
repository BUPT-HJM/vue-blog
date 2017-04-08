import Axios from 'axios'
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
    saveArticle(id, article) {
      return Axios.patch('/api/articles/' + id, article)
    },
    publishArticle(id) {
      return Axios.patch('/api/articles/' + id, { publish: true })
    },
    notPublishArticle(id) {
      return Axios.patch('/api/articles/' + id, { publish: false })
    },
    deleteArticle(id) {
      return Axios.delete('/api/articles/' + id)
    },
    getArticle(id) {
      return Axios.get('/api/articles/' + id)
    }
}
