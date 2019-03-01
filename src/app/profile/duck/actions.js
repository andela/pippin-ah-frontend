import types from './types';

const setUserProfile = profileData => ({
  type: types.SET_USER_PROFILE,
  profileData,
});

const setPictureUploadStatus = uploadStatus => ({
  type: types.SET_UPLOADING_STATUS,
  uploadStatus,
});

const setProfileUpdateStatus = updateStatus => ({
  type: types.SET_PROFILE_UPDATE,
  updateStatus,
});

export default {
  setUserProfile,
  setPictureUploadStatus,
  setProfileUpdateStatus,
};
