import React from 'react';
import { Redirect } from 'react-router-dom';
import RingLoaderComponent from '../loaders';
import { constants } from './duck';
import './resetPassword.scss';

const resetPasswordComponent = ({ resetPassword, resetPasswordState }) => {
  const onFormSubmit = e => {
    e.preventDefault();
    const email = e.target.elements.email.value.trim();
    resetPassword(usernameOrEmail, password);
  };
  /* if (resetPasswordState === constants.RESET_SUCCESS) {
    return <Redirect to="/" />;
  } */
  return (
    <div className="reset-password-container">
      <div className="reset-password">
        <div className="reset-page-title">
          <h2>Let's help you get back your account</h2>
        </div>

        <div>
          <p className="reset-text">Enter your email address here.</p>
          <form id="reset">
            <input id="resetEmail" type="email" />
            <button type="submit" className="btn reset-button">
              <span>Submit</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default resetPasswordComponent;
