import { connect } from 'react-redux';
import { doFetch } from './duck';
import { SubjectComponent } from './SubjectComponent';

const mapStateToProps = ({
  fetchArticle: { fetchArticleState, errorMessage },
}) => {
  return { fetchArticleState, errorMessage };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchArticle: category => dispatch(doFetch(category)),
  };
};
const SubjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubjectComponent);

export { SubjectContainer, mapDispatchToProps, mapStateToProps };
