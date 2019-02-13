import React from 'react';
import './resetPassword.scss';

const resetPasswordComponent = () => {
  return (
    <div className="reset-password-container">
      <div className="reset-page-title">
        <h2>Let's help you get back your account</h2>
      </div>

      <div className="reset-row">
        <p className="reset-text">Enter your email address here.</p>
        <form id="reset">
          <input className="resetEmail" id="resetEmail" type="email" />
        </form>
        <button
          id="submit"
          className="btn reset-button"
          type="submit"
          name="action"
        >
          <span>Submit</span>
        </button>
      </div>
    </div>
  );
};

export default resetPasswordComponent;
