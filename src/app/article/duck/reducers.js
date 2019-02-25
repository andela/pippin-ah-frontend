import types from './types';

const INITIAL_STATE = {
  createStatus: {
    status: '',
    data: '',
  },
  singleFetchStatus: {
    status: '',
    data: '',
    fetchArticleStatus: {
      fetchArticleState: '',
      errorMessage: '',
    },
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

const fetchArticleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_FETCH_ARTICLE_STATE: {
      const { fetchArticleState } = action;
      return {
        ...state,
        fetchArticleState,
      };
    }
    case types.SET_FETCH_ARTICLE_ERROR: {
      const { errorMessage } = action;
      return {
        ...state,
        errorMessage,
      };
    }
    case types.SET_ARTICLE_CATEGORY: {
      const { articleCategory } = action;
      return {
        ...state,
        articleCategory,
      };
    }
    case types.ADD_ARTICLE_DATA: {
      const { articleData } = action;
      const oldArticleData = state.articleData;
      return {
        ...state,
        articleData: { ...oldArticleData, ...articleData },
      };
    }
    default:
      return state;
  }
};

export { createArticleReducer, fetchArticleReducer };
