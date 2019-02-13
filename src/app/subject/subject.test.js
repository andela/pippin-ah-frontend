import React from 'react';
import { shallow } from 'enzyme';
import { Subject } from './index';

describe(' Component', () => {
  it('should render the Subject component', () => {
    const component = shallow(<Subject />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
