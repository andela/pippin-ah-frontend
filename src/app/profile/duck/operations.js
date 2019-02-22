import axios from 'axios';
import { toast } from 'react-toastify';
import actions from './actions';
import upload from '../../util/uploadToCloudinary';
import constants from './constants';

const {
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
    .then(newProfileDetails => {
      dispatch(
        setProfileUpdateStatus({
          status: constants.PROFILE_UPDATE_SUCCESS,
          newProfileDetails,
        }),
      );
      dispatch(setUserProfile(newProfileDetails));
    })
    .catch(({ response }) => {
      dispatch(setProfileUpdateStatus(constants.PROFILE_UPDATE_ERROR));
      toast.error(response.data.error, {
        hideProgressBar: true,
      });
    });
};

export default { updateUserProfile };
