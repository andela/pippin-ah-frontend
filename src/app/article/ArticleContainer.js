import { connect } from 'react-redux';
import ArticleComponent from './ArticleComponent';
import { doFetchArticle, doBookmarkArticle, doRemoveBookmark } from './duck';

const mapStateToProps = ({
  createArticle: { singleFetchStatus },
  bookmarkArticle: { bookmarkArticleState },
  fetchArticle: { articleData },
}) => {
  return { singleFetchStatus, bookmarkArticleState, articleData };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchSingleArticle: slug => dispatch(doFetchArticle(slug)),
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
