import { connect } from 'react-redux';
import { doFetchArticle } from './duck';
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
    fetchArticle: articleCategory => dispatch(doFetchArticle(articleCategory)),
  };
};
const ListArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListArticleComponent);

export { ListArticleContainer, mapDispatchToProps, mapStateToProps };
