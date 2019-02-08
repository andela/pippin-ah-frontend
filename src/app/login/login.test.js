import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { LoginComponent as Login } from './LoginComponent';
import { setLoginState, constants, loginReducer, types } from './duck';

describe('Login Component', () => {
  it('should render without throwing an error', () => {
    const loginUser = jest.fn();
    const wrapper = shallow(<Login loginUser={loginUser} />);
    wrapper.find('form').simulate('submit', {
      target: {
        elements: {
          usernameOrEmail: {
            value: 'spicy',
          },
          password: {
            value: 'dicy',
          },
        },
      },
      preventDefault: () => {},
    });
    expect(loginUser).toHaveBeenCalledWith('spicy', 'dicy');
  });

  it('should render an email input', () => {
    expect(shallow(<Login />).find('#usernameOrEmail').length).toEqual(1);
  });

  it('should render a password input', () => {
    expect(shallow(<Login />).find('#password').length).toEqual(1);
  });

  it('should redirect page if login is successful', () => {
    const history = {};
    history.push = jest.fn();
    const props = {
      loginUser: () => {},
      loginState: 'LOGIN_SUCCESS',
      errorMessage: '',
      history,
    };
    shallow(<Login {...props} />);
    expect(history.push).toHaveBeenCalledWith('/');
  });
});

describe('Login Action', () => {
  it('it should set the login state', () => {
    const action = setLoginState(constants.LOGGING_IN);
    expect(action).toEqual({
      type: types.SET_LOGIN_STATE,
      loginState: constants.LOGGING_IN,
    });
  });

  it('should setup default state values', () => {
    const state = loginReducer(undefined, {
      type: '@@INIT',
    });
    expect(state).toEqual({
      loginState: 'LOGIN_ERROR',
      errorMessage: '',
    });
  });
});
