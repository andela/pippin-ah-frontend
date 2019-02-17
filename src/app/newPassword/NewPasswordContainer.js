import { connect } from 'react-redux';
import { doPasswordUpdate } from './duck';
import { NewPasswordComponent } from './NewPasswordComponent';

// eslint-disable-next-line max-len
const mapStateToProps = ({
  updatePassword: { updatePasswordState, errorMessage },
}) => {
  return { updatePasswordState, errorMessage };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePassword: password => dispatch(doPasswordUpdate(password)),
  };
};

const NewPasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPasswordComponent);

export { NewPasswordContainer, mapDispatchToProps, mapStateToProps };
