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
  bookmarkArticleStatus: {
    bookmarkArticleState: '',
    errorMessage: '',
  },
  articleData: {
    Arts: [],
    Mathematics: [],
    Science: [],
    Engineering: [],
    Technology: [],
    Bookmarks: [],
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
    case types.ADD_NEWLY_CREATED_ARTICLE: {
      const { newArticle } = action;
      const currentArtcleData = state.articleData;
      const newArticleCategory = newArticle.category;
      const articleToAdd = {
        [newArticleCategory]: [
          newArticle,
          ...currentArtcleData[newArticleCategory],
        ],
      };
      return {
        ...state,
        articleData: { ...currentArtcleData, ...articleToAdd },
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

const bookmarkArticleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_BOOKMARK_ARTICLE_STATE: {
      const { bookmarkArticleState } = action;
      return {
        ...state,
        bookmarkArticleState,
      };
    }
    case types.SET_BOOKMARK_ARTICLE_ERROR: {
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

export { createArticleReducer, fetchArticleReducer, bookmarkArticleReducer };
