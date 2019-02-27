import { connect } from 'react-redux';
import ArticleComponent from './ArticleComponent';
import { doFetchArticle, doBookmarkArticle, doRemoveBookmark } from './duck';

const mapStateToProps = ({ createArticle: { singleFetchStatus } }) => {
  return { singleFetchStatus };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchSingleArticle: slug => dispatch(doFetchArticle(slug)),
    bookmarkArticle: slug => dispatch(doBookmarkArticle(slug)),
    removeBookmark: slug => dispatch(doRemoveBookmark(slug)),
  };
};

const ArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleComponent);

export default ArticleContainer;
