import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.scss';

const NavbarComponent = () => {
  const isSignedIn = !!localStorage.getItem('token');
  return (
    <nav className="navbarbg">
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
                    localStorage.removeItem('token');
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
      </ul>
    </nav>
  );
};

export default NavbarComponent;
