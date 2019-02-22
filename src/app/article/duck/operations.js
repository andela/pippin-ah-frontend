import axios from 'axios';
import { toast } from 'react-toastify';
import actions from './actions';
import constants from './constants';

const url = 'https://learnground-api-staging.herokuapp.com/api/v1/articles';
const {
  setCreateStatus,
  setFetchArticleState,
  setFetchArticleError,
  setArticleCategory,
  setCurrentPage,
  addArticleData,
  updateCategoryData,
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

const doFetchArticle = (articleCategory, page) => dispatch => {
  dispatch(setFetchArticleState(constants.FETCHING_ARTICLE));
  return axios
    .get(url, {
      params: {
        category: articleCategory,
        limit: 12,
        page,
      },
    })
    .then(({ data }) => {
      dispatch(setCurrentPage(data.page));
      dispatch(addArticleData({ [articleCategory]: data.articles }));
      dispatch(setFetchArticleState(constants.FETCH_ARTICLE_SUCCESS));
    })
    .catch(({ response }) => {
      dispatch(setFetchArticleState(constants.FETCH_ARTICLE_ERROR));
      dispatch(setFetchArticleError(response.data.error));
      toast.error(response.data.error, {
        hideProgressBar: true,
      });
    });
};

const doSetCategory = articleCategory => dispatch => {
  dispatch(setArticleCategory(articleCategory));
};
const doUpdateCategoryData = (
  articleCategory,
  page,
  currentData,
) => dispatch => {
  return axios
    .get(url, {
      params: {
        category: articleCategory,
        limit: 12,
        page,
      },
    })
    .then(({ data }) => {
      const appendedCategoryData = currentData.concat(data.articles);
      dispatch(setCurrentPage(data.page));
      dispatch(updateCategoryData({ [articleCategory]: appendedCategoryData }));
    })
    .catch(({ data }) => {
      console.log('----**->', data);
    });
};

export { doCreateArticle, doFetchArticle, doSetCategory, doUpdateCategoryData };
