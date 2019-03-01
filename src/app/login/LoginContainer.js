import { connect } from 'react-redux';
import { doLogin, updateLoginState } from './duck';
import { LoginComponent as component } from './LoginComponent';

const mapStateToProps = ({ login: { loginState, errorMessage } }) => {
  return { loginState, errorMessage };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (usernameOrEmail, password) =>
      dispatch(doLogin(usernameOrEmail, password)),
    updateLogin: state => dispatch(updateLoginState(state)),
    updateLoginState: (state, data) => dispatch(updateLoginState(state, data)),
  };
};
const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);

export { LoginContainer, mapDispatchToProps, mapStateToProps };
