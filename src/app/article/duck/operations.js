import axios from 'axios';
import actions from './actions';
import constants from './constants';
import { uploadImage } from '../../util/uploadToCloudinary';

const baseUrl = process.env.API_URL;
const url = `${baseUrl}articles`;
const {
  setCreateStatus,
  setFetchArticleState,
  setFetchArticleError,
  setArticleCategory,
  addArticleData,
  setSingleFetchStatus,
  addNewlyCreatedArticle,
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
        .post(`${baseUrl}articles`, articleDetails, headers)
        .then(({ data }) => {
          articleDetails.slug = data.slug;
          articleDetails.author = data.author.username;
          articleDetails.readTime = data.readTime;
          dispatch(addNewlyCreatedArticle(articleDetails));
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

const doFetchArticle = slug => dispatch => {
  dispatch(
    setSingleFetchStatus({
      status: constants.FETCHING_SINGLE,
      data: {},
    }),
  );
  const headers = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  return axios
    .get(`${baseUrl}articles/${slug}`, headers)
    .then(({ data }) => {
      dispatch(
        setSingleFetchStatus({
          status: constants.FETCH_SINGLE_SUCCESS,
          data,
        }),
      );
    })
    .catch(error => {
      dispatch(
        setSingleFetchStatus({
          status: constants.FETCH_SINGLE_ERROR,
          data: !error.response ? 'Network error ' : error.response.data.error,
        }),
      );
    });
};

const doFetchArticles = articleCategory => dispatch => {
  dispatch(setFetchArticleState(constants.FETCHING_ARTICLE));
  return axios
    .get(url, {
      params: {
        category: articleCategory,
      },
    })
    .then(({ data }) => {
      dispatch(addArticleData({ [articleCategory]: data.articles }));
      dispatch(setFetchArticleState(constants.FETCH_ARTICLE_SUCCESS));
    })
    .catch(({ response }) => {
      dispatch(setFetchArticleState(constants.FETCH_ARTICLE_ERROR));
      dispatch(setFetchArticleError(response.data.error));
    });
};

const doSetCategory = articleCategory => dispatch => {
  /* istanbul ignore next */
  dispatch(setArticleCategory(articleCategory));
};

export { doCreateArticle, doFetchArticle, doSetCategory, doFetchArticles };
