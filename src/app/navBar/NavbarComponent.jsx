import React from 'react'

const NavbarComponent = () => {
    return (
        <nav className="navbarbg">
            <div>
                <div className="nav-wrapper" id="iconRight">
                    <div className="Logo">
                        <i className="far fa-play-circle" /> &nbsp;&nbsp;&nbsp;
                        <a href="#!" className="brand-logo">
                            LearnGround
                        </a>
                    </div>
                    <div>
                        <ul className="right hide-on-med-and-down">
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
                        </ul>
                        <a
                            href="#!"
                            data-target="mobile-demo"
                            className="sidenav-trigger"
                        >
                            <i className="material-icons">menu</i>
                        </a>
                    </div>
                    <div className="hide-on-med-and-down show">
                        <ul>
                            <li>
                                <a href="#!">SignIn</a>
                            </li>
                            <li>|</li>
                            <li>
                                <a href="#!">SignUp</a>
                            </li>
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
                    <a href="#!">SignIn</a>
                </li>
                <li>|</li>

                <li>
                    <a href="#!">SignUp</a>
                </li>
            </ul>
        </nav>
    )
}
export default NavbarComponent
