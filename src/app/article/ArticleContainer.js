import { connect } from 'react-redux';
import ArticleComponent from './ArticleComponent';
import { doFetchArticle } from './duck';

const mapStateToProps = ({ createArticle: { singleFetchStatus } }) => {
  return { singleFetchStatus };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchSingleArticle: slug => dispatch(doFetchArticle(slug)),
  };
};

const ArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleComponent);

export default ArticleContainer;
