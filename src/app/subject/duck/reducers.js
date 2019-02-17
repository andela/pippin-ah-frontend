import types from './types';

const INITIAL_STATE = {
  fetchArticleState: '',
  errorMessage: '',
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
    default:
      return state;
  }
};

export default fetchArticleReducer;
