import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import SignupContainer from './SignupContainer';
import SignupComponent from './SignupComponent';
import { actions, types, constants, signupReducer } from './duck';
import { RingLoaderComponent } from '../loaders';

jest.mock('axios');

const { setSignupState, setSignupError } = actions;

describe('SIGNUP TEST SUITE', () => {
  describe('Signup Component', () => {
    it('should render the Signup Page', () => {
      const component = shallow(<SignupContainer />);
      expect(component).toMatchSnapshot();
    });

    it('it should have all expected input fields', () => {
      const props = {
        signupUser: () => {},
        signupState: '',
        errorMessage: '',
        history: {},
      };
      const component = shallow(<SignupComponent {...props} />);
      const emailField = component.find('input[name="email"]').props();
      expect(emailField.name).toBe('email');
      const usernameField = component.find('input[name="username"]').props();
      expect(usernameField.name).toBe('username');
      const passwordField = component.find('input[name="password"]').props();
      expect(passwordField.name).toBe('password');
      const rePassword = component.find('input[name="rePassword"]').props();
      expect(rePassword.name).toBe('rePassword');
    });

    it('it should not submit the form if any input field is empty', () => {
      const signupUser = jest.fn();
      const props = {
        signupUser,
        signupState: '',
        errorMessage: 'Email password username',
        history: {},
      };
      const component = shallow(<SignupComponent {...props} />);
      component.find('form').simulate('click', {
        preventDefault: () => {},
        target: {
          elements: {
            username: { value: 'johndoe' },
            email: { value: 'johndoe@joe.com' },
            password: { value: 'johndoe88' },
            rePassword: { value: '', setCustomValidity: () => {} },
          },
        },
      });
      expect(signupUser).not.toHaveBeenCalled();
    });

    it('it should not submit the form if passwords do not match', () => {
      const signupUser = jest.fn();
      const props = {
        signupUser,
        signupState: '',
        errorMessage: 'Email password username',
        history: {},
      };
      const component = shallow(<SignupComponent {...props} />);
      component.find('form').simulate('submit', {
        preventDefault: () => {},
        target: {
          elements: {
            username: { value: 'johndoe' },
            email: { value: 'johndoe@joe.com' },
            password: { value: 'johndoe88' },
            rePassword: { value: 'john8doe', setCustomValidity: () => {} },
          },
        },
      });
      expect(signupUser).not.toHaveBeenCalled();
    });

    it('it should submit the form with valid inputs', () => {
      const signupUser = jest.fn();
      const props = {
        signupUser,
        signupState: '',
        errorMessage: '',
        history: {},
      };
      const component = shallow(<SignupComponent {...props} />);
      component.find('form').simulate('submit', {
        preventDefault: () => {},
        target: {
          elements: {
            username: { value: 'johndoe' },
            email: { value: 'johndoe@joe.com' },
            password: { value: 'johndoe88' },
            rePassword: { value: 'johndoe88', setCustomValidity: () => {} },
          },
        },
      });
      expect(signupUser).toHaveBeenCalledWith(
        'johndoe@joe.com',
        'johndoe',
        'johndoe88',
      );
    });

    it('should redirect to home if signup is successful', () => {
      const props = {
        signupUser: () => {},
        signupState: 'SIGNUP_SUCCESS',
        errorMessage: '',
      };
      const component = shallow(<SignupComponent {...props} />);
      expect(component.containsMatchingElement(<Redirect to="/" />)).toEqual(
        true,
      );
    });

    it('it should render the RingLoaderComponent if signing up', () => {
      const props = {
        signupUser: () => {},
        signupState: 'SIGNING_UP',
        errorMessage: '',
        history: () => {},
      };
      const component = shallow(<SignupComponent {...props} />);
      expect(component.contains(<RingLoaderComponent />)).toBe(true);
    });
  });

  describe('Connected Signup Component Dispatches Signup Success', () => {
    const initialState = {
      signup: {
        signupState: '',
        errorMessage: '',
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    let wrapper;
    beforeEach(() => {
      const response = { data: 'successfully signed up' };
      axios.post.mockResolvedValue(response);
      wrapper = mount(
        <Provider store={store}>
          <SignupContainer />
        </Provider>,
      );
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
        target: {
          elements: {
            username: { value: 'johndoe' },
            email: { value: 'johndoe@joe.com' },
            password: { value: 'johndoe88' },
            rePassword: { value: 'johndoe88', setCustomValidity: () => {} },
          },
        },
      });
    });
    it('it should render the connected component', () => {
      expect(wrapper.find(SignupContainer).length).toEqual(1);
    });

    it('it should dispatch signup action', () => {
      const storeActions = store.getActions();
      expect(storeActions[0].type).toEqual('SET_SIGNUP_STATE');
    });
  });

  describe('Connected Signup Component Dispatches Signup Error', () => {
    const initialState = {
      signup: {
        signupState: '',
        errorMessage: '',
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    let wrapper;
    beforeEach(() => {
      const response = {
        response: { data: { error: 'invalid parameters' } },
      };
      axios.post.mockImplementation(() => Promise.reject(response));
      wrapper = mount(
        <Provider store={store}>
          <SignupContainer />
        </Provider>,
      );
      wrapper.find('form').simulate('submit', {
        preventDefault: () => {},
        target: {
          elements: {
            username: { value: 'johndoe' },
            email: { value: 'johndoe@joe.com' },
            password: { value: 'johndoe88' },
            rePassword: { value: 'johndoe88', setCustomValidity: () => {} },
          },
        },
      });
    });

    it('it should dispatch signup error action', () => {
      const storeActions = store.getActions();
      expect(storeActions[0].type).toEqual('SET_SIGNUP_STATE');
      expect(storeActions[1].type).toEqual('SET_SIGNUP_ERROR');
    });
  });

  describe('Signup Actions', () => {
    it('it should set the signup state', () => {
      const action = setSignupState(constants.SIGNING_UP);
      expect(action).toEqual({
        type: types.SET_SIGNUP_STATE,
        signupState: constants.SIGNING_UP,
      });
    });

    it('it should set the signup error message', () => {
      const action = setSignupError(constants.SIGNUP_ERROR);
      expect(action).toEqual({
        type: types.SET_SIGNUP_ERROR,
        errorMessage: constants.SIGNUP_ERROR,
      });
    });
  });

  describe('Signup Reducers', () => {
    it('should setup default state values', () => {
      const state = signupReducer(undefined, {
        type: '@@INIT',
      });
      expect(state).toEqual({
        signupState: '',
        errorMessage: '',
      });
    });

    it('it should change the signup state', () => {
      const action = {
        type: types.SET_SIGNUP_STATE,
        signupState: constants.SIGNING_UP,
      };
      const state = signupReducer(undefined, action);
      expect(state.signupState).toEqual(constants.SIGNING_UP);
    });

    it('it should change the signup error message', () => {
      const action = {
        type: types.SET_SIGNUP_ERROR,
        errorMessage: 'invalid username',
      };
      const state = signupReducer(undefined, action);
      expect(state.errorMessage).toEqual(action.errorMessage);
    });
  });
});
