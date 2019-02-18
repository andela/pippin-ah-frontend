import { connect } from 'react-redux';
import { doCreateArticle } from './duck';
import CreateArticleComponent from './CreateArticleComponent';

const mapStateToProps = ({ createArticle: { createStatus } }) => {
  return { createStatus };
};
const mapDispatchToProps = dispatch => {
  return {
    createArticle: articleDetails => dispatch(doCreateArticle(articleDetails)),
  };
};
const CreateArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateArticleComponent);

export default CreateArticleContainer;
