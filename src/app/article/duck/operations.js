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
  setCurrentPage,
  addArticleData,
  updateCategoryData,
  setSingleFetchStatus,
  setBookmarkArticleState,
  setBookmarkArticleError,
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

const doFetchArticles = (articleCategory, page) => dispatch => {
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
      dispatch(
        setCurrentPage({
          [articleCategory]: {
            page,
            nextPage: page + 1,
          },
        }),
      );
      dispatch(addArticleData({ [articleCategory]: data.articles }));
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

/* istanbul ignore next */
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
      if (data.count === 0) {
        return dispatch(
          setCurrentPage({
            [articleCategory]: {
              page: page - 1,
              nextPage: null,
            },
          }),
        );
      }
      const appendedCategoryData = currentData.concat(data.articles);
      dispatch(
        setCurrentPage({
          [articleCategory]: {
            page,
            nextPage: page + 1,
          },
        }),
      );
      dispatch(updateCategoryData({ [articleCategory]: appendedCategoryData }));
    })
    .catch(({ response }) => {
      dispatch(setFetchArticleError(response.data.error));
    });
};

const doBookmarkArticle = (slug, articleData) => dispatch => {
  dispatch(setBookmarkArticleState(constants.BOOKMARKING_ARTICLE));
  const headers = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  console.log(headers);
  return axios
    .post(`${url}/bookmarks/${slug}`, {}, headers)
    .then(({ data }) => {
      dispatch(addArticleData({ Bookmarks: articleData }));
      dispatch(setBookmarkArticleState(constants.BOOKMARK_ARTICLE_SUCCESS));
    })
    .catch(({ response }) => {
      console.log('--->>>', `${url}bookmarks/${slug}`);
      dispatch(setBookmarkArticleState(constants.BOOKMARK_ARTICLE_ERROR));
      dispatch(setBookmarkArticleError(response.data.error));
    });
};

export {
  doCreateArticle,
  doFetchArticle,
  doSetCategory,
  doUpdateCategoryData,
  doFetchArticles,
  doBookmarkArticle,
};
