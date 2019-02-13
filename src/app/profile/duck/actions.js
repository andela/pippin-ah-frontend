import types from './types';

const setUserProfile = profileData => ({
  type: types.SET_USER_PROFILE,
  profileData,
});

const viewUserProfile = viewData => ({
  type: types.VIEW_USER_PROFILE,
  viewData,
});

export default { setUserProfile, viewUserProfile };
