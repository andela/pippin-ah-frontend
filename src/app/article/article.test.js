import React from 'react';
import { mount } from 'enzyme';
import ArticleContainer from './ArticleContainer';

describe('Article Container', () => {
  it('should render the Article Page', () => {
    const component = mount(<ArticleContainer />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
