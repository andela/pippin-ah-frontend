import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import actions from './actions';
import upload from '../../util/uploadToCloudinary';
import constants from './constants';

const { viewUserProfile, setUserProfile, setPictureUploadStatus } = actions;

export const pictureUtils = imageUrl => dispatch => {
  dispatch(
    setPictureUploadStatus({
      status: constants.PICTURE_UPDATING,
    }),
  );

  upload('profile', imageUrl)
    .then(newProfileUrl => {
      dispatch(
        setPictureUploadStatus({
          status: constants.UPDATE_SUCCESS,
          newProfileUrl,
        }),
      );
    })
    .catch(() => {
      dispatch(
        setPictureUploadStatus({
          status: constants.UPDATE_ERROR,
        }),
      );
    });
};

export const viewProfile = () => dispatch => {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const url = `https://learnground-api-staging.herokuapp.com/api/v1/user/${
    decoded.username
  }`;

  const defaultOptions = {
    headers: {
      Authorization: token,
    },
  };

  return axios
    .get(url, defaultOptions)
    .then(({ data }) => {
      dispatch(viewUserProfile(data));
    })
    .catch(({ response }) => {
      toast.error(response.data.error, {
        hideProgressBar: true,
      });
    });
};

const url2 = 'https://learnground-api-staging.herokuapp.com/api/v1/profile';

export const updateUserProfile = (
  firstName,
  lastName,
  interest,
  bio,
) => dispatch => {
  console.log('here my test failed');
  const token = localStorage.getItem('token');
  const defaultOptions = {
    headers: {
      Authorization: token,
    },
  };
  return axios
    .patch(
      url2,
      {
        firstName,
        lastName,
        interest,
        bio,
      },
      defaultOptions,
    )
    .then(({ data }) => {
      dispatch(setUserProfile(data));
    })
    .catch(({ response }) => {
      toast.error(response.data.error, {
        hideProgressBar: true,
      });
    });
};

export default { viewProfile, updateUserProfile };
