import axios from 'axios';
import { toast } from 'react-toastify';
import actions from './actions';
import constants from './constants';

const url = 'https://learnground-api-staging.herokuapp.com/api/v1/articles';
const {
  setCreateStatus,
  setFetchArticleState,
  setFetchArticleError,
  // setArticleCategory,
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
  // dispatch(setArticleCategory(articleCategory));
  // dispatch(setFetchArticleState(constants.FETCHING_ARTICLE));
  // dispatch(setFetchArticleError(''));
  return axios
    .get(url)
    .then(({ data }) => {
      const articleByCategory = data.articles.filter(
        article => article.category === articleCategory,
      );
      console.log('+++++', articleByCategory);

      // dispatch(setArticleCategory(articleCategory));
      dispatch(addArticleData(articleByCategory, articleCategory));
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

export { doCreateArticle, doFetchArticle };
