import React from 'react';
import { shallow } from 'enzyme';
import HomeContainer from './HomeContainer';

describe('HomePage Component', () => {
  it('should render the Landing Page', () => {
    const component = shallow(<HomeContainer />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
