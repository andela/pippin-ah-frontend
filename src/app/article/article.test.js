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
      beforeAll(() => {
        const div = document.createElement('div');
        window.domNode = div;
        document.body.appendChild(div);
      });
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

      it('should call handleFilePick option when the file picker is clicked', () => {
        localStorage.setItem('token', 'token');
        const handleFilePick = jest.fn();
        const component = mount(
          <CreateArticleComponent
            createStatus=""
            handleFilePick={handleFilePick}
          />,
          { attachTo: window.domNode },
        );
        const spy = jest.spyOn(component.instance(), 'handleFilePick');
        component
          .find('div.card-image')
          .first()
          .childAt(0)
          .simulate('click', { target: { name: 0 } });
        expect(spy).toHaveBeenCalled();
      });

      it('should update the state when new file is selected', () => {
        global.URL.createObjectURL = jest.fn(() => 'details');
        const component = mount(<CreateArticleComponent createStatus="" />);
        component
          .find('input[type="file"]')
          .simulate('change', { target: { files: ['http://file'] } });
        expect(component.state().uploadCoverUrl).toEqual('http://file');
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
          uploadCoverUrl: '',
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

  describe('Editor Helper Functions', () => {
    it('should not call the failure callback if image is successfully uploaded', () => {
      const response = { data: { secure_url: 'https://secure' } };
      axios.post.mockImplementation(() => Promise.resolve(response));
      axios.patch.mockImplementation(() => Promise.resolve(response));
      const blobInfo = {
        blob: () => {
          return new Blob(['foo'], { type: 'text/plain' });
        },
        filename: () => {},
      };
      const component = shallow(<EditorComponent />);
      const success = jest.fn();
      const failure = jest.fn();
      component
        .find('Editor')
        .props()
        .init.images_upload_handler(blobInfo, success, failure);
      expect(failure).not.toHaveBeenCalled();
    });

    it('should not call the success callback if image upload failed', () => {
      const response = { data: 'successfully signed up' };
      axios.post.mockImplementation(() => Promise.reject(response));
      const blobInfo = {
        blob: () => {
          return new Blob(['foo'], { type: 'text/plain' });
        },
        filename: () => {},
      };
      const component = shallow(<EditorComponent />);
      const success = jest.fn();
      const failure = jest.fn();
      component
        .find('Editor')
        .props()
        .init.images_upload_handler(blobInfo, success, failure);
      expect(success).not.toHaveBeenCalled();
    });

    it('should call the file picker callback when file is selected', () => {
      const component = shallow(<EditorComponent />);
      const cb = jest.fn();
      // console.log(component.find('Editor').props().init.file_picker_callback());
      // const spy = jest.spyOn(editorFilePicker.prototype(), '');
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
      expect(state).toEqual({
        createStatus: {
          status: '',
          data: '',
        },
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

  describe('Connected create article component', () => {
    const initialState = {
      createArticle: {
        createStatus: {
          status: '',
          data: '',
        },
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(() => initialState);
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <CreateArticleContainer />
        </Provider>,
      );
    });

    it('should dispatch an action with CREATE_ERROR when cover image url is not set ', () => {
      const component = wrapper.find(CreateArticleComponent).first();
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
      const dispatchedActions = store.getActions();
      expect(dispatchedActions[0].createStatus.data).toEqual(
        'You must select a cover image',
      );
    });

    it('should dispatch an action with status CREATING when article is being created', () => {
      const response = {
        response: {
          data: {
            slug: 'new article 001',
          },
        },
      };
      axios.post.mockImplementation(() => Promise.resolve(response));
      const component = wrapper.find(CreateArticleComponent).first();
      component.setState({
        uploadCoverUrl: 'http://uploadcoverurl',
      });
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
      const dispatchedActions = store.getActions();
      expect(dispatchedActions[1].createStatus.status).toEqual('CREATING');
    });
  });
});
