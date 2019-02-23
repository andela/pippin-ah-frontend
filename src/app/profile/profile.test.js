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
  updateUserProfile,
} from './duck';
import ProfileContainer from './ProfileContainer';
import { mapDispatchToProps } from './ProfileContainer';

const {
  setUserProfile,
  setPictureUploadStatus,
  setProfileUpdateStatus,
} = actions;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
jest.mock('jwt-decode');
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
  updateStatus: {},
  updateUserProfile: jest.fn(),
  pictureUtils: jest.fn(),
  newProfileDetails: {
    data: {
      firstName: 'Habib',
      lastName: 'moses',
      bio: 'Software developer at andela',
      interest: 'Arts',
    },
  },

  data: {
    message: 'signUp was successful',
    token: 'ImlhdCI6M._DqYpAJGxzDePz6uI',
    notifications: [],
    username: 'audu9habib',
    firstName: 'Daniel',
    lastName: 'Jacks',
    bio: 'D3 developer',
    imageUrl:
      'https://res.cloudinary.com/hba821/image/upload/v1550833205/xawy05cllyblxlh0ihja.jpg',
    following: 0,
    followers: 0,
    articles: {
      top: [],
      total: 0,
    },
  },

  loginData: {
    message: 'Login was successful',
    token: 'ImlhdCI6M._DqYpAJGxzDePz6uI',
    notifications: [],
    username: 'audu9habib',
    firstName: 'Daniel',
    lastName: 'Jacks',
    bio: 'D3 developer',
    imageUrl:
      'https://res.cloudinary.com/hba821/image/upload/v1550833205/xawy05cllyblxlh0ihja.jpg',
    following: 0,
    followers: 0,
    articles: {
      top: [],
      total: 0,
    },
  },
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
      const result = {
        isMentor: false,
      };
      jwtDecode.mockImplementation(() => result);

      const component = shallow(<ProfileComponent {...props} />);
      expect(component.exists()).toBe(true);
      expect(component).toMatchSnapshot();
    });

    it('should ensures mapDispatchToProps dispatches the specified actions', () => {
      const component = shallow(<ProfileContainer {...props} />);
      const dispatch = jest.fn();

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
    it('Should test for update profile: success', () => {
      const response = { update: 'updated profile' };
      axios.patch.mockResolvedValue(response);
      const store = mockStore({});
      const profileData = {
        firstName: 'Wisdom',
        lastName: 'Dowda',
        bio: 'lives in lagos',
        interests: 'Science',
      };

      const newProfileDetails = {
        firstName: 'Habib',
        lastName: 'moses',
        bio: 'Software developer at andela',
        interest: 'Arts',
      };

      const url =
        'https://learnground-api-staging.herokuapp.com/api/v1/profile';
      moxios.stubRequest(url, {
        status: 200,
        profileData,
        newProfileDetails,
      });

      const data2 = {
        status: constants.PROFILE_UPDATE_SUCCESS,
        newProfileDetails,
      };

      store.dispatch(updateUserProfile(profileData)).then(() => {
        store.dispatch(setProfileUpdateStatus(data2));
      });
    });

    describe('Test for dispatch In Operations', () => {
      it('Should test for update profile: success', () => {
        const store = mockStore({});
        const response = { data: 'update not sucessfull' };
        axios.patch.mockImplementation(() => Promise.reject(response));
        const profileData = {};

        const url =
          'https://learnground-api-staging.herokuapp.com/api/v1/profile';
        moxios.stubRequest(url, {
          status: 200,
        });

        store.dispatch(updateUserProfile(profileData)).catch(() => {
          store.dispatch(
            setProfileUpdateStatus(constants.PROFILE_UPDATE_ERROR),
          );
        });
      });

      describe('Profile Reducers', () => {
        it('should return an store data for SET_USER_PROFILE', () => {
          const state = profileReducer(undefined, {
            type: 'SET_USER_PROFILE',
          });
          const data = {
            updateStatus: '',
            uploadStatus: '',
            viewData: undefined,
          };
          expect(state).toEqual(data);
        });

        it('should return an  Array of object for SET_UPLOADING_STATUS', () => {
          const data = {
            updateStatus: '',
            uploadStatus: undefined,
          };
          const state = profileReducer(undefined, {
            type: 'SET_UPLOADING_STATUS',
          });
          expect(state).toEqual(data);
        });

        it('should return an  Array of object for SET_PROFILE_UPDATE', () => {
          const data = {
            updateStatus: undefined,
            uploadStatus: '',
          };
          const state = profileReducer(undefined, {
            type: 'SET_PROFILE_UPDATE',
          });
          expect(state).toEqual(data);
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

        it('it should set update profile status', () => {
          const action = setPictureUploadStatus(constants.UPDATE_SUCCESS);
          expect(action).toEqual({
            type: types.SET_UPLOADING_STATUS,
            uploadStatus: constants.UPDATE_SUCCESS,
          });
        });
      });
    });
  });
});
