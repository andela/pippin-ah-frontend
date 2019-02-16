import types from './types';

const setCreateStatus = createStatus => ({
  type: types.SET_CREATE_STATUS,
  createStatus,
});

export default setCreateStatus;
