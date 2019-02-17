import types from './types';

const setUpdatePasswordState = updatePasswordState => ({
  type: types.SET_UPDATE_PASSWORD_STATE,
  updatePasswordState,
});

const setUpdatePasswordError = errorMessage => ({
  type: types.SET_UPDATE_PASSWORD_ERROR,
  errorMessage,
});

export default { setUpdatePasswordState, setUpdatePasswordError };
