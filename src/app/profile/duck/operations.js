import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import actions from './actions';
import upload from '../../util/uploadToCloudinary';
import constants from './constants';

const {
  viewUserProfile,
  setUserProfile,
  setPictureUploadStatus,
  setProfileUpdateStatus,
} = actions;

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

  const getCurrentUserUrl = `${process.env.API_URL}user/${decoded.username}`;

  const defaultOptions = {
    headers: {
      Authorization: token,
    },
  };

  return axios
    .get(getCurrentUserUrl, defaultOptions)
    .then(({ data }) => {
      dispatch(viewUserProfile(data));
    })
    .catch(({ response }) => {
      toast.error(response.data.error, {
        hideProgressBar: true,
      });
    });
};

const updateProfileUrl = `${process.env.API_URL}profile`;

export const updateUserProfile = (
  firstName,
  lastName,
  interest,
  bio,
) => dispatch => {
  const token = localStorage.getItem('token');
  dispatch(setProfileUpdateStatus(constants.PROFILE_UPDATING));
  const defaultOptions = {
    headers: {
      Authorization: token,
    },
  };
  return axios
    .patch(
      updateProfileUrl,
      {
        firstName,
        lastName,
        interest,
        bio,
      },
      defaultOptions,
    )
    .then(({ data }) => {
      dispatch(setProfileUpdateStatus(constants.PROFILE_UPDATE_SUCCESS));
      dispatch(setUserProfile(data));
    })
    .catch(({ response }) => {
      dispatch(setProfileUpdateStatus(constants.PROFILE_UPDATE_ERROR));
      toast.error(response.data.error, {
        hideProgressBar: true,
      });
    });
};

export default { viewProfile, updateUserProfile };
