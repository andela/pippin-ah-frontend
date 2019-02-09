import React, { Fragment } from 'react';
import '../../style/home.scss';
import Navbar from '../navBar/NavbarComponent.jsx';

const HomeComponent = () => {
  return (
    <Fragment>
      <Navbar />
      <div id="landingPage">
        <div className="title-div">
          <div>
            <div>
              <h1>Learning made easy with learnGround</h1>
            </div>
            <div className="get-started">
              <p> Get Started </p>
            </div>
          </div>
        </div>
      </div>
      <div className="about-div">
        <div className="about-learnground">
          <h2> ABOUT LEARNGROUD </h2>
          <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing el ea commodo
            consequat. Duis aute irure dolor in reprehLorem ipsum dolor sit
            amet, consectetur adipiscing el ea commodo consequat. Duis aute
            irure dolor in repreh
          </h3>
        </div>
        <div className="about-content-div">
          <div className="about-text">
            <i className="fas fa-pencil-alt" />
            <p>first about</p>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in repreh
              </p>
            </div>
          </div>
          <div className="about-text">
            <i className="fas fa-pencil-alt" />
            <p>first about</p>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in repreh
              </p>
            </div>
          </div>
          <div className="about-text">
            <i className="fas fa-pencil-alt" />
            <p>first about</p>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in repreh
              </p>
            </div>
          </div>
        </div>
        <div className="interested-in-learnground">
          <p>
            INTERESTED IN LEARNGROUND? DONT BE LEFT{' '}
            <span className="out">OUT </span>{' '}
          </p>
          <span className="register">REGISTER</span>
        </div>
        <hr className="first-line" />
        <div className="top-learners-div-container">
          <div>
            <h3>TOP LEARNERS</h3>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from
            </p>
          </div>
          <dir className="top-learners-div">
            <div className="top-learners-profile">
              <img
                src="https://previews.123rf.com/images/rahultiwari3190/rahultiwari31901605/rahultiwari3190160500123/57910047-a-young-beautiful-indian-college-student-isolated-white-background.jpg"
                alt="Top learner"
                className="top-learners-profile-pix"
              />
              <p> ANI JASMINE</p>
            </div>

            <div className="top-learners-profile">
              <img
                src="https://previews.123rf.com/images/rahultiwari3190/rahultiwari31901605/rahultiwari3190160500123/57910047-a-young-beautiful-indian-college-student-isolated-white-background.jpg"
                alt="Top learner"
                className="top-learners-profile-pix"
              />
              <p> ANI JASMINE</p>
            </div>

            <div className="top-learners-profile">
              <img
                src="https://previews.123rf.com/images/rahultiwari3190/rahultiwari31901605/rahultiwari3190160500123/57910047-a-young-beautiful-indian-college-student-isolated-white-background.jpg"
                alt="Top learner"
                className="top-learners-profile-pix"
              />
              <p> ANI JASMINE</p>
            </div>
          </dir>
        </div>
        <div className="landingPage-video-div">
          <h4>WHAT YOU NEED TO KNOW ABOUT LEARNING</h4>
          <div>
            <iframe
              width="760"
              height="415"
              src="https://www.youtube.com/embed/5JKgUoY9pTg"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope;
            picture-in-picture"
              allowFullScreen
              title="learnground"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomeComponent;
