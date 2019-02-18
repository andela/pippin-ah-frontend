import { connect } from 'react-redux';
import { doFetchArticle } from './duck';
import ListArticleComponent from './ListArticleComponent';

const mapStateToProps = ({
  fetchArticle: { fetchArticleState, errorMessage },
}) => {
  return { fetchArticleState, errorMessage };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchArticle: () => dispatch(doFetchArticle()),
  };
};
const ListArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListArticleComponent);

export { ListArticleContainer, mapDispatchToProps, mapStateToProps };
