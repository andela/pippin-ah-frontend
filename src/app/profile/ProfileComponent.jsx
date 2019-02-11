import React from 'react';
import '../../style/profile.scss';
import profilepicture from '../../img/students.jpeg';

const ProfileComponent = () => {
  return (
    <div>
      <div className="container">
        <h2 className="center-align headlinesProfile"> PROFILE </h2>
      </div>
      <div className="row from-top">
        <div className="col s12 m6 l1" />
        <div className="col s12 m6 l3">
          <div className="card large z-depth-0">
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
                  <h6 className="headlines">SARAH GOBLIN</h6>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col s12 m6 l2 move-top">
          <div className="card small z-depth-0">
            <div className="card-content">
              Interest : &nbsp;Mathematics <br />
              <br /> <br />
              Articles : &nbsp;25 <br />
              <br /> <br />
              Following : &nbsp;100 <br />
              <br /> <br />
              Followers : &nbsp;25 <br />
              <br /> <br />
              Mentor &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <i className="material-icons prefix">check_box</i>
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
        <div className="col s12 m6 l5 move-top">
          <div className="card small z-depth-0">
            <div className="card-content">
              <span className="headlines">BIOGRAPHY</span>
              <br />
              <span id="bio">
                Lorem ipsum dolor sit amet, consectetur adipiscing el ea commodo
                consequat. Duis aute irure dolor in reprehLorem ipsum dolor sit
                amet, consectetur adipiscing el ea commodo consequat. Duis aute
                irure dolor in repreh
              </span>
            </div>
            <a className="btn modal-trigger btncolor" href="#modal1" id="shift">
              Update Profile
            </a>
            <div id="modal1" className="modal modal-fixed-footer">
              <div className="modal-content" id="cardpad">
                <div className="row">
                  <div className="col s4">
                    <div className="card small">
                      <div className="card-image waves-effect waves-block waves-light removespace">
                        <img src={profilepicture} alt="profilepicture" />
                      </div>
                      <div className="card-tabs">
                        <form action="#">
                          <div className="file-field input-field">
                            <div className="btn btncolor" id="centralize">
                              <span>Edit Photo</span>
                              <input type="file" multiple />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <form className="col s8">
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix color-ions">
                          account_circle
                        </i>
                        <input
                          id="icon_prefix"
                          type="text"
                          className="validate"
                        />
                        <label htmlFor="icon_prefix">First Name</label>
                      </div>
                      <div className="input-field col s12">
                        <i className="material-icons prefix color-ions">
                          account_circle
                        </i>
                        <input
                          id="icon_telephone"
                          type="tel"
                          className="validate"
                        />
                        <label htmlFor="icon_telephone">Last Name</label>
                      </div>
                      <div className="input-field col s12">
                        <i className="material-icons prefix color-ions">
                          favorite
                        </i>
                        <input
                          id="icon_telephone"
                          type="tel"
                          className="validate"
                        />
                        <label htmlFor="icon_telephone">Interest</label>
                      </div>
                      <div className="input-field col s12">
                        <i className="material-icons prefix color-ions">
                          mode_edit
                        </i>
                        <textarea
                          id="textarea1"
                          className="materialize-textarea"
                        />
                        <label htmlFor="textarea1">Biography</label>
                      </div>
                      <button
                        className="btn waves-effect waves-light btncolor"
                        type="submit"
                        name="action"
                        id="shiftupdate"
                      >
                        Update
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div col s12 m6 l1 />
      </div>
      <div>
        {' '}
        <div className="row move-top2">
          <div className="col s12 m6 l4" />
          <div className="col s12 m6 l8">
            <span className="headlines">TOP FIVE ARTICLES</span>
            <div id="topArticles">
              <p>
                <a href="#!">
                  The Importance of Educating The girl Child Adults
                </a>
              </p>
              <p>
                <a href="#!">Apples And its many many Benefits</a>
              </p>
              <p>
                <a href="#!">The story of a young black girl</a>
              </p>
              <p>
                <a href="#!">This is Africa And we are not afriad</a>
              </p>
              <p>
                <a href="#!">
                  The courage that makes Lion the king of the jungle
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
