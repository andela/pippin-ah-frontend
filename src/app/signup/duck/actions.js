import types from './types';

const setSignupState = signupState => ({
  type: types.SET_SIGNUP_STATE,
  signupState,
});
const setSignupError = errorMessage => ({
  type: types.SET_SIGNUP_ERROR,
  errorMessage,
});

export default { setSignupState, setSignupError };
