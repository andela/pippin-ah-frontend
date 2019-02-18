import types from './types';

const INITIAL_STATE = {
  updatePasswordState: '',
  errorMessage: '',
};
const newPasswordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_UPDATE_PASSWORD_STATE: {
      const { updatePasswordState } = action;
      return {
        ...state,
        updatePasswordState,
      };
    }
    case types.SET_UPDATE_PASSWORD_ERROR: {
      const { errorMessage } = action;
      return {
        ...state,
        errorMessage,
      };
    }
    default:
      return state;
  }
};

export default newPasswordReducer;
