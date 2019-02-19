import types from './types';

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_USER_PROFILE: {
      const { profileData } = action;
      return {
        ...state,
        profileData,
      };
    }

    case types.VIEW_USER_PROFILE: {
      const { viewData } = action;
      return {
        ...state,
        viewData,
      };
    }

    case types.SET_UPLOADING_STATUS: {
      const { uploadStatus } = action;
      return {
        ...state,
        uploadStatus,
      };
    }

    default:
      return state;
  }
};

export default profileReducer;
