import React from 'react';
import { Link } from 'react-router-dom';
import { EllipsisLoaderComponent } from '../loaders';
import { constants } from './duck';
import './newPassword.scss';

export const NewPasswordComponent = ({
  updatePassword,
  updatePasswordState,
}) => {
  const onFormSubmit = e => {
    e.preventDefault();
    const newPassword = e.target.elements.newPassword.value.trim();
    const rePassword = e.target.elements.rePassword.value.trim();
    const passwordMismatchText = `
      <p class="passwordMismatchText">The passwords don't match.
      Can you check and try again?</p>`;
    if (newPassword === rePassword) updatePassword(newPassword);
    else {
      document.getElementById(
        'passwordMismatchDiv',
      ).innerHTML = passwordMismatchText;
    }
  };

  const updatePasswordButton = (
    <button type="submit" className="btn new-password-button">
      Submit
    </button>
  );

  const newPasswordForm = (
    <>
      <div className="new-password-page-title">
        <h2>Whew! Just one more step..</h2>
      </div>
      <div>
        <form id="newPasswordForm" onSubmit={onFormSubmit}>
          <p className="new-password-text">Enter your new password here.</p>
          <input id="newPassword" type="password" minLength="8" required />
          <p className="new-password-text">
            {"Let's"} be sure you got it right.
          </p>
          <input
            id="rePassword"
            type="password"
            minLength="8"
            placeholder="re-enter password"
            required
          />
          {updatePasswordState === '' && updatePasswordButton}
          {updatePasswordState === constants.UPDATE_PASSWORD_ERROR &&
            updatePasswordButton}
          {updatePasswordState === constants.UPDATING_PASSWORD && (
            <EllipsisLoaderComponent />
          )}
          <div id="passwordMismatchDiv" />
        </form>
      </div>
    </>
  );

  const successMessage = (
    <>
      <div className="new-password-page-title">
        <h2>{"You've"} succefully reset your password!</h2>
      </div>
      <div>
        <p id="succesText">
          Click <Link to="/login">here </Link>to login
        </p>
      </div>
    </>
  );

  return (
    <div className="new-password-container">
      <div className="new-password">
        {updatePasswordState !== constants.UPDATE_PASSWORD_SUCCESS &&
          newPasswordForm}
        {updatePasswordState === constants.UPDATE_PASSWORD_SUCCESS &&
          successMessage}
      </div>
    </div>
  );
};

export default NewPasswordComponent;
