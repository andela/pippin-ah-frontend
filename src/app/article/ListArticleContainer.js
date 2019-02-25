import { connect } from 'react-redux';
import { doFetchArticles, doSetCategory } from './duck';
import ListArticleComponent from './ListArticleComponent';

const mapStateToProps = ({
  fetchArticle: {
    fetchArticleState,
    articleCategory,
    articleData,
    errorMessage,
  },
}) => {
  return { fetchArticleState, articleCategory, articleData, errorMessage };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchArticle: articleCategory => dispatch(doFetchArticles(articleCategory)),
    setCategory: articleCategory => dispatch(doSetCategory(articleCategory)),
  };
};
const ListArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListArticleComponent);

export { ListArticleContainer, mapDispatchToProps, mapStateToProps };
