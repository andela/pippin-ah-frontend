import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('Footer Component', () => {
  it('should render the footer', () => {
    const component = shallow(<Footer />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
