import * as types from './mutation-types'
import api from '../api/login.js'
export function createToken(store, username, password) {
  return api.createToken(username, password).then(res => {
    if (res.success) {
      store.dispatch(types.CREATE_TOKEN, res.data.token);
      this.$router.push('/admin');
    }
  });
}
