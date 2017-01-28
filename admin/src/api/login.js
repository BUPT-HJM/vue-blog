import api from './index'
export default {
  createToken(username, password) {
    return api.post('/api/123', { username, password })
  }
}
