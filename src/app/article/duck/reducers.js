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
  fetchArticleStatus: {
    fetchArticleState: '',
    errorMessage: '',
  },
  highlightUploadStatus: {
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

    case types.SET_HIGHLIGHT_UPLOAD_STATUS: {
      const { highlightUploadStatus } = action;
      return {
        ...state,
        highlightUploadStatus,
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

    case types.SET_CURRENT_PAGE: {
      const { currentPage } = action;
      return {
        ...state,
        currentPage: { ...state.currentPage, ...currentPage },
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

    case types.UPDATE_CATEGORY_DATA: {
      const { appendedCategoryData } = action;
      const oldArticleData = state.articleData;
      return {
        ...state,
        articleData: { ...oldArticleData, ...appendedCategoryData },
      };
    }

    default:
      return state;
  }
};

export { createArticleReducer, fetchArticleReducer };
