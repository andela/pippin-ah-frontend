import types from './types';

const INITIAL_STATE = {
  signupState: '',
  errorMessage: '',
};
const signupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_SIGNUP_STATE: {
      const { signupState } = action;
      return {
        ...state,
        signupState,
      };
    }
    case types.SET_SIGNUP_ERROR: {
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

export default signupReducer;
