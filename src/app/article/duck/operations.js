import axios from 'axios';
import actions from './actions';
import constants from './constants';
import { uploadImage } from '../../util/uploadToCloudinary';

const url = 'https://learnground-api-staging.herokuapp.com/api/v1/articles';
const {
  setCreateStatus,
  setFetchArticleState,
  setFetchArticleError,
  setArticleCategory,
  addArticleData,
} = actions;

const doCreateArticle = articleDetails => dispatch => {
  if (!articleDetails.uploadCoverUrl) {
    return dispatch(
      setCreateStatus({
        status: constants.CREATE_ERROR,
        data: 'You must select a cover image',
      }),
    );
  }
  dispatch(setCreateStatus({ status: constants.CREATING }));
  const { uploadCoverUrl } = articleDetails;
  uploadImage('article', uploadCoverUrl)
    .then(imageLink => {
      if (typeof imageLink !== 'string') {
        return dispatch(
          setCreateStatus({
            status: constants.CREATE_ERROR,
            data: 'error uploading cover image',
          }),
        );
      }
      articleDetails.coverImageUrl = imageLink;
      const headers = {
        headers: { Authorization: localStorage.getItem('token') },
      };
      return axios
        .post(url, articleDetails, headers)
        .then(({ data }) => {
          return dispatch(
            setCreateStatus({
              status: constants.CREATE_SUCCESS,
              data: data.slug,
            }),
          );
        })
        .catch(({ response }) => {
          return dispatch(
            setCreateStatus({
              status: constants.CREATE_ERROR,
              data: response.data.error,
            }),
          );
        });
    })
    .catch(() => {
      return dispatch(
        setCreateStatus({
          status: constants.CREATE_ERROR,
          data: 'error uploading cover image',
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
