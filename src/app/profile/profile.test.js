import React from 'react';
import axios from 'axios';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
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

jest.mock('axios');
global.FileReader = () => ({
  readAsDataURL: () => {},
});

const mockStore = configureStore([thunk]);
const store = mockStore();

describe(' PROFILE TEST SUITE', () => {
  describe(' Profile Component', () => {
    it('should render Profile container component', () => {
      const component = shallow(<ProfileContainer />);
      expect(component.exists()).toBe(true);
      expect(component).toMatchSnapshot();
    });

    it('should render Profile dumb component', () => {
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
        viewProfile: jest.fn(),
        updateUserProfile: Promise.resolve(),
      };
      const component = shallow(<ProfileComponent {...props} />);
      expect(component.exists()).toBe(true);
      expect(component).toMatchSnapshot();
    });

    it('should ensures mapDispatchToProps dispatches the specified actions', () => {
      const component = shallow(<ProfileContainer />);
      const dispatch = jest.fn();
      expect(mapDispatchToProps(dispatch).viewProfile).toBeTruthy();
      expect(mapDispatchToProps(dispatch).updateUserProfile).toBeTruthy();
    });

    it('should handle form submit', () => {
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
        viewProfile: jest.fn(),
        updateUserProfile: jest.fn(),
      };
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
        viewProfile: jest.fn(),
        updateUserProfile: jest.fn(),
      };

      const wrapper = shallow(<ProfileComponent {...props} />);

      const instance = wrapper.instance();
      instance.displayImage(event);
    });
  });

  describe(' select profile picture to upload', () => {
    beforeEach(() => {
      const response = '';
      axios.post.mockResolvedValue(response);
    });
    it('should handle form submit for picture', () => {
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
        viewProfile: jest.fn(),
        updateUserProfile: jest.fn(),
        pictureUtils: jest.fn(),
      };
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

  describe('Profile Reducers', () => {
    it('should return an empty object for SET_USER_PROFILE', () => {
      const state = profileReducer(undefined, {
        type: 'SET_USER_PROFILE',
      });
      expect(state).toEqual({});
    });

    it('should return an empty object for VIEW_USER_PROFILE', () => {
      const state = profileReducer(undefined, {
        type: 'VIEW_USER_PROFILE',
      });
      expect(state).toEqual({});
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
