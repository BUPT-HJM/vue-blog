import Axios from 'axios'
export default {
  createToken(username, password) {
    return Axios.post('/auth/token', { username, password })
  }
}
