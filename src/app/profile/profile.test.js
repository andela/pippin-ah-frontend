import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { promises } from 'fs';
import ProfileComponent from './ProfileComponent';
import {
  actions,
  types,
  constants,
  profileReducer,
  viewProfile,
  updateUserProfile,
} from './duck';
import RingLoaderComponent from '../loaders';
import ProfileContainer from './ProfileContainer';
import { mapDispatchToProps, mapStateToProps } from './ProfileContainer';

const mockStore = configureMockStore();

jest.mock('axios');
global.FileReader = () => ({
  readAsDataURL: () => {},
});

const { viewUserProfile, setUserProfile } = actions;

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
            files: [{ data: 'image', type: 'image/jpg' }],
          },
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
        viewProfile: jest.fn(),
        updateUserProfile: jest.fn(),
      };

      global.FileReader = () => ({
        readAsDataURL: () => {},
      });

      const wrapper = shallow(<ProfileComponent {...props} />);

      const instance = wrapper.instance();
      instance.displayImage(event);

      // const reader = new FileReader();
      // reader.onload = e =>{
      //   wrapper.setState({
      //     imageSelected: event

      //   });
      // }
      // expect(wrapper.state().imageSelected).toBe(event);
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
});

describe('Profile Reducers', () => {
  it('should setup default state values', () => {
    const state = profileReducer(undefined, {
      type: 'SET_USER_PROFILE',
    });
    expect(state).toEqual({});
  });

  it('should setup default state values', () => {
    const state = profileReducer(undefined, {
      type: 'VIEW_USER_PROFILE',
    });
    expect(state).toEqual({});
  });
});
