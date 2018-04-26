import * as types from '../mutation-types';
import api from '../../../../api/article.js';
import tagApi from '../../../../api/tag.js';

const state = {
    articleList: [],
    tagList: [],
    currentArticle: {
        id: -1,
        index: -1,
        content: '',
        title: '',
        tags: [],
        save: true,
        publish: false,
    },
    allPage: 1,
    curPage: 1,
    selectTagArr: [],
};
// getters
const getters = {
    articleList: state => state.articleList,
    tagList: state => state.tagList,
    currentArticle: state => state.currentArticle,
    allPage: state => state.allPage,
    curPage: state => state.curPage,
    selectTagArr: state => state.selectTagArr,
};
// actions
const actions = {
    createArticle({ commit, state }, { title, content, publish, tags }) {
        return api.createArticle(title, content, publish, tags).then(res => {
            console.log(res.data);
            if (res.data.success) {
                const article = {
                    save: true,
                };
            }
            return new Promise((resolve, reject) => {
                resolve(res);
            });
        }).catch(err => {
            console.log(err);
            return new Promise((resolve, reject) => {
                reject(err);
            });
        });
    },
    getAllArticles({ commit, state, dispatch }, { tag = '', page = 1, limit = 0 } = {}) {
        return api.getAllArticles(tag, page, limit).then(res => {
            if (res.data.success) {
                commit(types.GET_ALL_ARTICLES, { articleList: res.data.articleArr, allPage: res.data.allPage, curPage: page });
                dispatch('getCurrentArticle', 0);
            }
            return new Promise((resolve, reject) => {
                resolve(res);
            });
        }).catch(err => {
            console.log(err);
            return new Promise((resolve, reject) => {
                reject(err);
            });
        });
    },
    getCurrentArticle({ commit, state }, index) {
        let article;
        console.log('currentIndex:', index);
        if (state.articleList.length === 0 || index === -1) {
            article = {
                id: -1,
                index: -1,
                title: '',
                content: '<!--more-->',
                save: true,
                publish: false,
                tags: [],
            };
        } else {
            article = {
                id: state.articleList[index].id,
                index: index,
                title: state.articleList[index].title,
                content: state.articleList[index].content,
                save: true,
                publish: state.articleList[index].publish,
                tags: state.articleList[index].tags,
            };
        }
        commit(types.GET_CURRENT_ARTICLE, article);
    },
    changeArticle({ commit, state }) {
        commit(types.CHANGE_ARTICLE);
    },
    saveArticle({ commit, state }, { id, article }) {
        return api.saveArticle(id, article).then(res => {
            if (res.data.success) {
                commit(types.SAVE_ARTICLE, { id, article });
            }
            return new Promise((resolve, reject) => {
                resolve(res);
            });
        });
    },
    publishArticle({ commit, state }, { id }) {
        return api.publishArticle(id).then(res => {
            if (res.data.success) {
                commit(types.PUBLISH_ARTICLE, id);
            }
            return new Promise((resolve, reject) => {
                resolve(res);
            });
        });
    },
    notPublishArticle({ commit, state }, { id }) {
        return api.notPublishArticle(id).then(res => {
            if (res.data.success) {
                commit(types.NOT_PUBLISH_ARTICLE, id);
            }
            return new Promise((resolve, reject) => {
                resolve(res);
            });
        });
    },
    deleteArticle({ commit, state }, { id, index }) {
        return api.deleteArticle(id).then(res => {
            if (res.data.success) {
                if (state.articleList.length <= 1) {
                    let article = {
                        id: -1,
                        index: 0,
                        title: '',
                        content: '',
                        save: false,
                        publish: false,
                    };
                    commit(types.GET_CURRENT_ARTICLE, article);
                }
            }
            return new Promise((resolve, reject) => {
                resolve(res);
            });
        });
    },
    createTag({ commit, state }, { name }) {
        return tagApi.createTag(name).then(res => {
            if (res.data.success) {
                commit(types.CREATE_TAG, res.data.tag);
            }
            return new Promise((resolve, reject) => {
                resolve(res);
            });
        });
    },
    getAllTags({ commit, state }) {
        return tagApi.getAllTags().then(res => {
            if (res.data.success) {
                commit(types.GET_ALL_TAGS, res.data.tagArr);
            }
            return new Promise((resolve, reject) => {
                resolve(res);
            });
        });
    },
    modifyTag({ commit, state }, { id, name }) {
        return tagApi.modifyTag(id, name).then(res => {
            if (res.data.success) {
                commit(types.MODIFY_TAG, { id, name });
            }
            return new Promise((resolve, reject) => {
                resolve(res);
            });
        });
    },
    deleteTag({ commit, state }, { id }) {
        return tagApi.deleteTag(id).then(res => {
            if (res.data.success) {
                commit(types.DELETE_TAG, id);
            }
            return new Promise((resolve, reject) => {
                resolve(res);
            });
        });
    },
    deleteCurrentTag({ commit, state }, { index }) {
        commit(types.DELETE_CURRENT_TAG, index);
        return new Promise((resolve, reject) => {
            resolve();
        });
    },
};

const mutations = {
    [types.CREATE_ARTICLE](state, article) {
        state.articleList.unshift(article);
        state.currentArticle = article;
    },
    [types.SAVE_ARTICLE](state, { id, article }) {
        state.currentArticle.save = true;
        let now = state.articleList.find(p => p.id === id);
        if (now) {
            now.title = article.title;
            now.content = article.content;
            now.abstract = article.abstract;
            now.tags = article.tags;
            now.lastEditTime = article.lastEditTime;
        }
    },
    [types.PUBLISH_ARTICLE](state) {
        state.currentArticle.publish = true;
    },
    [types.GET_ALL_ARTICLES](state, { articleList, allPage, curPage }) {
        state.articleList = articleList;
        state.allPage = allPage;
        state.curPage = curPage;
    },
    [types.GET_CURRENT_ARTICLE](state, article) {
        state.currentArticle = article;
    },
    [types.CHANGE_ARTICLE](state) {
        state.currentArticle.save = false;
    },
    [types.PUBLISH_ARTICLE](state, id) {
        state.currentArticle.publish = true;
        state.articleList.find(p => p.id === id).publish = true;
    },
    [types.NOT_PUBLISH_ARTICLE](state, id) {
        state.currentArticle.publish = false;
        state.articleList.find(p => p.id === id).publish = false;
    },
    [types.DELETE_ARTICLE](state, index) {
        state.articleList.splice(index, 1);
        if (state.articleList.length === 0) {
            return;
        }
        if (index > state.articleList.length - 1) {
            index = state.articleList.length - 1;
        }
        state.currentArticle = state.articleList[index];
        state.currentArticle.index = index;
        state.currentArticle.save = true;
    },
    [types.CREATE_TAG](state, tag) {
        state.currentArticle.tags.push(tag);
    },
    [types.MODIFY_TAG](state, name) {
        state.currentArticle.tags.push(name);

    },
    [types.DELETE_TAG](state, id) {
        state.tagList = state.tagList.filter((e) => {
            return e.id !== id;
        });
        state.currentArticle.tags = state.currentArticle.tags.filter((e) => {
            return e.id !== id;
        });
        state.selectTagArr = state.selectTagArr.filter((e) => {
            return e !== id;
        });

    },
    [types.DELETE_CURRENT_TAG](state, index) {
        state.currentArticle.tags.splice(index, 1);
    },
    [types.GET_ALL_TAGS](state, tagList) {
        state.tagList = tagList;
    },
    [types.SET_ALL_PAGE](state, allPage) {
        state.allPage = allPage;
    },
    [types.SET_CUR_PAGE](state, curPage) {
        state.curPage = curPage;
    },
    [types.TOGGLE_SELECT_TAG](state, id) {
        if (!state.selectTagArr.includes(id)) {
            state.selectTagArr.push(id);
        } else {
            state.selectTagArr = state.selectTagArr.filter((e) => {
                return e !== id;
            });
        }
    },
    [types.CLEAR_SELECT_TAG](state) {
        state.selectTagArr = [];
    },
};
export default {
    state,
    getters,
    actions,
    mutations,
};
