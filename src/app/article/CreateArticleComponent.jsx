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
    };
  }

  handleEditorChange = content => {
    this.setState({ body: content });
  };

  uploadArticle = e => {
    const { createArticle } = this.props;
    const { body } = this.state;

    e.preventDefault();
    const title = e.target.elements.title.value.trim();
    const description = e.target.elements.description.value.trim();
    const category = e.target.elements.category.value;
    createArticle({ title, category, description, body });
  };

  render() {
    const { createStatus } = this.props;
    switch (createStatus.status) {
      case constants.CREATE_ERROR:
        window.scrollTo(0, 0);
        break;
      case constants.CREATE_SUCCESS:
        return <Redirect to={`/articles/${createStatus.data}`} />;
      default:
        break;
    }
    if (createStatus.status === constants.CREATE_ERROR) {
      window.scrollTo(0, 0);
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
                <div className="author-photo" />
                <div className="create-author-name">
                  <div className="create-auth-name">Tom Henkins</div>
                </div>
              </div>
              <div className="create-form">
                <form className="article-form" onSubmit={this.uploadArticle}>
                  {createStatus.status === constants.CREATE_ERROR && (
                    <div className="ui error message">
                      <div className="content">
                        <div className="header">
                          There was some error creating your article
                        </div>
                        <ul className="list">
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
                    <Editor handleEditorChange={this.handleEditorChange} />
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
