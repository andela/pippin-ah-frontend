import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import { Provider } from 'react-redux';
import ArticleContainer from './ArticleContainer';
import { actions, constants, bookmarkArticleReducer, types } from './duck';

jest.mock('axios');

const {
  setBookmarkArticleState,
  setBookmarkArticleError,
  setRemoveBookmarkError,
} = actions;

describe('Bookmark Action', () => {
  it('it should set Bookmark state', () => {
    const action = setBookmarkArticleState(constants.BOOKMARKING_ARTICLE);
    expect(action).toEqual({
      type: types.SET_BOOKMARK_ARTICLE_STATE,
      bookmarkArticleState: constants.BOOKMARKING_ARTICLE,
    });
  });

  it('it should set bookmarkArticle error message', () => {
    const action = setBookmarkArticleError(constants.BOOKMARK_ARTICLE_ERROR);
    expect(action).toEqual({
      type: types.SET_BOOKMARK_ARTICLE_ERROR,
      errorMessage: constants.BOOKMARK_ARTICLE_ERROR,
    });
  });

  it('it should set removeBookmark error message', () => {
    const action = setRemoveBookmarkError(constants.REMOVE_BOOKMARK_ERROR);
    expect(action).toEqual({
      type: types.SET_REMOVE_BOOKMARK_ERROR,
      errorMessage: constants.REMOVE_BOOKMARK_ERROR,
    });
  });
});

describe('fetchArticleReducers', () => {
  it('should setup default state values', () => {
    const state = bookmarkArticleReducer(undefined, {
      type: '@@INIT',
    });
    expect(state.bookmarkArticleStatus).toEqual({
      bookmarkArticleState: '',
      errorMessage: '',
    });
  });

  it('it should change the bookmarkArticle state', () => {
    const action = {
      type: types.SET_BOOKMARK_ARTICLE_STATE,
      bookmarkArticleState: constants.BOOKMARKING_ARTICLE,
    };
    const state = bookmarkArticleReducer(undefined, action);
    expect(state.bookmarkArticleState).toEqual(constants.BOOKMARKING_ARTICLE);
  });

  it('it should change the bookmark article error message', () => {
    const action = {
      type: types.SET_BOOKMARK_ARTICLE_ERROR,
      errorMessage: 'failed to bookmark',
    };
    const state = bookmarkArticleReducer(undefined, action);
    expect(state.errorMessage).toEqual(action.errorMessage);
  });
});

describe('bookmark article button', () => {
  const response = { response: { message: 'successfully fetched articles' } };
  axios.get.mockImplementation(() => Promise.resolve(response));
  axios.post.mockResolvedValue(response);
  const initialState = {
    createArticle: {
      singleFetchStatus: {
        status: constants.FETCH_SINGLE_SUCCESS,
        data: {
          createdAt: '2019-01-26 15:02:22.391+01',
          author: {
            username: 'spicy-dicy',
          },
          comments: [
            {
              author: {
                username: 'rajeman',
              },
              comment: {
                timestamp: 'comment text',
              },
              id: 'commentid',
            },
          ],
        },
      },
    },
    bookmarkArticle: {
      bookmarkArticleState: 'NOT_BOOKMARKED',
    },
    fetchArticle: {
      articleData: [],
    },
  };
  const mockStore = configureStore([thunk]);
  const store = mockStore(() => initialState);
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <ArticleContainer
          match={{ params: { slug: 'article-001-spicydicy' } }}
        />
      </Provider>,
    );
  });

  it('should bookmark an article', () => {
    wrapper.find('#bookmarkBtn').simulate('click');
    const storeActions = store.getActions();
    expect(storeActions[3].type).toEqual('SET_BOOKMARK_ARTICLE_STATE');
  });
});

describe('remove bookmark button', () => {
  const response = { response: { message: 'successfully fetched articles' } };
  axios.get.mockImplementation(() => Promise.resolve(response));
  axios.delete.mockResolvedValue(response);
  const initialState = {
    createArticle: {
      singleFetchStatus: {
        status: constants.FETCH_SINGLE_SUCCESS,
        data: {
          createdAt: '2019-01-26 15:02:22.391+01',
          author: {
            username: 'spicy-dicy',
          },
          comments: [
            {
              author: {
                username: 'rajeman',
              },
              comment: {
                timestamp: 'comment text',
              },
              id: 'commentid',
            },
          ],
        },
      },
    },
    bookmarkArticle: {
      bookmarkArticleState: 'BOOKMARKED',
    },
    fetchArticle: {
      articleData: [],
    },
  };
  const mockStore = configureStore([thunk]);
  const store = mockStore(() => initialState);
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <ArticleContainer
          match={{ params: { slug: 'article-001-spicydicy' } }}
        />
      </Provider>,
    );
  });

  it('should unbookmark an article', () => {
    wrapper.find('#removeBookmarkBtn').simulate('click');
    const storeActions = store.getActions();
    expect(storeActions[3].type).toEqual('SET_BOOKMARK_ARTICLE_STATE');
  });
});
