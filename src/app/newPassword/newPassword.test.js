import React from 'react';
import thunk from 'redux-thunk';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { NewPasswordComponent as NewPassword } from './NewPasswordComponent';
import { actions, constants, newPasswordReducer, types } from './duck';
import { EllipsisLoaderComponent } from '../loaders';
import {
  NewPasswordContainer,
  mapDispatchToProps,
  mapStateToProps,
} from './NewPasswordContainer';

jest.mock('axios');

const { setUpdatePasswordState, setUpdatePasswordError } = actions;

describe('newPasswordComponent', () => {
  const dom = new JSDOM();
  global.document = dom.window.document;
  global.window = dom.window;

  it('should render without throwing an error', () => {
    const updatePassword = jest.fn();
    const props = {
      updatePassword,
      updatePasswordState: '',
      errorMessage: 'User not found',
      history: {},
    };
    const wrapper = shallow(<NewPassword {...props} />);
    wrapper.find('form').simulate('submit', {
      target: {
        elements: {
          newPassword: {
            value: 'buttercup',
          },
          rePassword: {
            value: 'buttercup',
          },
          passwordMismatchDiv: {
            innerHtlml: '',
          },
        },
      },
      preventDefault: () => {},
    });
    expect(updatePassword).toHaveBeenCalledWith('buttercup');
  });

  it('should render a newPassword input', () => {
    expect(shallow(<NewPassword />).find('#newPassword').length).toEqual(1);
  });

  it('it should render the EllipsisLoaderComponent if making request', () => {
    const props = {
      updatePassword: () => {},
      updatePasswordState: 'UPDATING_PASSWORD',
      errorMessage: '',
      history: () => {},
    };
    const component = shallow(<NewPassword {...props} />);
    expect(component.contains(<EllipsisLoaderComponent />)).toBe(true);
  });
});

describe('NewPasswordAction', () => {
  it('it should set updatePassword state', () => {
    const action = setUpdatePasswordState(constants.UPDATING_PASSWORD);
    expect(action).toEqual({
      type: types.SET_UPDATE_PASSWORD_STATE,
      updatePasswordState: constants.UPDATING_PASSWORD,
    });
  });

  it('it should set updatePassword error message', () => {
    const action = setUpdatePasswordError(constants.UPDATE_PASSWORD_ERROR);
    expect(action).toEqual({
      type: types.SET_UPDATE_PASSWORD_ERROR,
      errorMessage: constants.UPDATE_PASSWORD_ERROR,
    });
  });

  it('should setup default state values', () => {
    const state = newPasswordReducer(undefined, {
      type: '@@INIT',
    });
    expect(state).toEqual({
      updatePasswordState: '',
      errorMessage: '',
    });
  });
});

describe('NewPasswordContainer', () => {
  it('should show initial state', () => {
    const initialState = {
      updatePassword: {
        updatePasswordState: '',
        errorMessage: '',
      },
    };
    expect(mapStateToProps(initialState).updatePasswordState).toEqual('');
    expect(mapStateToProps(initialState).errorMessage).toEqual('');
  });

  it('should dispatch action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).updatePassword();
    expect(typeof dispatch.mock.calls[0][0]).toEqual('function');
  });
});

describe('newPasswordReducers', () => {
  it('should setup default state values', () => {
    const state = newPasswordReducer(undefined, {
      type: '@@INIT',
    });
    expect(state).toEqual({
      updatePasswordState: '',
      errorMessage: '',
    });
  });

  it('it should change the updatePassword state', () => {
    const action = {
      type: types.SET_UPDATE_PASSWORD_STATE,
      updatePasswordState: constants.UPDATING_PASSWORD,
    };
    const state = newPasswordReducer(undefined, action);
    expect(state.updatePasswordState).toEqual(constants.UPDATING_PASSWORD);
  });

  it('it should change the update password error message', () => {
    const action = {
      type: types.SET_UPDATE_PASSWORD_ERROR,
      errorMessage: 'Invalid token',
    };
    const state = newPasswordReducer(undefined, action);
    expect(state.errorMessage).toEqual(action.errorMessage);
  });
});

describe('Connected NewPassword Component Dispatches Success', () => {
  const initialState = {
    updatePassword: {
      updatePasswordState: '',
      errorMessage: '',
    },
  };
  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);
  let wrapper;
  beforeEach(() => {
    const response = { data: 'updatePassword successful' };
    axios.post.mockResolvedValue(response);
    wrapper = mount(
      <Provider store={store}>
        <NewPasswordContainer />
      </Provider>,
    );
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
      target: {
        elements: {
          newPassword: {
            value: 'buttercup',
          },
          rePassword: {
            value: 'buttercup',
          },
        },
      },
    });
  });
  it('it should render the connected component', () => {
    expect(wrapper.find(NewPassword).length).toEqual(1);
  });

  it('it should dispatch updatePassword action', () => {
    const storeActions = store.getActions();
    expect(storeActions[0].type).toEqual('SET_UPDATE_PASSWORD_STATE');
  });
});

describe('Connected NewPassword Component Dispatches updatePassword Error', () => {
  const initialState = {
    updatePassword: {
      updatePasswordState: '',
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
        <NewPasswordContainer />
      </Provider>,
    );
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
      target: {
        elements: {
          newPassword: {
            value: 'buttercup',
          },
          rePassword: {
            value: 'buttercup',
          },
        },
      },
    });
  });

  it('it should dispatch error action', () => {
    const storeActions = store.getActions();
    expect(storeActions[0].type).toEqual('SET_UPDATE_PASSWORD_STATE');
    expect(storeActions[1].type).toEqual('SET_UPDATE_PASSWORD_ERROR');
  });
});
