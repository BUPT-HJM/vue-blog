import Axios from 'axios'
// 为了让服务端渲染正确请求数据
if(typeof window == "undefined") {
  Axios.defaults.baseURL = 'http://127.0.0.1:8889';
}
export default {
  	createTag(name) {
      return Axios.post('/api/tags', {name:name})
    },
    getAllTags() {
      return Axios.get('/api/tags')
    },
    modifyTag(id, name) {
      return Axios.patch('/api/tags/' + id, name)
    },
    deleteTag(id) {
      return Axios.delete('/api/tags/' + id)
    }
}
