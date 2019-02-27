import React from 'react';
import thunk from 'redux-thunk';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import ListArticleComponent from './ListArticleComponent';
import { actions, constants, fetchArticleReducer, types } from './duck';
import getArticleCategory from './util/getArticleCategory';
import { EllipsisLoaderComponent } from '../loaders';
import {
  ListArticleContainer,
  mapDispatchToProps,
  mapStateToProps,
} from './ListArticleContainer';

jest.mock('axios');

const {
  setFetchArticleState,
  setFetchArticleError,
  setCurrentPage,
  updateCategoryData,
  setArticleCategory,
  addArticleData,
} = actions;

describe('ListArticle Component Action', () => {
  it('it should set fetchArticle state', () => {
    const action = setFetchArticleState(constants.FETCHING_ARTICLE);
    expect(action).toEqual({
      type: types.SET_FETCH_ARTICLE_STATE,
      fetchArticleState: constants.FETCHING_ARTICLE,
    });
  });

  it('it should set fetchArticle error message', () => {
    const action = setFetchArticleError(constants.FETCH_ARTICLE_ERROR);
    expect(action).toEqual({
      type: types.SET_FETCH_ARTICLE_ERROR,
      errorMessage: constants.FETCH_ARTICLE_ERROR,
    });
  });

  it('it should set article category', () => {
    const action = setArticleCategory('Arts');
    expect(action).toEqual({
      type: types.SET_ARTICLE_CATEGORY,
      articleCategory: 'Arts',
    });
  });

  it('it should set current page', () => {
    const action = setCurrentPage({
      Arts: {
        page: 2,
        nextPage: 3,
      },
    });
    expect(action).toEqual({
      type: types.SET_CURRENT_PAGE,
      currentPage: {
        Arts: {
          page: 2,
          nextPage: 3,
        },
      },
    });
  });

  it('it should update category data', () => {
    const action = updateCategoryData({ Arts: 'New Data' });
    expect(action).toEqual({
      type: types.UPDATE_CATEGORY_DATA,
      appendedCategoryData: { Arts: 'New Data' },
    });
  });

  it('it should add article data', () => {
    const action = addArticleData('Data');
    expect(action).toEqual({
      type: types.ADD_ARTICLE_DATA,
      articleData: 'Data',
    });
  });

  it('should setup default state values', () => {
    const state = fetchArticleReducer(undefined, {
      type: '@@INIT',
    });
    expect(state.fetchArticleStatus).toEqual({
      fetchArticleState: '',
      errorMessage: '',
    });
  });
});

describe('ListArticleContainer', () => {
  it('should show initial state', () => {
    const initialState = {
      fetchArticle: {
        fetchArticleState: '',
        errorMessage: '',
      },
      location: { pathname: '' },
    };
    expect(mapStateToProps(initialState).fetchArticleState).toEqual('');
    expect(mapStateToProps(initialState).errorMessage).toEqual('');
  });

  it('should dispatch action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchArticle();
    mapDispatchToProps(dispatch).setCategory();
    mapDispatchToProps(dispatch).appendArticleData();
    expect(typeof dispatch.mock.calls[0][0]).toEqual('function');
  });
});

describe('fetchArticleReducers', () => {
  it('should setup default state values', () => {
    const state = fetchArticleReducer(undefined, {
      type: '@@INIT',
    });
    expect(state.fetchArticleStatus).toEqual({
      fetchArticleState: '',
      errorMessage: '',
    });
  });

  it('it should change the fetchArticle state', () => {
    const action = {
      type: types.SET_FETCH_ARTICLE_STATE,
      fetchArticleState: constants.FETCHING_ARTICLE,
    };
    const state = fetchArticleReducer(undefined, action);
    expect(state.fetchArticleState).toEqual(constants.FETCHING_ARTICLE);
  });

  it('it should change the fetch article error message', () => {
    const action = {
      type: types.SET_FETCH_ARTICLE_ERROR,
      errorMessage: 'failed to fetch',
    };
    const state = fetchArticleReducer(undefined, action);
    expect(state.errorMessage).toEqual(action.errorMessage);
  });

  it('it should set the article category', () => {
    const action = {
      type: types.SET_ARTICLE_CATEGORY,
      articleCategory: 'Arts',
    };
    const state = fetchArticleReducer(undefined, action);
    expect(state.articleCategory).toEqual(action.articleCategory);
  });

  it('it should set the current page', () => {
    const action = {
      type: types.SET_CURRENT_PAGE,
      currentPage: {
        Arts: {
          page: 2,
          nextPage: 3,
        },
      },
    };
    const state = fetchArticleReducer(undefined, action);
    expect(state.currentPage).toEqual(action.currentPage);
  });

  it('it should add article data', () => {
    const action = {
      type: types.ADD_ARTICLE_DATA,
      articleData: { Arts: [1, 2, 3] },
    };
    const state = fetchArticleReducer(undefined, action);
    expect(state.articleData).toEqual({
      Arts: [1, 2, 3],
      Mathematics: [],
      Science: [],
      Engineering: [],
      Technology: [],
    });
  });

  it('it should add a newly created article', () => {
    const action = {
      type: types.ADD_NEWLY_CREATED_ARTICLE,
      newArticle: { category: 'Arts' },
    };
    const state = fetchArticleReducer(undefined, action);
    expect(state.articleData).toEqual({
      Arts: [{ category: 'Arts' }],
      Mathematics: [],
      Science: [],
      Engineering: [],
      Technology: [],
    });
  });

  it('it should update category data', () => {
    const action = {
      type: types.UPDATE_CATEGORY_DATA,
      appendedCategoryData: { Arts: 'New Data' },
    };
    const state = fetchArticleReducer(undefined, action);
    expect(state.articleData).toEqual(action.appendedCategoryData);
  });

  it('should render the component', () => {
    const fetchArticle = jest.fn();
    const setCategory = jest.fn();
    const articleData = {
      Science: [],
    };
    const location = { pathname: '/articles/Science' };
    const component = shallow(
      <ListArticleComponent
        {...{ fetchArticle, location, articleData, setCategory }}
      />,
    );
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});

describe('Connected ListArticleComponent Component Dispatches Success', () => {
  let wrapper;
  const initialState = {
    fetchArticle: {
      fetchArticleState: '',
      errorMessage: '',
      articleData: {
        Arts: [],
        Mathematics: [],
        Science: [],
        Engineering: [],
        Technology: [],
      },
    },
    articleCategory: 'Arts',
    location: { pathname: '/articles/arts' },
  };
  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);
  beforeEach(() => {
    const location = { pathname: '/articles/arts' };
    const response = {
      data: 'fetchArticle successful',
      page: 1,
      articles: [1, 2, 3],
    };
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { ...response } }),
    );
    const articleData = {
      Arts: [{ title: 'first article' }],
    };
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ListArticleContainer articleData={articleData} location={location} />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('it should render the connected component', () => {
    expect(wrapper.find(ListArticleComponent).length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('it should dispatch fetchArticle action', () => {
    const storeState = store.getState();
    const storeActions = store.getActions();
    expect(storeActions[3].fetchArticleState).toEqual('FETCH_ARTICLE_SUCCESS');
    expect(storeState.articleCategory).toEqual('Arts');
  });
});

describe('Connected ListArticleComponent Dispatches fetchArticle Error', () => {
  const initialState = {
    fetchArticle: {
      fetchArticleState: '',
      errorMessage: '',
      articleData: {
        Arts: [],
        Mathematics: [],
        Science: [],
        Engineering: [],
        Technology: [],
      },
    },
    location: { pathname: '/articles/arts' },
  };
  const location = { pathname: '/articles/arts' };
  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);
  beforeEach(() => {
    const response = {
      response: { data: { error: 'invalid credentials' } },
    };
    axios.get.mockImplementation(() => Promise.reject(response));
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <ListArticleContainer
            location={location}
            articleData={initialState}
          />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('it should dispatch error action', () => {
    const storeActions = store.getActions();
    expect(storeActions[2].fetchArticleState).toEqual('FETCH_ARTICLE_ERROR');
  });
});

describe('Loader Component', () => {
  const state = {
    fetchArticle: {
      fetchArticleState: 'FETCHING_ARTICLE',
      errorMessage: '',
      articleData: {
        Arts: [],
        Mathematics: [],
        Science: [],
        Engineering: [],
        Technology: [],
      },
    },
    location: { pathname: '/articles/arts' },
  };
  const location = { pathname: '/articles/arts' };
  const mockStore = configureStore([thunk]);
  const store = mockStore(state);
  beforeEach(() => {
    const response = {
      response: { data: { error: 'failed to fetch' } },
    };
    axios.get.mockImplementation(() => Promise.reject(response));
  });

  it('it should render the EllipsisLoaderComponent if making request', () => {
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ListArticleContainer articleData={state} location={location} />
        </MemoryRouter>
      </Provider>,
    );
    expect(component.contains(<EllipsisLoaderComponent />)).toEqual(true);
  });
});

describe('Test for receiving article category', () => {
  beforeEach(() => {
    window.history.pushState({}, 'Test Title', '/articles/science');
  });
  it('should get article category', () => {
    const result = getArticleCategory();
    expect(result).toEqual('Science');
  });
});

describe('Test for not receiving article category', () => {
  beforeEach(() => {
    window.history.pushState({}, 'Test Title', '/');
  });
  it('should return empty string', () => {
    const result = getArticleCategory();
    expect(result).toEqual('');
  });
});
