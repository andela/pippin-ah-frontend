import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ArticleContainer from './ArticleContainer';
import CreateArticleContainer from './CreateArticleContainer';
import CreateArticleComponent from './CreateArticleComponent';
import EditorComponent from './EditorComponent';
import PreloaderComponent from '../loaders/PreloaderComponent';
import { actions, types, constants, createArticleReducer } from './duck';

jest.mock('axios');
global.localStorage = {
  getItem: key => {
    return this.store[key] || null;
  },
  setItem: (key, value) => {
    this.store[key] = value.toString();
  },
  removeItem(key) {
    delete this.store[key];
  },
};

describe('ARTICLE TEST SUITE', () => {
  describe('Article Container', () => {
    it('should render the Article Page', () => {
      const component = mount(<ArticleContainer />);
      expect(component.exists()).toBe(true);
      expect(component).toMatchSnapshot();
    });
  });

  describe('CREATE ARTICLE TEST SUITE', () => {
    describe('Create Article Render Components', () => {
      it('should render the CreateArticleContainer', () => {
        const component = shallow(<CreateArticleContainer />);
        expect(component.exists()).toBe(true);
        expect(component).toMatchSnapshot();
      });

      it('should render the CreateArticleComponent', () => {
        const component = shallow(<CreateArticleComponent createStatus="" />);
        expect(component.exists()).toBe(true);
        expect(component).toMatchSnapshot();
      });

      it('should render the EditorComponent', () => {
        const component = shallow(<EditorComponent />);
        expect(component.exists()).toBe(true);
        expect(component).toMatchSnapshot();
      });
    });

    describe('Create Article Simulate Changes', () => {
      it('should redirect to login if user is not authenticated', () => {
        localStorage.removeItem('token');
        const component = shallow(
          <CreateArticleComponent
            createStatus={{
              status: '',
            }}
          />,
        );
        expect(
          component.containsMatchingElement(<Redirect to="/login" />),
        ).toEqual(true);
      });

      it('should call editor change handler when editor is modified', () => {
        localStorage.setItem('token', 'token');
        const handleEditorChange = jest.fn();
        const component = mount(
          <CreateArticleComponent
            createStatus=""
            handleEditorChange={handleEditorChange}
          >
            <EditorComponent handleEditorChange={jest.fn()} />
          </CreateArticleComponent>,
        );
        const spy = jest.spyOn(component.instance(), 'handleEditorChange');
        component
          .find('Editor')
          .props()
          .onEditorChange('new value');
        expect(spy).toHaveBeenCalledWith('new value');
      });

      it('should call createArticle function when form is submitted', () => {
        const createArticle = jest.fn();
        const component = shallow(
          <CreateArticleComponent
            createStatus=""
            createArticle={createArticle}
          />,
        );
        component.find('form').simulate('submit', {
          preventDefault: () => {},
          target: {
            elements: {
              title: { value: 'title' },
              description: { value: 'description' },
              category: { value: 'category' },
            },
          },
        });
        expect(createArticle).toHaveBeenCalledWith({
          title: 'title',
          description: 'description',
          category: 'category',
          body: '',
        });
      });

      it('should scroll to top to display error message when create fails', () => {
        global.scrollTo = jest.fn();
        const component = shallow(
          <CreateArticleComponent
            createStatus={{
              status: constants.CREATE_ERROR,
            }}
          />,
        );
        component.setState({
          canScrollToTop: true,
        });
        expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
      });

      it('should redirect if article creation is successful', () => {
        const component = shallow(
          <CreateArticleComponent
            createStatus={{
              status: constants.CREATE_SUCCESS,
              data: 'new-article',
            }}
          />,
        );
        expect(
          component.containsMatchingElement(
            <Redirect to="/articles/new-article" />,
          ),
        ).toEqual(true);
      });

      it('should render the PreloaderComponent when creating article', () => {
        const component = shallow(
          <CreateArticleComponent
            createStatus={{
              status: constants.CREATING,
            }}
          />,
        );
        expect(
          component.containsMatchingElement(<PreloaderComponent />),
        ).toEqual(true);
      });
    });
  });

  describe('Create Article Actions', () => {
    it('it should set the create status', () => {
      const { setCreateStatus } = actions;
      const createStatus = { status: 'status', data: 'data' };
      const action = setCreateStatus(createStatus);
      expect(action).toEqual({
        type: types.SET_CREATE_STATUS,
        createStatus,
      });
    });
  });

  describe('Create Article Reducers', () => {
    it('should setup default state values', () => {
      const state = createArticleReducer(undefined, {
        type: '@@INIT',
      });
      expect(state.createStatus).toEqual({
        status: '',
        data: '',
      });
    });

    it('should change the create state', () => {
      const action = {
        type: types.SET_CREATE_STATUS,
        createStatus: constants.CREATING,
      };
      const state = createArticleReducer(undefined, action);
      expect(state.createStatus).toEqual(constants.CREATING);
    });
  });

  describe('Connected Create Article Component Dispatches Create Success', () => {
    const initialState = {
      createArticle: {
        createStatus: {
          status: '',
          data: '',
        },
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    let wrapper;
    beforeEach(() => {
      const response = {
        data: {
          slug: 'new article 001',
        },
      };
      axios.post.mockResolvedValue(response);
      wrapper = mount(
        <Provider store={store}>
          <CreateArticleContainer />
        </Provider>,
      );
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
        target: {
          elements: {
            title: { value: 'title' },
            description: { value: 'description' },
            category: { value: 'category' },
          },
        },
      });
    });

    it('should render the connected Create Article component', () => {
      expect(wrapper.find(CreateArticleContainer).length).toEqual(1);
    });

    it('should dispatch create action for successfull article creation', () => {
      const storeActions = store.getActions();
      expect(storeActions[0].type).toEqual('SET_CREATE_STATUS');
    });
  });

  describe('Connected Create Article Component Dispatches Create Error', () => {
    const initialState = {
      createArticle: {
        createStatus: {
          status: '',
          data: '',
        },
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    let wrapper;
    beforeEach(() => {
      const response = {
        response: {
          data: {
            slug: 'new article 001',
          },
        },
      };
      axios.post.mockImplementation(() => Promise.reject(response));
      wrapper = mount(
        <Provider store={store}>
          <CreateArticleContainer />
        </Provider>,
      );
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
        target: {
          elements: {
            title: { value: 'title' },
            description: { value: 'description' },
            category: { value: 'category' },
          },
        },
      });
    });

    it('should dispatch create error for failed article creation', () => {
      const storeActions = store.getActions();
      expect(storeActions[1].createStatus.status).toEqual(
        constants.CREATE_ERROR,
      );
    });
  });
});
