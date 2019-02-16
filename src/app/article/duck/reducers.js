import types from './types';

const INITIAL_STATE = {
  createStatus: {
    status: '',
    data: '',
  },
};
const createArticleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_CREATE_STATUS: {
      const { createStatus } = action;
      return {
        ...state,
        createStatus,
      };
    }
    default:
      return state;
  }
};

export default createArticleReducer;
