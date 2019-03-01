import React from 'react';

const HighlightCommentComponent = ({
  style,
  author: { username },
  comment,
}) => {
  return (
    <div className="highlight-comment-container" style={style}>
      <div className="highlight-author">{username}</div>
      <div className="highlight-comment-text">{comment}</div>
    </div>
  );
};

export default HighlightCommentComponent;
