import types from './types';

const setResetState = resetState => ({
  type: types.SET_RESET_STATE,
  resetState,
});

const setResetError = errorMessage => ({
  type: types.SET_RESET_ERROR,
  errorMessage,
});

export default { setResetState, setResetError };
