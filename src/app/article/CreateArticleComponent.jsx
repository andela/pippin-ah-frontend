import React from 'react';
import Editor from './EditorComponent';
import './create-article.scss';

const CreateArticleComponent = () => {
  return (
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
            <form className="article-form">
              <input type="text" placeholder="Title" />
              <select
                name="category"
                defaultValue=""
                className="browser-default"
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="mathematics">Mathematics</option>
                <option value="arts">Arts</option>
                <option value="science">Science</option>
                <option value="engineering">Engineering</option>
                <option value="technology">Technology</option>
              </select>
              <input type="text" placeholder="Description" />
              <div className="create-article-text">
                <Editor />
              </div>
              <div className="create-article-button">
                <button type="submit">POST</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticleComponent;
