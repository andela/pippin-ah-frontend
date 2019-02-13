import React from 'react';
import { shallow } from 'enzyme';
import ProfileContainer from './ProfileContainer';

describe(' Component', () => {
  it('should render the NavBar', () => {
    const component = shallow(<ProfileContainer />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
