import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { LoginComponent as Login } from './LoginComponent';
import { setLoginState, constants, doLogin, types } from './duck';

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
});

describe('Login Component', () => {
  it('should render an email input', () => {
    expect(shallow(<Login />).find('#usernameOrEmail').length).toEqual(1);
  });

  it('should render a password input', () => {
    expect(shallow(<Login />).find('#password').length).toEqual(1);
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
});
