import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { PreloaderComponent } from '../loaders';
import { constants } from './duck';
import Editor from './EditorComponent';
import './create-article.scss';

/* eslint-disable react/prefer-stateless-function */
class CreateArticleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      canScrollToTop: false,
    };
  }

  handleEditorChange = content => {
    this.setState({ body: content });
  };

  uploadArticle = e => {
    e.preventDefault();
    const { createArticle } = this.props;
    const { body } = this.state;
    this.setState({ canScrollToTop: true });
    const title = e.target.elements.title.value.trim();
    const description = e.target.elements.description.value.trim();
    const category = e.target.elements.category.value;
    createArticle({ title, category, description, body });
  };

  render() {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/login" />;
    }
    const { createStatus } = this.props;
    const { canScrollToTop } = this.state;
    if (createStatus.status === constants.CREATE_ERROR && canScrollToTop) {
      window.scrollTo(0, 0);
      this.setState({ canScrollToTop: false });
    } else if (createStatus.status === constants.CREATE_SUCCESS) {
      return <Redirect to={`/articles/${createStatus.data}`} />;
    }
    return (
      <Fragment>
        {createStatus.status === constants.CREATING && (
          <div className="loader-container">
            <PreloaderComponent />
          </div>
        )}
        <div className="create-wrapper">
          <div className="create-container">
            <div className="content-container">
              <div className="create-author-details">
                <img
                  alt="user"
                  src={require('../../img/student.jpeg')}
                  className="author-photo"
                />
                <div className="create-author-name">
                  <div className="create-auth-name">Tom Henkins</div>
                </div>
              </div>
              <div className="create-form">
                <form className="article-form" onSubmit={this.uploadArticle}>
                  {createStatus.status === constants.CREATE_ERROR && (
                    <div className="error-message-container">
                      <div className="content">
                        <div className="header">
                          There was some error creating your article
                        </div>
                        <ul className="error-list">
                          <li className="content">{createStatus.data}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    pattern=".{3,}"
                    title="Title should be at least 3 characters"
                    required
                  />
                  <select
                    name="category"
                    defaultValue=""
                    className="browser-default"
                    required
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Arts">Arts</option>
                    <option value="Science">Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Technology">Technology</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    pattern=".{3,}"
                    title="Description should be at least 3 characters"
                    required
                  />
                  <div className="create-article-text">
                    <Editor
                      handleEditorChange={content => {
                        this.handleEditorChange(content);
                      }}
                    />
                  </div>
                  <div className="create-article-button">
                    <button
                      type="submit"
                      className={
                        createStatus.status === constants.CREATING
                          ? 'btn disabled'
                          : ''
                      }
                    >
                      POST
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CreateArticleComponent;
