import React, { Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { EllipsisLoaderComponent } from '../loaders';
import { constants } from './duck';
import { facebook, twitter, googleplus } from '../../img';
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

  const signupbutton = (
    <>
      <button id="signup-button" type="submit">
        SIGN UP
      </button>
      <p id="alternateText">Or sign up with</p>
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
        Already have an account?
        <Link to="/signin"> Sign In</Link>
      </div>
    </>
  );

  return (
    <Fragment>
      <div className="relative-div-signup">
        <div className="signup-div-wrapper">
          <div className="signup-container">
            <div className="signup-wrapper row">
              <div id="signup-form" className="col s12">
                <div className="signup-text">
                  Sign <span className="signup-blue">Up</span>
                </div>
                <form id="signup" onSubmit={onFormSubmit}>
                  <input
                    className={
                      !errorMessage.includes('Email') ? '' : 'input-error'
                    }
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
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
                  <input
                    className={
                      !errorMessage.includes('password') ? '' : 'input-error'
                    }
                    type="password"
                    name="rePassword"
                    placeholder="Confirm Password"
                    onChange={e => {
                      e.target.setCustomValidity('');
                    }}
                    required
                  />
                  <div id="button-div" className="row">
                    {signupState !== constants.SIGNING_UP && signupbutton}
                    {signupState === constants.SIGNING_UP && (
                      <EllipsisLoaderComponent />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignupComponent;
