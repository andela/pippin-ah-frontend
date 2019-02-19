import types from './types';

const setCreateStatus = createStatus => ({
  type: types.SET_CREATE_STATUS,
  createStatus,
});

const setFetchArticleState = fetchArticleState => ({
  type: types.SET_FETCH_ARTICLE_STATE,
  fetchArticleState,
});

const setFetchArticleError = errorMessage => ({
  type: types.SET_FETCH_ARTICLE_ERROR,
  errorMessage,
});

// const setArticleCategory = articleCategory => ({
//   type: types.SET_ARTICLE_CATEGORY,
//   articleCategory,
// });

const addArticleData = (articleData, articleCategory) => ({
  type: types.ADD_ARTICLE_DATA,
  articleData,
  articleCategory,
});

export default {
  setFetchArticleState,
  setFetchArticleError,
  // setArticleCategory,
  addArticleData,
  setCreateStatus,
};
