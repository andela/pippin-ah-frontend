import types from './types';

const defaultState = {
  uploadStatus: '',
  updateStatus: '',
};

const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_USER_PROFILE: {
      const { profileData } = action;
      return {
        ...state,
        profileData,
      };
    }

    case types.SET_UPLOADING_STATUS: {
      const { uploadStatus } = action;
      return {
        ...state,
        uploadStatus,
      };
    }

    case types.SET_PROFILE_UPDATE: {
      const { updateStatus } = action;
      return {
        ...state,
        updateStatus,
      };
    }

    default:
      return state;
  }
};

export default profileReducer;
