import axios from 'axios';
import actions from './actions';
import constants from './constants';

const url = 'https://learnground-api-staging.herokuapp.com/api/v1/articles';
const {
  setCreateStatus,
  setFetchArticleState,
  setFetchArticleError,
  setArticleCategory,
  addArticleData,
} = actions;

const doCreateArticle = articleDetails => dispatch => {
  dispatch(setCreateStatus({ status: constants.CREATING }));
  const headers = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  return axios
    .post(url, articleDetails, headers)
    .then(({ data }) => {
      dispatch(
        setCreateStatus({
          status: constants.CREATE_SUCCESS,
          data: data.slug,
        }),
      );
    })
    .catch(({ response }) => {
      dispatch(
        setCreateStatus({
          status: constants.CREATE_ERROR,
          data: response.data.error,
        }),
      );
    });
};

const doFetchArticle = articleCategory => dispatch => {
  dispatch(setFetchArticleState(constants.FETCHING_ARTICLE));
  return axios
    .get(url)
    .then(({ data }) => {
      const articleByCategory = data.articles.filter(
        article => article.category === articleCategory,
      );
      dispatch(addArticleData({ [articleCategory]: articleByCategory }));
      dispatch(setFetchArticleState(constants.FETCH_ARTICLE_SUCCESS));
    })
    .catch(({ response }) => {
      dispatch(setFetchArticleState(constants.FETCH_ARTICLE_ERROR));
      dispatch(setFetchArticleError(response.data.error));
    });
};

const doSetCategory = articleCategory => dispatch => {
  dispatch(setArticleCategory(articleCategory));
};

export { doCreateArticle, doFetchArticle, doSetCategory };
