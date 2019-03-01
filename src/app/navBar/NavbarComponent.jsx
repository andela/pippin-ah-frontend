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
    <nav id="navbarbg">
      <div>
        <div className="nav-wrapper" id="iconRight">
          <div className="Logo">
            <i className="far fa-play-circle" /> &nbsp;&nbsp;&nbsp;
            <Link to="/" className="brand-logo">
              LearnGround
            </Link>
          </div>
          <div className="categories">
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/articles/science">Science</Link>
              </li>
              <li>
                <Link to="/articles/technology">Technology</Link>
              </li>
              <li>
                <Link to="/articles/engineering">Engineering</Link>
              </li>
              <li>
                <Link to="/articles/arts">Arts</Link>
              </li>
              <li>
                <Link to="/articles/mathematics">Mathematics</Link>
              </li>
            </ul>
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
          </div>
          <div className="hide-on-med-and-down show">
            <ul>
              <>
                {isSignedIn && (
                  <>
                    <li>
                      <Link to="/profile">
                        <i className="material-icons">account_circle</i>
                      </Link>
                    </li>
                    <li>
                      <Link to="/articles/bookmarks">Bookmarks</Link>
                    </li>
                  </>
                )}
              </>
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
          <Link to="/articles/science">Science</Link>
        </li>
        <li>
          <Link to="/articles/technology">Technology</Link>
        </li>
        <li>
          <Link to="/articles/engineering">Engineering</Link>
        </li>
        <li>
          <Link to="/articles/arts">Arts</Link>
        </li>
        <li>
          <Link to="/articles/mathematics">Mathematics</Link>
        </li>
        <li>
          <Link to="/articles/bookmarks">Bookmarks</Link>
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
