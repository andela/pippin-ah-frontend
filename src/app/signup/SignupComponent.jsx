import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { RingLoaderComponent } from '../loaders';
import { constants } from './duck';
import './signup.scss';

const SignupComponent = ({ signupUser, signupState, errorMessage }) => {
  const onFormSubmit = e => {
    e.preventDefault();
    const userEmail = e.target.elements.email.value.trim();
    const name = e.target.elements.username.value.trim();
    const password = e.target.elements.password.value.trim();
    const rePassword = e.target.elements.rePassword.value.trim();
    if (password !== rePassword) {
      e.target.elements.rePassword.setCustomValidity('passwords must match');
      return;
    }
    signupUser(userEmail, name, password);
  };

  if (signupState === constants.SIGNUP_SUCCESS) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div className="relative-div">
        <div className="signup-div-wrapper">
          <div className="signup-divs">
            <div className="close-button-div">
              <p className="close-button close"> X </p>
            </div>
            <div className="signup-text">
              Sign <span className="up">Up</span>
            </div>
            <div className="signup-wrapper">
              <div className="social-media-icons">
                <div className="btn-facebookk">
                  <div className="facebook-icon-div">
                    <i className="fab fa-facebook-f" />
                  </div>
                  <div className="fb-text-wrapper">
                    <span className="social-text">Sign up with Facebook</span>
                  </div>
                </div>
                <div className="btn-twitterr">
                  <div className="twitter-icon-div">
                    <i className="fab fa-twitter" />
                  </div>
                  <div className="twitter-text-wrapper">
                    <span className="social-text">Sign up with Twitter</span>
                  </div>
                </div>
                <div className="btn-googlee">
                  <div className="google-icon-div">
                    <i className="fab fa-google" />
                  </div>
                  <div className="google-text-wrapper">
                    <span className="social-text">Sign up with Google</span>
                  </div>
                </div>
              </div>
              <form onSubmit={onFormSubmit}>
                <div className="input-groups">
                  <div className="form-icon-div">
                    <i className="fas fa-envelope form-input-icons" />
                  </div>
                  <input
                    className={
                      !errorMessage.includes('Email') ? '' : 'input-error'
                    }
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="input-groups">
                  <div className="form-icon-div">
                    <i className="fas fa-user form-input-icons" />
                  </div>
                  <input
                    className={
                      !errorMessage.includes('username') ? '' : 'input-error'
                    }
                    type="text"
                    name="username"
                    placeholder="Username"
                    pattern=".{6,}"
                    title="Username must be at least 6 characters"
                    required
                  />
                </div>
                <div className="input-groups">
                  <div className="form-icon-div">
                    <i className="fas fa-key form-input-icons" />
                  </div>
                  <input
                    className={
                      !errorMessage.includes('password') ? '' : 'input-error'
                    }
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    pattern=".{8,}"
                    title="Password must be at least 8 characters"
                    required
                  />
                </div>
                <div className="input-groups">
                  <div className="form-icon-div">
                    <i className="fas fa-key form-input-icons" />
                  </div>
                  <input
                    className={
                      !errorMessage.includes('password') ? '' : 'input-error'
                    }
                    type="password"
                    name="rePassword"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <div>
                  <button className="btn-submit" type="submit">
                    <span className="submit-text">SIGN UP</span>
                  </button>
                  <div className="sign-up-alternative-div">
                    <p className="account">
                      Have an account?
                      <span className="sign-up-alternative-text"> Sign In</span>
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <div className="ring-loader">
              {signupState === constants.SIGNING_UP && <RingLoaderComponent />}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignupComponent;
