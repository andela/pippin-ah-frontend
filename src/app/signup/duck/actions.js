import types from './types';

const setSignupState = (signupState, data) => ({
  type: types.SET_SIGNUP_STATE,
  signupState,
  data,
});
const setSignupError = errorMessage => ({
  type: types.SET_SIGNUP_ERROR,
  errorMessage,
});

export default { setSignupState, setSignupError };
