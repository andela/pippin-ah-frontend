import types from './types';

const setLoginState = (loginState, loginData) => ({
  type: types.SET_LOGIN_STATE,
  loginState,
  loginData,
});

const setLoginError = errorMessage => ({
  type: types.SET_LOGIN_ERROR,
  errorMessage,
});

export default { setLoginState, setLoginError };
