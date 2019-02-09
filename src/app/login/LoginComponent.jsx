import React from 'react';
import { withRouter } from 'react-router-dom';
import RingLoaderComponent from '../loaders';
import { constants } from './duck';
import '../../style/signup.scss';
import {
  cancel,
  facebook,
  twitter,
  google,
  lock,
  username,
} from '../../../assets/images';

export const LoginComponent = ({ loginUser, loginState, history }) => {
  const onFormSubmit = e => {
    e.preventDefault();
    const usernameOrEmail = e.target.elements.usernameOrEmail.value.trim();
    const password = e.target.elements.password.value.trim();
    loginUser(usernameOrEmail, password);
  };
  if (loginState === constants.LOGIN_SUCCESS) {
    history.push('/');
  }
  return (
    <div className="signup-box">
      <img className="btn-close" src={cancel} alt="close" />
      <div className="signup-text">
        Sign <span className="up">In</span>
      </div>
      <div className="signup-wrapper">
        <div className="social-auth">
          <div className="btn-facebook">
            <img className="social-icon" src={facebook} alt="facebook" />
            <div className="fb-text-wrapper">
              <span className="social-text">Sign in with Facebook</span>
            </div>
          </div>
          <div className="btn-twitter">
            <img className="social-icon" src={twitter} alt="twitter" />
            <div className="twitter-text-wrapper">
              <span className="social-text">Sign in with Twitter</span>
            </div>
          </div>
          <div className="btn-google">
            <img
              className="social-icon google-icon"
              src={google}
              alt="google"
            />
            <div className="google-text-wrapper">
              <span className="social-text">Sign in with Google</span>
            </div>
          </div>
        </div>
        <form className="login" onSubmit={onFormSubmit}>
          <div className="input-group">
            <img src={username} alt="email" />
            <input
              id="usernameOrEmail"
              type="text"
              name="usernameOrEmail"
              placeholder="Username or Email"
              required
            />
          </div>
          <div className="input-group">
            <img src={lock} alt="lock" />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <button type="submit">
              <span className="submit-text">SIGN IN</span>
            </button>
            <div className="signin-option">
              <span className="account">
                Have an account?
                <span className="signin">Sign In</span>
              </span>
            </div>
          </div>
        </form>
      </div>
      <div className="ring-loader">
        {loginState === constants.LOGGING_IN && <RingLoaderComponent />}
      </div>
    </div>
  );
};

export default withRouter(LoginComponent);
