import types from './types';

const setCreateStatus = createStatus => ({
  type: types.SET_CREATE_STATUS,
  createStatus,
});

const setSingleFetchStatus = singleFetchStatus => ({
  type: types.SET_SINGLE_FETCH_STATUS,
  singleFetchStatus,
});

const setFetchArticleState = fetchArticleState => ({
  type: types.SET_FETCH_ARTICLE_STATE,
  fetchArticleState,
});

const setFetchArticleError = errorMessage => ({
  type: types.SET_FETCH_ARTICLE_ERROR,
  errorMessage,
});

const setArticleCategory = articleCategory => ({
  type: types.SET_ARTICLE_CATEGORY,
  articleCategory,
});

const setCurrentPage = currentPage => ({
  type: types.SET_CURRENT_PAGE,
  currentPage,
});

const addArticleData = articleData => ({
  type: types.ADD_ARTICLE_DATA,
  articleData,
});

const addNewlyCreatedArticle = newArticle => ({
  type: types.ADD_NEWLY_CREATED_ARTICLE,
  newArticle,
});
const updateCategoryData = appendedCategoryData => ({
  type: types.UPDATE_CATEGORY_DATA,
  appendedCategoryData,
});

const setHighlightUploadStatus = highlightUploadStatus => ({
  type: types.SET_HIGHLIGHT_UPLOAD_STATUS,
  highlightUploadStatus,
});

const setBookmarkArticleState = bookmarkArticleState => ({
  type: types.SET_BOOKMARK_ARTICLE_STATE,
  bookmarkArticleState,
});

const setBookmarkArticleError = errorMessage => ({
  type: types.SET_BOOKMARK_ARTICLE_ERROR,
  errorMessage,
});

const setRemoveBookmarkError = errorMessage => ({
  type: types.SET_REMOVE_BOOKMARK_ERROR,
  errorMessage,
});

export default {
  setFetchArticleState,
  setFetchArticleError,
  setArticleCategory,
  addArticleData,
  updateCategoryData,
  setCurrentPage,
  setCreateStatus,
  setSingleFetchStatus,
  setHighlightUploadStatus,
  setBookmarkArticleState,
  setBookmarkArticleError,
  setRemoveBookmarkError,
  addNewlyCreatedArticle,
};
