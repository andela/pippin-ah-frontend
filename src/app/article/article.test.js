import React from 'react';
import { mount, shallow } from 'enzyme';
import ArticleContainer from './ArticleContainer';
import CreateArticleContainer from './CreateArticleContainer';
import CreateArticleComponent from './CreateArticleComponent';
import EditorComponent from './EditorComponent';

describe('Article Container', () => {
  it('should render the Article Page', () => {
    const component = mount(<ArticleContainer />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});

describe('CreateArticle', () => {
  it('should render the CreateArticleContainer', () => {
    const component = shallow(<CreateArticleContainer />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('should render the CreateArticleComponent', () => {
    const component = shallow(<CreateArticleComponent />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('should render the EditorComponent', () => {
    const component = shallow(<EditorComponent />);
    expect(component.exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
