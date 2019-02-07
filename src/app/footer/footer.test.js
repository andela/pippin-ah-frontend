import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('HomePage Component', () => {
  it('should render the Landing Page', () => {
    const component = shallow(<Footer />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
