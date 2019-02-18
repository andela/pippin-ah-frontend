import React from 'react';
import { shallow } from 'enzyme';
import NavbarComponent from './NavbarComponent';

global.localStorage = {
  getItem: key => {
    return this.store[key] || null;
  },
  setItem: (key, value) => {
    this.store[key] = value.toString();
  },
  removeItem(key) {
    delete this.store[key];
  },
};

describe(' Component', () => {
  it('should render the NavBar', () => {
    const component = shallow(<NavbarComponent />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('should render the logout button when user is logged in', () => {
    localStorage.setItem('token', 'sometoken');
    const component = shallow(<NavbarComponent />);
    const logoutButton = component.find('Link[onClick]').props();
    expect(logoutButton.children).toEqual('Logout');
  });

  it('should delete authorization token when user logs out', () => {
    const component = shallow(<NavbarComponent />);
    component.find('Link[onClick]').simulate('click');
    expect(localStorage.getItem('token')).toEqual(null);
  });
});
