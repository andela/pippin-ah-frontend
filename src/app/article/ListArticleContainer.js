import { connect } from 'react-redux';
import { doFetchArticle, doSetCategory, doUpdateCategoryData } from './duck';
import ListArticleComponent from './ListArticleComponent';

const mapStateToProps = ({
  fetchArticle: {
    fetchArticleState,
    articleCategory,
    currentPage,
    articleData,
    errorMessage,
  },
}) => {
  return {
    fetchArticleState,
    articleCategory,
    articleData,
    currentPage,
    errorMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchArticle: (articleCategory, page) =>
      dispatch(doFetchArticle(articleCategory, page)),
    setCategory: articleCategory => dispatch(doSetCategory(articleCategory)),
    appendArticleData: (articleCategory, page, currentData) =>
      dispatch(doUpdateCategoryData(articleCategory, page, currentData)),
  };
};

const ListArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListArticleComponent);

export { ListArticleContainer, mapDispatchToProps, mapStateToProps };
