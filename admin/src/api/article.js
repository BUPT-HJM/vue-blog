import Axios from 'axios'
export default {
  createArticle(title, content, publish) {
    let abstract = content.split("<!--more-->")[0];
    if(abstract.length === 1) {
    	abstract = ''
    }
    return Axios.post('/api/articles', { title, content, publish, abstract })
  }
}
