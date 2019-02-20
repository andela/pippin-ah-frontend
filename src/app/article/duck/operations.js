import axios from 'axios';
import actions from './actions';
import constants from './constants';
import { uploadImage } from '../../util/uploadToCloudinary';

const url = 'https://learnground-api-staging.herokuapp.com/api/v1/articles';
const { setCreateStatus } = actions;
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

export default doCreateArticle;
