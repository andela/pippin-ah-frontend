import types from './types';

const INITIAL_STATE = {
  createStatus: {
    status: '',
    data: '',
  },
  singleFetchStatus: {
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
    case types.SET_SINGLE_FETCH_STATUS: {
      const { singleFetchStatus } = action;
      return {
        ...state,
        singleFetchStatus,
      };
    }
    default:
      return state;
  }
};

export default createArticleReducer;
