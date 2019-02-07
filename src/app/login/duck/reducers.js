import types from './types';
import constants from './constants';

const INITIAL_STATE = {
  loginState: constants.LOGIN_ERROR,
  errorMessage: '',
};
const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_LOGIN_STATE: {
      const { loginState, errorMessage } = action;
      return {
        ...state,
        loginState,
        errorMessage,
      };
    }
    default:
      return state;
  }
};

export default loginReducer;
