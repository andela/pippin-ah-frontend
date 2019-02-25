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
      coverImageUrl: '',
      uploadCoverUrl: '',
    };
  }

  handleFilePick = () => {
    document.getElementById('file-picker').click();
  };

  handleEditorChange = content => {
    this.setState({ body: content });
  };

  uploadArticle = e => {
    e.preventDefault();
    const { createArticle } = this.props;
    this.setState({ canScrollToTop: true });
    const title = e.target.elements.title.value.trim();
    const description = e.target.elements.description.value.trim();
    const category = e.target.elements.category.value;
    const { body, uploadCoverUrl } = this.state;
    createArticle({
      title,
      category,
      description,
      body,
      uploadCoverUrl,
    });
  };

  render() {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/login" />;
    }
    const { createStatus } = this.props;
    const { canScrollToTop, coverImageUrl, uploadCoverUrl } = this.state;
    if (createStatus.status === constants.CREATE_ERROR && canScrollToTop) {
      window.scrollTo(0, 0);
      this.setState({ canScrollToTop: false });
    } else if (createStatus.status === constants.CREATE_SUCCESS) {
      return <Redirect to={`/article/${createStatus.data}`} />;
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
              <div className="author-cover">
                <div
                  className="card-image"
                  onClick={() => {
                    this.handleFilePick();
                  }}
                >
                  {uploadCoverUrl ? (
                    <Fragment>
                      <img src={coverImageUrl} alt="article cover" />
                      <span className="cover-image-text">Article Cover</span>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <i className="fas fa-upload" />
                      <span className="cover-image-text">
                        Click on icon to add cover
                      </span>
                    </Fragment>
                  )}
                  <input
                    type="file"
                    id="file-picker"
                    accept="image/*"
                    onChange={e => {
                      this.setState({
                        coverImageUrl: URL.createObjectURL(e.target.files[0]),
                        uploadCoverUrl: e.target.files[0],
                      });
                    }}
                  />
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
