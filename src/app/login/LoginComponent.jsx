import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { EllipsisLoaderComponent } from '../loaders';
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
  const loginButton = <button type="submit">SIGN IN</button>;
  return (
    <Fragment>
      <div className="relative-div-signIn">
        <div className="signIn-div-wrapper">
          <div className="signIn-container">
            <div className="signIn-text">
              Sign <span className="up">In</span>
            </div>
            <div className="signIn-wrapper">
              <form className="login" onSubmit={onFormSubmit}>
                <div className="input-groups-signIn">
                  <input
                    id="usernameOrEmail"
                    type="text"
                    name="usernameOrEmail"
                    placeholder="Username or Email"
                    required
                  />
                </div>
                <div className="input-groups-signIn">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>
                {loginState !== constants.LOGGING_IN && loginButton}
                <div className="sign-up-alternative-div-signIn">
                  <p className="sign-up-alternative-text-signIn">
                    <a href="/resetpassword">Forgot Password?</a>
                  </p>
                </div>
              </form>
            </div>
            {loginState === constants.LOGGING_IN && <EllipsisLoaderComponent />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginComponent;
