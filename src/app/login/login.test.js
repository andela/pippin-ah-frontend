import React from 'react';
import { shallow, mount, render } from 'enzyme';
import LoginContainer from './LoginContainer';

describe('Login Component', () => {
  it('should render without throwing an error', () => {
    expect(
      shallow(<LoginContainer />)
        .find('form.login')
        .exists(),
    ).toBe(true);
  });
});
