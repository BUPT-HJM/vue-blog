import * as types from '../mutation-types'
import api from '../../api/article.js'
const state = {
  articleList: [],
  currentArticle: {
    _id: -1,
    index: -1,
    content: '',
    title: '',
    save: true,
    publish: false
  }
};

// getters
const getters = {
  articleList: state => state.articleList,
  currentArticle: state => state.currentArticle
};
// actions
const actions = {
  createArticle({ commit, state }, { title, content, publish }) {
    return api.createArticle(title, content, publish).then(res => {
      if (res.data.success) {
        const article = {
          save: true
        }
        Object.assign(article,res.data.article)
        commit(types.CREATE_ARTICLE, article);
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      });
    })
  },
  getAllArticles({ commit, state }) {
    return api.getAllArticles().then(res => {
      if (res.data.success) {
        commit(types.GET_ALL_ARTICLES, res.data.articleArr);
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      });
    })
  },
  getCurrentArticle({ commit, state }, index) {
    let article;
    if (state.articleList.length == 0 || index == -1) {
      article = {
        _id: -1,
        index: -1,
        title: '',
        content: '<!--more-->',
        title: '',
        save: true,
        publish: false
      }
    } else {
      article = {
        _id: state.articleList[index]._id,
        index: index,
        title: state.articleList[index].title,
        content: state.articleList[index].content,
        title: state.articleList[index].title,
        save: true,
        publish: state.articleList[index].publish
      }
    }
    commit(types.GET_CURRENT_ARTICLE, article);
  },
  changeArticle({ commit, state }) {
    commit(types.CHANGE_ARTICLE)
  },
  saveArticle({ commit, state }, { id, article }) {
    return api.saveArticle(id, article).then(res => {
      if (res.data.success) {
        commit(types.SAVE_ARTICLE, { id, article })
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      });
    })
  },
  publishArticle({ commit, state }, { id }) {
    return api.saveArticle(id).then(res => {
      if (res.data.success) {
        commit(types.PUBLISH_ARTICLE, id)
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      });
    })
  },
  notPublishArticle({ commit, state }, { id }) {
    return api.saveArticle(id).then(res => {
      if (res.data.success) {
        commit(types.NOT_PUBLISH_ARTICLE, id)
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      });
    })
  },
  deleteArticle({ commit, state }, { id, index }) {
    return api.deleteArticle(id).then(res => {
      if (res.data.success) {
        if (state.articleList.length <= 1) {
          let article = {
            _id: -1,
            index: 0,
            title: '',
            content: '',
            title: '',
            save: false,
            publish: false
          }
          commit(types.GET_CURRENT_ARTICLE, article)
        }
        commit(types.DELETE_ARTICLE, index)

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
  [types.SAVE_ARTICLE](state, { id, article }) {
    state.currentArticle.save = true;
    const now = state.articleList.find(p => p._id === id)
    now.title = article.title;
    now.content = article.content;
    now.lastEditTime = article.lastEditTime;
  },
  [types.PUBLISH_ARTICLE](state) {
    state.currentArticle.publish = true;
  },
  [types.GET_ALL_ARTICLES](state, articleList) {
    state.articleList = articleList;
  },
  [types.GET_CURRENT_ARTICLE](state, article) {
    state.currentArticle = article;
  },
  [types.CHANGE_ARTICLE](state) {
    state.currentArticle.save = false;
  },
  [types.PUBLISH_ARTICLE](state, id) {
    state.currentArticle.publish = true;
    state.articleList.find(p => p._id === id).publish = true;
  },
  [types.NOT_PUBLISH_ARTICLE](state, id) {
    state.currentArticle.publish = false;
    state.articleList.find(p => p._id === id).publish = false;
  },
  [types.DELETE_ARTICLE](state, index) {
    state.articleList.splice(index, 1)
    if (state.articleList.length === 0) {
      return;
    }
    if (index > state.articleList.length - 1) {
      index = state.articleList.length - 1;
    }
    state.currentArticle = state.articleList[index];
    state.currentArticle.index = index;
    state.currentArticle.save = true;
  }

}
export default {
  state,
  getters,
  actions,
  mutations
}
