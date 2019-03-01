import { connect } from 'react-redux';
import ArticleComponent from './ArticleComponent';
import { doFetchArticle, doUploadHighlight } from './duck';

const mapStateToProps = ({
  createArticle: { singleFetchStatus, highlightUploadStatus },
  login: { loginData },
  signup: { data },
}) => {
  const signupData = data;
  return { singleFetchStatus, highlightUploadStatus, loginData, signupData };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchSingleArticle: slug => dispatch(doFetchArticle(slug)),
    uploadHighlightedText: uploadObject =>
      dispatch(doUploadHighlight(uploadObject)),
  };
};

const ArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleComponent);

export default ArticleContainer;
