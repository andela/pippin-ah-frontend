import { connect } from 'react-redux';
import { doCreateArticle } from './duck';
import CreateArticleComponent from './CreateArticleComponent';

const mapStateToProps = ({ createArticle: { createStatus } }) => {
  return { createStatus };
};
const mapDispatchToProps = dispatch => {
  return {
    signupUser: articleDetails => dispatch(doCreateArticle(articleDetails)),
  };
};
const ArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateArticleComponent);

export default ArticleContainer;
