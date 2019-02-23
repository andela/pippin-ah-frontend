import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './navBar.scss';
import { actions as loginActions } from '../login/duck';
import { actions as signupActions } from '../signup/duck';

const { setLoginState } = loginActions;
const { setSignupState } = signupActions;

const NavbarComponent = ({ dispatch }) => {
  const isSignedIn = !!localStorage.getItem('token');
  const signUserOut = () => {
    localStorage.removeItem('token');
    dispatch(setLoginState('LOGGED_OUT'));
    dispatch(setSignupState('LOGGED_OUT'));
  };
  return (
    <nav className="navbarbg">
      <div>
        <div className="nav-wrapper" id="iconRight">
          <div className="Logo">
            <i className="far fa-play-circle" /> &nbsp;&nbsp;&nbsp;
            <a href="/" className="brand-logo">
              LearnGround
            </a>
          </div>
          <div className="categories">
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/subject">Science</Link>
              </li>
              <li>
                <Link to="/subject">Technology</Link>
              </li>
              <li>
                <Link to="/subject">Engineering</Link>
              </li>
              <li>
                <Link to="/subject">Arts</Link>
              </li>
              <li>
                <Link to="/subject">Mathematics</Link>
              </li>
            </ul>
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
          </div>
          <div className="hide-on-med-and-down show">
            <ul>
              <li>
                {isSignedIn && (
                  <Link to="/profile">
                    <i className="material-icons">account_circle</i>
                  </Link>
                )}
              </li>
              <li>
                {isSignedIn ? (
                  <Link
                    to="/"
                    onClick={() => {
                      signUserOut();
                    }}
                  >
                    Logout
                  </Link>
                ) : (
                  <Link to="/login">SignIn</Link>
                )}
              </li>
              {!isSignedIn && <li>|</li>}
              <li>{!isSignedIn && <Link to="/signup">SignUp</Link>}</li>
            </ul>
          </div>
        </div>
      </div>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <a href="#!">Science</a>
        </li>
        <li>
          <a href="#!">Technology</a>
        </li>
        <li>
          <a href="#!">Engineering</a>
        </li>
        <li>
          <a href="#!">Arts</a>
        </li>
        <li>
          <a href="#!">Mathematics</a>
        </li>
        <li>
          {isSignedIn ? (
            <Link
              to="/"
              onClick={() => {
                signUserOut();
              }}
            >
              Logout
            </Link>
          ) : (
            <Link to="/login">SignIn</Link>
          )}
        </li>
        <li>{!isSignedIn && <Link to="/signup">SignUp</Link>}</li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({
  login: { loginState },
  signup: { singupState },
}) => {
  return { loginState, singupState };
};

export default connect(mapStateToProps)(NavbarComponent);
