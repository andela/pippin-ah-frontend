import { connect } from 'react-redux';
import ArticleComponent from './ArticleComponent';
import { doFetchArticle, doBookmarkArticle } from './duck';

const mapStateToProps = ({ createArticle: { singleFetchStatus } }) => {
  return { singleFetchStatus };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchSingleArticle: slug => dispatch(doFetchArticle(slug)),
    bookmarkArticle: (slug, articleData) =>
      dispatch(doBookmarkArticle(slug, articleData)),
  };
};

const ArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleComponent);

export default ArticleContainer;
