import types from './types';

const setLoginState = loginState => ({
  type: types.SET_LOGIN_STATE,
  loginState,
});

export default setLoginState;
