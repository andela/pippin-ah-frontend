import axios from 'axios';
import _ from 'lodash';
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
  setHighlightUploadStatus,
  setBookmarkArticleState,
  setBookmarkArticleError,
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
          dispatch(setFetchArticleState(constants.FETCH_ARTICLE_SUCCESS));
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
      if (data.isBookmarked) {
        dispatch(setBookmarkArticleState(constants.BOOKMARKED));
      }
      if (!data.isBookmarked) {
        dispatch(setBookmarkArticleState(constants.NOT_BOOKMARKED));
      }
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
  if (articleCategory === 'Bookmarks') {
    const headers = {
      headers: { Authorization: localStorage.getItem('token') },
    };
    return axios
      .get(`${url}/bookmarks`, headers)
      .then(({ data }) => {
        dispatch(addArticleData({ [articleCategory]: data.bookmarks }));
        dispatch(setFetchArticleState(constants.FETCH_ARTICLE_SUCCESS));
      })
      .catch(({ response }) => {
        dispatch(setFetchArticleState(constants.FETCH_ARTICLE_ERROR));
        dispatch(setFetchArticleError(response.data.error));
      });
  }
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

const doUploadHighlight = highlightDetails => dispatch => {
  dispatch(setHighlightUploadStatus({ status: constants.HIGHLIGHT_UPLOADING }));
  const { slug, ...detailsWithoutSlug } = highlightDetails;
  const headers = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  return axios
    .post(`${baseUrl}articles/${slug}/highlights`, detailsWithoutSlug, headers)
    .then(({ data }) => {
      return dispatch(
        setHighlightUploadStatus({
          status: constants.HIGHLIGHT_UPLOAD_SUCCESS,
          data,
        }),
      );
    })
    .catch(({ response }) => {
      return dispatch(
        setHighlightUploadStatus({
          status: constants.HIGHLIGHT_UPLOAD_FAILED,
          data: response.data.error,
        }),
      );
    });
};

const doBookmarkArticle = (slug, currentData) => dispatch => {
  dispatch(setBookmarkArticleState(constants.BOOKMARKING_ARTICLE));
  const headers = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  return axios
    .post(`${url}/bookmarks/${slug}`, {}, headers)
    .then(({ data }) => {
      currentData.unshift(data.article);
      dispatch(setBookmarkArticleState(constants.BOOKMARK_ARTICLE_SUCCESS));
      dispatch(updateCategoryData({ Bookmarks: currentData }));
    })
    .catch(({ response }) => {
      dispatch(setBookmarkArticleState(constants.BOOKMARK_ARTICLE_ERROR));
      dispatch(setBookmarkArticleError(response.data.error));
    });
};

const doRemoveBookmark = (slug, currentData) => dispatch => {
  dispatch(setBookmarkArticleState(constants.REMOVING_BOOKMARK));
  const headers = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  return axios
    .delete(`${url}/bookmarks/${slug}`, headers)
    .then(({ data }) => {
      dispatch(setBookmarkArticleState(constants.REMOVE_BOOKMARK_SUCCESS));
      const newData = _.filter(
        currentData.Bookmarks,
        article => article.slug !== slug,
      );
      dispatch(updateCategoryData({ Bookmarks: newData }));
    })
    .catch(({ response }) => {
      dispatch(setBookmarkArticleState(constants.REMOVE_BOOKMARK_ERROR));
      dispatch(setBookmarkArticleState(response.data.error));
    });
};

export {
  doCreateArticle,
  doFetchArticle,
  doSetCategory,
  doUpdateCategoryData,
  doFetchArticles,
  doUploadHighlight,
  doBookmarkArticle,
  doRemoveBookmark,
};
