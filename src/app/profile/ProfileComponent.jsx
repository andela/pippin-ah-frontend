import React from 'react';

const profilepicture = '../../img/download.jpeg';

const ProfileComponent = () => {
  return (
    <div className="row">
      <div className="container">
        <h1> Profile page</h1>
      </div>
      <div className="col s12 m6 l5">
        <div className="card small">
          <div className="card-image waves-effect waves-block waves-light">
            <img
              src={profilepicture}
              alt="profilepicture"
              className="activator"
            />
          </div>
          <div className="card-tabs">
            <ul className="tabs tabs-fixed-width">
              <li className="tab">
                <a href="#test4">Sarah Goblin</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col s12 m6 l2">
        <div className="card small">
          <div className="card-content">
            Interest : MATHEMATICS <br />
            <br />
            <br />
            Articles : 25 <br />
            <br /> <br />
            Following : 100 <br />
            <br />
            <br />
            Followers : 25 <br />
            <br />
            <br />
            Articles : Mentor <br />
            <br />
            <br />
          </div>
        </div>
      </div>
      <div className="col s12 m6 l5">
        <div className="card small">
          <div className="card-content">
            <h4>BIOGRAPHY</h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing el ea commodo
            consequat. Duis aute irure dolor in reprehLorem ipsum dolor sit
            amet, consectetur adipiscing el ea commodo consequat. Duis aute
            irure dolor in repreh
          </div>
          <a
            className="waves-effect waves-light btn modal-trigger"
            href="#modal1"
          >
            Update Profile
          </a>

          <div id="modal1" className="modal modal-fixed-footer">
            <div className="modal-content">
              <h4>Modal Header</h4>
              <p>A bunch of text</p>
            </div>
            <div className="modal-footer">
              <a
                href="#!"
                className="modal-close waves-effect waves-green btn-flat"
              >
                Agree
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
