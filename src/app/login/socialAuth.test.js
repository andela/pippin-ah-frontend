import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import TwitterLogin from 'react-twitter-auth';
import axios from 'axios';
import SocialAuth from './SocialAuth';
import { LoginComponent as Login } from './LoginComponent';

jest.mock('axios');

let props;

describe('SOCIAL AUTH TEST SUITE', () => {
  describe('SocialAuth Component', () => {
    it('should render the Social Auth Page', () => {
      const component = shallow(<SocialAuth />);
      expect(component).toMatchSnapshot();
    });
  });

  describe('SocialAuth Component', () => {
    const initialState = {
      login: {
        loginState: '',
        errorMessage: '',
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    props = {
      dispatch: () => {},
      authLogin: () => {},
    };

    it('should render the Social Auth Page with google sing in', () => {
      global.window = Object.create(window);
      const url = '?google&code=4/_gDuguR9sgdfg';
      Object.defineProperty(window, 'location', {
        value: {
          href: url,
          search: url,
        },
      });
      const response = {
        data: {
          username: 'Diamond',
          email: 'valsido@gmail.com',
          token: 'cardinalsajdlsfslsfkjdlsfjflsfj',
        },
      };

      axios.get.mockResolvedValue(response);
      const component = mount(
        <Provider store={store}>
          <SocialAuth {...props} />
        </Provider>,
      );
      expect(component).toMatchSnapshot();
    });

    it('should render the Social Auth Page with facebook sign in', () => {
      global.window = Object.create(window);
      const url = '?facebook&code=thisisthestory';
      Object.defineProperty(window, 'location', {
        value: {
          href: url,
          search: url,
        },
      });
      const response = {
        data: {
          username: 'Diamond',
          email: 'valsido@gmail.com',
          token: 'cardinalsajdlsfslsfkjdlsfjflsfj',
        },
      };

      axios.get.mockResolvedValue(response);
      const component = mount(
        <Provider store={store}>
          <SocialAuth {...props} />
        </Provider>,
      );
      expect(component).toMatchSnapshot();
    });

    it('should throw exception when authentication fails', () => {
      global.window = Object.create(window);
      const url = '?facebook&code=thisisthestory';
      Object.defineProperty(window, 'location', {
        value: {
          href: url,
          search: url,
        },
      });
      const response = {
        data: {
          username: 'Diamond',
          email: 'valsido@gmail.com',
          token: 'cardinalsajdlsfslsfkjdlsfjflsfj',
        },
      };

      axios.get.mockResolvedValue(response);
      const component = mount(
        <Provider store={store}>
          <SocialAuth {...props} />
        </Provider>,
      );
      expect(component).toMatchSnapshot();
    });
  });
});
