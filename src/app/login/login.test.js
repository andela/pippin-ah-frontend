import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallow } from 'enzyme';
import { LoginComponent as Login } from './LoginComponent';
import { mapDispatchToProps, mapStateToProps } from './LoginContainer';
import { actions, constants, loginReducer, types } from './duck';

const { setLoginState, setLoginError } = actions;

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
    const props = {
      loginUser: () => {},
      loginState: 'LOGIN_SUCCESS',
      errorMessage: '',
    };
    const component = shallow(<Login {...props} />);
    expect(component.containsMatchingElement(<Redirect to="/" />)).toEqual(
      true,
    );
  });
});

describe('Login Action', () => {
  it('it should set login state', () => {
    const action = setLoginState(constants.LOGGING_IN);
    expect(action).toEqual({
      type: types.SET_LOGIN_STATE,
      loginState: constants.LOGGING_IN,
    });
  });

  it('it should set login error message', () => {
    const action = setLoginError(constants.LOGIN_ERROR);
    expect(action).toEqual({
      type: types.SET_LOGIN_ERROR,
      errorMessage: constants.LOGIN_ERROR,
    });
  });

  it('should setup default state values', () => {
    const state = loginReducer(undefined, {
      type: '@@INIT',
    });
    expect(state).toEqual({
      loginState: '',
      errorMessage: '',
    });
  });
});

describe('Login Container', () => {
  it('should show initial state', () => {
    const initialState = {
      login: {
        loginState: '',
        errorMessage: '',
      },
    };
    expect(mapStateToProps(initialState).loginState).toEqual('');
    expect(mapStateToProps(initialState).errorMessage).toEqual('');
  });

  it('should dispatch action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).loginUser();
    expect(typeof dispatch.mock.calls[0][0]).toEqual('function');
  });
});

describe('Login Reducers', () => {
  it('should setup default state values', () => {
    const state = loginReducer(undefined, {
      type: '@@INIT',
    });
    expect(state).toEqual({
      loginState: '',
      errorMessage: '',
    });
  });

  it('it should change the login state', () => {
    const action = {
      type: types.SET_LOGIN_STATE,
      loginState: constants.LOGGING_IN,
    };
    const state = loginReducer(undefined, action);
    expect(state.loginState).toEqual(constants.LOGGING_IN);
  });

  it('it should change the login error message', () => {
    const action = {
      type: types.SET_LOGIN_ERROR,
      errorMessage: 'invalid credentials',
    };
    const state = loginReducer(undefined, action);
    expect(state.errorMessage).toEqual(action.errorMessage);
  });
});
