import React from 'react';
import { shallow, mount, render } from 'enzyme';
import LoginComponent from './LoginComponent';

describe('Login Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<LoginComponent />).exists()).toBe(true);
  });
});
