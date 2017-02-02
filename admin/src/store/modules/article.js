import * as types from '../mutation-types'
import api from '../../api/article.js'
const state = {
    articleList: [],
    currentArticle: {
      id: -1,
      index: -1,
      title: '',
      save: false,
      publish: false
    }
  }
  // actions
const actions = {
  createArticle({ commit, state }, { title, content, publish }) {
    return api.createArticle(title, content, publish).then(res => {
      if (res.data.success) {
        const article = {
          id: res.data.id,
          index: 0,
          title: title,
          save: true,
          publish: false
        }
        commit(types.CREATE_ARTICLE, article);
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      });
    })
  }
}

const mutations = {
  [types.CREATE_ARTICLE](state, article) {
    state.articleList.unshift(article)
    state.currentArticle = article;
  },
  [types.SAVE_ARTICLE](state) {
    state.currentArticle.save = true;
  },
  [types.PUBLISH_ARTICLE](state) {
    state.currentArticle.publish = true;
  }
}
export default {
  state,
  actions,
  mutations
}
