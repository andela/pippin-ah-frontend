import React from 'react';
import { shallow } from 'enzyme';
import ProfileComponent from './ProfileComponent';

describe(' Component', () => {
  it('should render the NavBar', () => {
    const component = shallow(<ProfileComponent />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
