import React, { Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import TwitterLogin from 'react-twitter-auth';
import { EllipsisLoaderComponent } from '../loaders';
import { RingLoaderComponent } from '../loaders';
import { constants } from './duck';
import { facebook, twitter, googleplus } from '../../img';
import { googleUrl, facebookUrl } from './duck/operations';
import './signin.scss';

export class LoginComponent extends React.Component {
  onSuccess = response => {
    response.json().then(response => {
      localStorage.setItem('token', response.token);
      const { updateLogin } = this.props;
      updateLogin('success');
    });
  };

  onFailed = error => {
    console.log(error);
  };

  render() {
    const { loginUser, loginState } = this.props;

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
                      <a href={facebookUrl}>
                        <i className="fab fa-facebook-f" id="facebookBtn" />
                      </a>
                    </div>
                    <div className="fb-text-wrapper-signIn">
                      <span className="social-text-signIn">
                        <a href={facebookUrl}> Sign in with Facebook </a>
                      </span>
                    </div>
                  </div>
                  <div className="btn-twitterr">
                    <TwitterLogin
                      loginUrl="http://localhost:3000/api/v1/users/twitter"
                      onFailure={this.onFailed}
                      onSuccess={this.onSuccess}
                      requestTokenUrl="http://localhost:3000/api/v1/users/twitter/reverse"
                    />
                  </div>
                  <div className="btn-googlee">
                    <div className="google-icon-div-signIn">
                      <a href={googleUrl}>
                        {' '}
                        <i className="fab fa-google" />{' '}
                      </a>
                    </div>
                    <div className="google-text-wrapper-signIn">
                      <span className="social-text-signIn">
                        <a href={googleUrl}>Sign in with Google </a>
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
                      <a href="/resetpassword">Forgot Password?</a>
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
  }
}

export default LoginComponent;
