import React from 'react';
import { shallow } from 'enzyme';
import RingLoaderComponent from './RingLoaderComponent';
import EllipsisLoaderComponent from './EllipsisLoaderComponent';
import PreloaderComponent from './PreloaderComponent';

describe('It should render the RingLoader', () => {
  it('should render the RingLoaderComponent', () => {
    const component = shallow(<RingLoaderComponent />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});

describe('It should render the EllipsisLoader', () => {
  it('should render the EllipsisLoaderComponent', () => {
    const component = shallow(<EllipsisLoaderComponent />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});

describe('It should render the PreloaderComponent', () => {
  it('should render the PreloaderComponent', () => {
    const component = shallow(<PreloaderComponent />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
