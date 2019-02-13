import types from './types';

const INITIAL_STATE = {
  resetState: '',
  errorMessage: '',
};
const resetPasswordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_RESET_STATE: {
      const { resetState } = action;
      return {
        ...state,
        resetState,
      };
    }
    case types.SET_RESET_ERROR: {
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

export default resetPasswordReducer;
