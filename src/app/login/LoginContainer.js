import { connect } from 'react-redux';
import { doLogin } from './duck';
import { LoginComponent as component } from './LoginComponent';

const mapStateToProps = state => {
  return {
    loginState: state.login.loginState,
    errorMessage: state.login.errorMessage,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loginUser: (usernameOrEmail, password) =>
      dispatch(doLogin(usernameOrEmail, password)),
  };
};
const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);

export default LoginContainer;
