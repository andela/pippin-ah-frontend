import React from 'react';
import { Redirect } from 'react-router-dom';
import RingLoaderComponent from '../loaders';
import { constants } from './duck';
import './signup.scss';
import {
  cancel,
  facebook,
  twitter,
  google,
  email,
  lock,
  username,
} from '../../img';

const SignupComponent = ({ signupUser, signupState, errorMessage }) => {
  const onFormSubmit = e => {
    e.preventDefault();
    const userEmail = e.target.elements.email.value.trim();
    const name = e.target.elements.username.value.trim();
    const password = e.target.elements.password.value.trim();
    signupUser(userEmail, name, password);
  };

  if (signupState === constants.SIGNUP_SUCCESS) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup-box">
      <img className="btn-close" src={cancel} alt="close" />
      <div className="signup-text">
        Sign <span className="up">Up</span>
      </div>
      <div className="signup-wrapper">
        <div className="social-auth">
          <div className="btn-facebook">
            <img className="social-icon" src={facebook} alt="facebook" />
            <div className="fb-text-wrapper">
              <span className="social-text">Sign up with Facebook</span>
            </div>
          </div>
          <div className="btn-twitter">
            <img className="social-icon" src={twitter} alt="twitter" />
            <div className="twitter-text-wrapper">
              <span className="social-text">Sign up with Twitter</span>
            </div>
          </div>
          <div className="btn-google">
            <img
              className="social-icon google-icon"
              src={google}
              alt="google"
            />
            <div className="google-text-wrapper">
              <span className="social-text">Sign up with Google</span>
            </div>
          </div>
        </div>
        <form onSubmit={onFormSubmit}>
          <div className="input-group">
            <img src={email} alt="email" />
            <input
              className={!errorMessage.includes('Email') ? '' : 'input-error'}
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="input-group">
            <img src={username} alt="username" />
            <input
              className={
                !errorMessage.includes('username') ? '' : 'input-error'
              }
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          </div>
          <div className="input-group">
            <img src={lock} alt="lock" />
            <input
              className={
                !errorMessage.includes('password') ? '' : 'input-error'
              }
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <img src={lock} alt="key" />
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
            <button type="submit">
              <span className="submit-text">SIGN UP</span>
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
        {signupState === constants.SIGNING_UP && <RingLoaderComponent />}
      </div>
    </div>
  );
};

export default SignupComponent;
