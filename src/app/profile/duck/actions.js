import types from './types';

const setUserProfile = profileData => ({
  type: types.SET_USER_PROFILE,
  profileData,
});

const viewUserProfile = viewData => ({
  type: types.VIEW_USER_PROFILE,
  viewData,
});

const setPictureUploadStatus = uploadStatus => ({
  type: types.SET_UPLOADING_STATUS,
  uploadStatus,
});

export default {
  setUserProfile,
  viewUserProfile,
  setPictureUploadStatus,
};
