import { connect } from 'react-redux';
import { doFetchArticle, doSetCategory, doAppendArticleData } from './duck';
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
    fetchArticle: (articleCategory, page) =>
      dispatch(doFetchArticle(articleCategory, page)),
    setCategory: articleCategory => dispatch(doSetCategory(articleCategory)),
    appendArticleData: (articleCategory, page) =>
      dispatch(doAppendArticleData(articleCategory, page)),
  };
};
const ListArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListArticleComponent);

export { ListArticleContainer, mapDispatchToProps, mapStateToProps };
