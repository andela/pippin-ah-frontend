import React, { Fragment } from 'react';

const CommentComponent = ({ commentDetails }) => {
  return (
    <Fragment>
      <div className="comment-box">
        <div className="header-wrapper">
          <div className="comment-owner">
            <Fragment>
              {commentDetails.author.imageUrl ? (
                <img
                  src={commentDetails.author.imageUrl}
                  className="owner-image"
                  alt="comment-author"
                />
              ) : (
                <div className="default-photo">
                  {commentDetails.author.username[0].toUpperCase()}
                </div>
              )}
            </Fragment>
          </div>
          <div className="comment-container">
            <div className="comment-header">
              <span className="comment-author">
                {commentDetails.author.lastName
                  ? `${commentDetails.author.firstName} ${
                      commentDetails.author.lastName
                    }`
                  : commentDetails.author.username}
              </span>
              <span className="comment-date">
                {Object.keys(commentDetails.comment)[0]}
              </span>
            </div>
            <p className="comment-text">
              {commentDetails.comment[Object.keys(commentDetails.comment)[0]]}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CommentComponent;
