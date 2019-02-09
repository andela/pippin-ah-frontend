import { connect } from 'react-redux';
import { doSignUp } from './duck';
import SignupComponent from './SignupComponent';

const mapStateToProps = state => {
  return {
    signupState: state.signup.signupState,
    errorMessage: state.signup.errorMessage,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signupUser: (email, username, password) =>
      dispatch(doSignUp(email, username, password)),
  };
};
const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupComponent);

export default SignupContainer;
