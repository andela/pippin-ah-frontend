import { connect } from 'react-redux';
import { doReset } from './duck';
import { ResetPasswordComponent } from './resetPasswordComponent';

const mapStateToProps = ({ resetPassword: { resetState, errorMessage } }) => {
  return { resetState, errorMessage };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: email => dispatch(doReset(email)),
  };
};
const ResetPasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordComponent);

export { ResetPasswordContainer, mapDispatchToProps, mapStateToProps };
