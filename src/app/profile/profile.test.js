import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import jwtDecode from 'jwt-decode';
import configureStore from 'redux-mock-store';
import ProfileComponent from './ProfileComponent';

import {
  actions,
  types,
  constants,
  profileReducer,
  viewProfile,
  updateUserProfile,
} from './duck';
import ProfileContainer from './ProfileContainer';
import { mapDispatchToProps, mapStateToProps } from './ProfileContainer';

const { setUserProfile, viewUserProfile, setPictureUploadStatus } = actions;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
jest.mock('jwt-decode');

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

const props = {
  viewData: {
    articles: {
      total: 3,
      top: ['mockData'],
    },
  },
  profileData: {
    firstName: 'Habib',
    lastName: 'moses',
    bio: 'Software developer at andela',
    interest: 'Arts',
  },
  uploadStatus: {},
  viewProfile: jest.fn(),
  updateUserProfile: jest.fn(),
  pictureUtils: jest.fn(),
};

describe(' PROFILE TEST SUITE', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall(axios));

  describe(' Profile Component', () => {
    it('should render Profile container component', () => {
      const component = shallow(<ProfileContainer />);
      expect(component.exists()).toBe(true);
      expect(component).toMatchSnapshot();
    });

    it('should render Profile dumb component', () => {
      const component = shallow(<ProfileComponent {...props} />);
      expect(component.exists()).toBe(true);
      expect(component).toMatchSnapshot();
    });

    it('should ensures mapDispatchToProps dispatches the specified actions', () => {
      const component = shallow(<ProfileContainer {...props} />);
      const dispatch = jest.fn();

      mapDispatchToProps(dispatch).viewProfile();
      mapDispatchToProps(dispatch).updateUserProfile();
      mapDispatchToProps(dispatch).pictureUtils();
    });

    it('should handle form submit', () => {
      const wrapper = shallow(<ProfileComponent {...props} />);
      const event = {
        preventDefault: jest.fn(),
        target: {
          elements: {
            lastName: {
              value: 'Audu',
            },
            firstName: {
              value: 'Habib',
            },
            interest: {
              value: 'Science',
            },
            bio: {
              value: 'I am a boy, I think',
            },
          },
        },
      };

      const profileForm = wrapper.find('form').at(1);
      profileForm.simulate('submit', event);
    });

    it('should display selected image', () => {
      const event = {
        preventDefault: jest.fn(),
        target: {
          elements: {
            name: 'profilepix',
          },
          files: [{ data: 'image', type: 'image/jpg' }],
          result: 'image',
        },
      };
      const readAsDataURL = jest.fn();
      const addEventListener = jest.fn((_, evtHandler) => {
        evtHandler();
      });
      const dummyReader = {
        addEventListener,
        readAsDataURL,
        result: event.target.result,
      };
      window.FileReader = jest.fn(() => dummyReader);

      const wrapper = shallow(<ProfileComponent {...props} />);

      const instance = wrapper.instance();
      instance.displayImage(event);
    });
  });

  describe(' select profile picture to upload', () => {
    it('should handle form submit for picture', () => {
      const wrapper = shallow(<ProfileComponent {...props} />);
      const event = {
        preventDefault: jest.fn(),

        target: {
          elements: {
            name: 'profilepix',
            files: [{ data: 'image', type: 'image/jpg' }],
          },
        },
      };
      const instance = wrapper.instance();
      instance.uploadPicture(event);
      const pictureForm = wrapper.find('form').at(2);
    });
  });

  describe('Test for Functions In Operations', () => {
    /*   beforeEach(() => {
      moxios.install();
      const response = '';
      axios.post.mockResolvedValue(response);
    });
    afterEach(() => {
      moxios.uninstall();
    });
    */
    it('Should test for update profile: success', done => {
      const store = mockStore({});
      const profileData = {
        firstName: 'Wisdom',
        lastName: 'Dowda',
        bio: 'lives in lagos',
        interests: 'Science',
      };

      const viewData = {
        firstName: 'Wisdom',
        lastName: 'Dowda',
        bio: 'lives in lagos',
        interests: 'Science',
        articles: {
          total: 3,
          top: ['mockData'],
        },
      };
      const url =
        'https://learnground-api-staging.herokuapp.com/api/v1/profile';
      moxios.stubRequest(url, {
        status: 200,
        profileData,
      });

      store.dispatch(updateUserProfile(profileData)).then(() => {
        expect(store.getActions()).toEqual([
          { profileData: undefined, type: 'SET_USER_PROFILE' },
        ]);
        done();
      });
    });

    it('Should test for view profile: success', done => {
      const store = mockStore({});
      const viewData = {
        firstName: 'Wisdom',
        lastName: 'Dowda',
        bio: 'lives in lagos',
        interests: 'Science',
        articles: {
          total: 3,
          top: ['mockData'],
        },
      };

      const result = {
        username: 'hba821',
      };
      jwtDecode.mockImplementation(() => result);

      const url =
        'https://learnground-api-staging.herokuapp.com/api/v1/user/hba821';
      moxios.stubRequest(url, {
        status: 200,
        response: viewData,
      });

      store.dispatch(viewProfile()).then(() => {
        expect(store.getActions()).toEqual([
          { viewData, type: 'VIEW_USER_PROFILE' },
        ]);
        done();
      });
    });
  });

  describe('Profile Reducers', () => {
    it('should return an empty object for SET_USER_PROFILE', () => {
      const state = profileReducer(undefined, {
        type: 'SET_USER_PROFILE',
      });
      const data = {
        uploadStatus: '',
        viewData: undefined,
      };
      expect(state).toEqual(data);
    });

    it('should return an empty object for VIEW_USER_PROFILE', () => {
      const state = profileReducer(undefined, {
        type: 'VIEW_USER_PROFILE',
      });

      const data = {
        uploadStatus: '',
        viewData: undefined,
      };
      expect(state).toEqual(data);
    });

    it('should return an empty object for SET_UPLOADING_STATUS', () => {
      const state = profileReducer(undefined, {
        type: 'SET_UPLOADING_STATUS',
      });
      expect(state).toEqual({});
    });
  });

  describe('Profile Actions', () => {
    it('it should update the profile state', () => {
      const action = setUserProfile(constants.SET_USER_PROFILE);
      expect(action).toEqual({
        type: types.SET_USER_PROFILE,
        profileData: constants.SET_USER_PROFILE,
      });
    });

    it('it should set view profile state', () => {
      const action = viewUserProfile(constants.VIEW_USER_PROFILE);
      expect(action).toEqual({
        type: types.VIEW_USER_PROFILE,
        viewData: constants.VIEW_USER_PROFILE,
      });
    });

    it('it should set update profile status', () => {
      const action = setPictureUploadStatus(constants.UPDATE_SUCCESS);
      expect(action).toEqual({
        type: types.SET_UPLOADING_STATUS,
        uploadStatus: constants.UPDATE_SUCCESS,
      });
    });
  });
});
