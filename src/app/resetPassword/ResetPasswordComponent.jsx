import React from 'react';
import { EllipsisLoaderComponent } from '../loaders';
import { constants } from './duck';
import './resetPassword.scss';

export const ResetPasswordComponent = ({ resetPassword, resetState }) => {
  const onFormSubmit = e => {
    e.preventDefault();
    const email = e.target.elements.resetEmail.value.trim();
    resetPassword(email);
  };

  const resetButton = (
    <button type="submit" className="btn reset-button">
      Submit
    </button>
  );

  const resetForm = (
    <>
      <div className="reset-page-title">
        <h2>{"Let's"} help you get back your account</h2>
      </div>
      <div>
        <p className="reset-text">Enter your email address here.</p>
        <form id="reset" onSubmit={onFormSubmit}>
          <input id="resetEmail" type="email" required />
          {resetState === '' && resetButton}
          {resetState === constants.RESET_ERROR && resetButton}
          {resetState === constants.RESETTING && <EllipsisLoaderComponent />}
        </form>
      </div>
    </>
  );

  const successMessage = (
    <>
      <div className="reset-page-title">
        <h2>We just sent you a mail</h2>
      </div>
      <div>
        <p className="reset-text">
          An <b>email</b> has been sent to your account. Click the <b>link</b>{' '}
          in the email to reset your password. <br />
          If you {"don't"} see the email, check other places it might be, like
          your <b>junk</b> or <b>spam</b> folders.
        </p>
      </div>
      <a href="/resetpassword" className="reset-text">
        {"Didn't"} recieve a mail?
      </a>
    </>
  );

  return (
    <div className="reset-password-container">
      <div className="reset-password">
        {resetState !== constants.RESET_SUCCESS && resetForm}
        {resetState === constants.RESET_SUCCESS && successMessage}
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
