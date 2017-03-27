import Axios from 'axios'
export default {
  createToken(username, password) {
    return Axios.post('/api/token', { username, password })
  }
}
