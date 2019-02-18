import React, { Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { EllipsisLoaderComponent } from '../loaders';
import { constants } from './duck';
import { facebook, twitter, googleplus } from '../../img';
import { googleUrl } from './duck/operations';
import './signin.scss';

export const LoginComponent = ({ loginUser, loginState, googleLogin }) => {
  const onFormSubmit = e => {
    e.preventDefault();
    const usernameOrEmail = e.target.elements.usernameOrEmail.value.trim();
    const password = e.target.elements.password.value.trim();
    loginUser(usernameOrEmail, password);
  };
  const loginGoogle = e => {
    e.preventDefault();
    googleLogin();
  };
  if (loginState === constants.LOGIN_SUCCESS) {
    return <Redirect to="/" />;
  }
  const loginButton = (
    <>
      <button id="signin-button" type="submit">
        SIGN IN
      </button>
      <p id="alternateText">Or sign in with</p>
      <div className="row">
        <img
          className="col s4"
          id="auth-facebook-logo"
          src={facebook}
          alt="facebook logo"
        />
        <img
          className="col s4"
          id="auth-twitter-logo"
          src={twitter}
          alt="twitter logo"
        />
        <img
          className="col s4"
          id="auth-googleplus-logo"
          src={googleplus}
          alt="googleplus logo"
        />
      </div>
      <div id="auth-forgot-password">
        <Link to="/resetpassword">Forgot Password? </Link> |
        <Link to="/signup"> Create an Account</Link>
      </div>
    </>
  );
  return (
    <Fragment>
      <div className="relative-div-signIn">
        <div className="signIn-div-wrapper" />
        <div className="signIn-container">
          <div className="signIn-wrapper row">
            <div id="signin-form" className="col s12">
              <div className="signIn-text">
                Sign <span className="signIn-blue">In</span>
              </div>
              <form id="login" onSubmit={onFormSubmit}>
                <input
                  id="usernameOrEmail"
                  type="text"
                  name="usernameOrEmail"
                  placeholder="Username or Email"
                  required
                />
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <div id="button-div" className="row">
                  {loginState !== constants.LOGGING_IN && loginButton}
                  {loginState === constants.LOGGING_IN && (
                    <EllipsisLoaderComponent />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginComponent;
