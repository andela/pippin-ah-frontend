import { connect } from 'react-redux';
import ArticleComponent from './ArticleComponent';

import { doFetchArticle, doUploadHighlight, doBookmarkArticle, doRemoveBookmark } from './duck';

const mapStateToProps = ({
  createArticle: { singleFetchStatus, highlightUploadStatus },
  login: { loginData },
  signup: { data },
  bookmarkArticle: { bookmarkArticleState },
  fetchArticle: { articleData },
}) => {
  const signupData = data;
  return { singleFetchStatus, highlightUploadStatus, loginData, signupData, bookmarkArticleState, articleData };
})
const mapDispatchToProps = dispatch => {
  return {
    fetchSingleArticle: slug => dispatch(doFetchArticle(slug)),
    uploadHighlightedText: uploadObject =>
      dispatch(doUploadHighlight(uploadObject)),
    bookmarkArticle: (slug, currentData) =>
      dispatch(doBookmarkArticle(slug, currentData)),
    removeBookmark: (slug, currentData) =>
      dispatch(doRemoveBookmark(slug, currentData)),
  };
};

const ArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleComponent);

export default ArticleContainer;
