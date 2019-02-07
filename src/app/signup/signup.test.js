import React from 'react';
import { shallow } from 'enzyme';
import SignupContainer from './SignupContainer';
import { actions, types, constants, signupReducer } from './duck';

const { setSignupState, setSignupError } = actions;

describe('SIGNUP TEST SUITE', () => {
  describe('Signup Component', () => {
    test('should render the Signup Page', () => {
      const component = shallow(<SignupContainer />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('Signup Actions', () => {
    test('it should set the signup state', () => {
      const action = setSignupState(constants.SIGNING_UP);
      expect(action).toEqual({
        type: types.SET_SIGNUP_STATE,
        signupState: constants.SIGNING_UP,
      });
    });

    test('it should set the signup error message', () => {
      const action = setSignupError(constants.SIGNUP_ERROR);
      expect(action).toEqual({
        type: types.SET_SIGNUP_ERROR,
        errorMessage: constants.SIGNUP_ERROR,
      });
    });
  });

  describe('Signup Reducers', () => {
    test('should setup default state values', () => {
      const state = signupReducer(undefined, {
        type: '@@INIT',
      });
      expect(state).toEqual({
        signupState: '',
        errorMessage: '',
      });
    });

    test('it should change the signup state', () => {
      const action = {
        type: types.SET_SIGNUP_STATE,
        signupState: constants.SIGNING_UP,
      };
      const state = signupReducer(undefined, action);
      expect(state.signupState).toEqual(constants.SIGNING_UP);
    });

    test('it should change the signup error message', () => {
      const action = {
        type: types.SET_SIGNUP_ERROR,
        errorMessage: 'invalid username',
      };
      const state = signupReducer(undefined, action);
      expect(state.errorMessage).toEqual(action.errorMessage);
    });
  });
});
