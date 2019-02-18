import React from 'react';
import thunk from 'redux-thunk';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ResetPasswordComponent as ResetPassword } from './ResetPasswordComponent';
import { actions, constants, resetPasswordReducer, types } from './duck';
import { EllipsisLoaderComponent } from '../loaders';
import {
  ResetPasswordContainer,
  mapDispatchToProps,
  mapStateToProps,
} from './ResetPasswordContainer';

jest.mock('axios');

const { setResetState, setResetError } = actions;

describe('ResetPasswordComponent', () => {
  it('should render without throwing an error', () => {
    const resetPassword = jest.fn();
    const props = {
      resetPassword,
      resetState: '',
      errorMessage: 'Invalid credentials',
      history: {},
    };
    const wrapper = shallow(<ResetPassword {...props} />);
    wrapper.find('form').simulate('submit', {
      target: {
        elements: {
          resetEmail: {
            value: 'bugsburney@email.com',
          },
        },
      },
      preventDefault: () => {},
    });
    expect(resetPassword).toHaveBeenCalledWith('bugsburney@email.com');
  });

  it('should render an email input', () => {
    expect(shallow(<ResetPassword />).find('#resetEmail').length).toEqual(1);
  });

  it('it should render the EllipsisLoaderComponent if making request', () => {
    const props = {
      resetPassword: () => {},
      resetState: 'RESETTING',
      errorMessage: '',
      history: () => {},
    };
    const component = shallow(<ResetPassword {...props} />);
    expect(component.contains(<EllipsisLoaderComponent />)).toBe(true);
  });
});

describe('ResetPasswordAction', () => {
  it('it should set reset state', () => {
    const action = setResetState(constants.RESETTING);
    expect(action).toEqual({
      type: types.SET_RESET_STATE,
      resetState: constants.RESETTING,
    });
  });

  it('it should set reset error message', () => {
    const action = setResetError(constants.RESET_ERROR);
    expect(action).toEqual({
      type: types.SET_RESET_ERROR,
      errorMessage: constants.RESET_ERROR,
    });
  });

  it('should setup default state values', () => {
    const state = resetPasswordReducer(undefined, {
      type: '@@INIT',
    });
    expect(state).toEqual({
      resetState: '',
      errorMessage: '',
    });
  });
});

describe('ResetPasswordContainer', () => {
  it('should show initial state', () => {
    const initialState = {
      resetPassword: {
        resetState: '',
        errorMessage: '',
      },
    };
    expect(mapStateToProps(initialState).resetState).toEqual('');
    expect(mapStateToProps(initialState).errorMessage).toEqual('');
  });

  it('should dispatch action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).resetPassword();
    expect(typeof dispatch.mock.calls[0][0]).toEqual('function');
  });
});

describe('ResetPasswordReducers', () => {
  it('should setup default state values', () => {
    const state = resetPasswordReducer(undefined, {
      type: '@@INIT',
    });
    expect(state).toEqual({
      resetState: '',
      errorMessage: '',
    });
  });

  it('it should change the reset state', () => {
    const action = {
      type: types.SET_RESET_STATE,
      resetState: constants.RESETTING,
    };
    const state = resetPasswordReducer(undefined, action);
    expect(state.resetState).toEqual(constants.RESETTING);
  });

  it('it should change the reset error message', () => {
    const action = {
      type: types.SET_RESET_ERROR,
      errorMessage: 'invalid credentials',
    };
    const state = resetPasswordReducer(undefined, action);
    expect(state.errorMessage).toEqual(action.errorMessage);
  });
});

describe('Connected Reset Component Dispatches Reset Success', () => {
  const initialState = {
    resetPassword: {
      resetState: '',
      errorMessage: '',
    },
  };
  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);
  let wrapper;
  beforeEach(() => {
    const response = { data: 'ResetPassword successful' };
    axios.post.mockResolvedValue(response);
    wrapper = mount(
      <Provider store={store}>
        <ResetPasswordContainer />
      </Provider>,
    );
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
      target: {
        elements: {
          resetEmail: { value: 'daffyduck@email.com' },
        },
      },
    });
  });
  it('it should render the connected component', () => {
    expect(wrapper.find(ResetPassword).length).toEqual(1);
  });

  it('it should dispatch reset action', () => {
    const storeActions = store.getActions();
    expect(storeActions[0].type).toEqual('SET_RESET_STATE');
  });
});

describe('Connected ResetPassword Component Dispatches Reset Error', () => {
  const initialState = {
    resetPassword: {
      resetState: '',
      errorMessage: '',
    },
  };
  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);
  let wrapper;
  beforeEach(() => {
    const response = {
      response: { data: { error: 'invalid credentials' } },
    };
    axios.post.mockImplementation(() => Promise.reject(response));
    wrapper = mount(
      <Provider store={store}>
        <ResetPasswordContainer />
      </Provider>,
    );
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
      target: {
        elements: {
          resetEmail: { value: 'speedygonzales@email.com' },
        },
      },
    });
  });

  it('it should dispatch reset error action', () => {
    const storeActions = store.getActions();
    expect(storeActions[0].type).toEqual('SET_RESET_STATE');
    expect(storeActions[1].type).toEqual('SET_RESET_ERROR');
  });
});
