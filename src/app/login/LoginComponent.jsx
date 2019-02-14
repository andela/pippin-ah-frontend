import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { RingLoaderComponent } from '../loaders';
import { constants } from './duck';
import './signin.scss';

export const LoginComponent = ({ loginUser, loginState }) => {
  const onFormSubmit = e => {
    e.preventDefault();
    const usernameOrEmail = e.target.elements.usernameOrEmail.value.trim();
    const password = e.target.elements.password.value.trim();
    loginUser(usernameOrEmail, password);
  };
  if (loginState === constants.LOGIN_SUCCESS) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <div className="relative-div-signIn">
        <div className="signIn-div-wrapper">
          <div className="signIn-container">
            <div className="close-button-div-signIn">
              <p className="close-button-sign close"> X </p>
            </div>
            <div className="signIn-text">
              Sign <span className="up">In</span>
            </div>
            <div className="signIn-wrapper">
              <div className="social-media-icons-signIn">
                <div className="btn-facebookk">
                  <div className="facebook-icon-div-signIn">
                    <i className="fab fa-facebook-f" />
                  </div>
                  <div className="fb-text-wrapper-signIn">
                    <span className="social-text-signIn">
                      Sign in with Facebook
                    </span>
                  </div>
                </div>
                <div className="btn-twitterr">
                  <div className="twitter-icon-div-signIn">
                    <i className="fab fa-twitter" />
                  </div>
                  <div className="twitter-text-wrapper-signIn">
                    <span className="social-text-signIn">
                      Sign in with Twitter
                    </span>
                  </div>
                </div>
                <div className="btn-googlee">
                  <div className="google-icon-div-signIn">
                    <i className="fab fa-google" />
                  </div>
                  <div className="google-text-wrapper-signIn">
                    <span className="social-text-signIn">
                      Sign in with Google
                    </span>
                  </div>
                </div>
              </div>
              <form className="login" onSubmit={onFormSubmit}>
                <div className="input-groups-signIn">
                  <div className="form-icon-div-signIn">
                    <i className="fas fa-envelope form-input-icons-signIn" />
                  </div>
                  <input
                    id="usernameOrEmail"
                    type="text"
                    name="usernameOrEmail"
                    placeholder="Username or Email"
                    required
                  />
                </div>
                <div className="input-groups-signIn">
                  <div className="form-icon-div-signIn">
                    <i className="fas fa-key form-input-icons-signIn" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <button className="btn-submit-signIn" type="submit">
                  SIGN IN
                </button>
                <div className="sign-up-alternative-div-signIn">
                  <p className="sign-up-alternative-text-signIn">
                    {' '}
                    Forgort Password?
                  </p>
                </div>
              </form>
            </div>
            <div className="ring-loader">
              {loginState === constants.LOGGING_IN && <RingLoaderComponent />}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginComponent;
