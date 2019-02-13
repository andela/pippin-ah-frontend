import React from 'react';
import { shallow } from 'enzyme';
import RingLoaderComponent from './RingLoaderComponent';

describe('It should render the RingLoader', () => {
  it('should render the Landing Page', () => {
    const component = shallow(<RingLoaderComponent />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
