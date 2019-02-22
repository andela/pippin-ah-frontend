/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './profile.scss';
import profilepicture from '../../img/avatar.jpeg';
import constants from './duck/constants';
import { EllipsisLoaderComponent } from '../loaders';

class ProfileComponent extends React.Component {
  state = {
    imageSelected: '',
    imageUrl: '',
  };

  handleSubmit = event => {
    const { updateUserProfile } = this.props;
    event.preventDefault();
    const firstName = event.target.elements.firstName.value.trim();
    const lastName = event.target.elements.lastName.value.trim();
    const interest = event.target.elements.interest.value.trim();
    const bio = event.target.elements.bio.value.trim();

    updateUserProfile(firstName, lastName, interest, bio);
  };

  uploadPicture = event => {
    event.preventDefault();
    const { imageUrl } = this.state;
    if (imageUrl !== undefined) {
      const { pictureUtils } = this.props;

      pictureUtils(imageUrl);
    }
  };

  displayImage = event => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        this.setState({ imageSelected: reader.result });
      });

      const imagefilepath = event.target.files[0];
      this.setState({
        imageUrl: imagefilepath,
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  render() {
    const { uploadStatus, updateStatus, data, loginData } = this.props;
    const { imageSelected } = this.state;
    const { newProfileUrl } = uploadStatus;
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const bio = localStorage.getItem('bio');
    const imageUrl = localStorage.getItem('imageUrl');
    const followers = localStorage.getItem('followers');
    const following = localStorage.getItem('following');
    const interests = localStorage.getItem('interests');
    const topArticles = localStorage.getItem('topArticles');
    const totalArticles = localStorage.getItem('totalArticles');
    const { newProfileDetails } = updateStatus;

    let profileData;

    if (newProfileDetails) {
      localStorage.setItem('firstName', newProfileDetails.data.firstName);
      localStorage.setItem('lastName', newProfileDetails.data.lastName);
      localStorage.setItem('bio', newProfileDetails.data.bio);
      localStorage.setItem('interests', newProfileDetails.data.interests);
    }
    if (newProfileUrl) {
      localStorage.setItem('imageUrl', newProfileUrl);
    }

    if (data) {
      profileData = data;
    } else {
      profileData = loginData;
    }

    return (
      <div>
        <div className="container">
          <h2 className="center-align profile-headlinesProfile"> PROFILE </h2>
        </div>
        <div className="row profile-from-top">
          <div className="col s12 m1 l1" />
          <div className="col s12 m6 l3">
            <div className="card small">
              <div className="card-image">
                <img
                  src={newProfileUrl || imageUrl}
                  alt="profilepicture"
                  className="activator"
                />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  {newProfileDetails
                    ? newProfileDetails.data.firstName
                    : firstName}{' '}
                  {newProfileDetails
                    ? newProfileDetails.data.lastName
                    : lastName}
                  <i className="material-icons right">more_vert</i>
                </span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  You Are Viewing<i className="material-icons right">close</i>
                </span>
                <p>
                  {newProfileDetails
                    ? newProfileDetails.data.firstName
                    : firstName}{' '}
                  {newProfileDetails
                    ? newProfileDetails.data.lastName
                    : lastName}
                </p>
              </div>
            </div>
          </div>
          <div className="col s12 m5 l2 profile-move-top" id="profile-details">
            <div className="card small z-depth-0">
              <div className="card-content">
                Articles : &nbsp;&nbsp; &nbsp;{' '}
                {profileData ? profileData.articles.total : totalArticles}{' '}
                <br />
                <br /> <br />
                Following : &nbsp;{' '}
                {profileData ? profileData.following : following} <br />
                <br /> <br />
                Followers : &nbsp;{' '}
                {profileData ? profileData.followers : followers} <br />
                <br /> <br />
                Mentor &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                {profileData ? profileData.isMentor : <h6>loading...</h6>}
                {/* <i className="material-icons prefix">check_box</i> */}
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>

          <div className="col s12 m12 l5 profile-move-top">
            <div className="card small z-depth-0">
              <div className="card-content">
                <span className="profile-headlines">BIOGRAPHY</span>
                <br />
                <span id="profile-bio">
                  {newProfileDetails ? newProfileDetails.data.bio : bio}
                </span>
              </div>
              <a
                className="btn modal-trigger profile-btncolor"
                href="#modal1"
                id="profile-shift"
              >
                Update Profile
              </a>

              <div id="modal1" className="modal modal-fixed-footer">
                <div className="modal-content" id="cardpad">
                  <div className="row">
                    <div className="col s12 m6 l4">
                      <div className="card small">
                        <div className="card-image profile-removespace">
                          <img
                            src={imageSelected || profilepicture}
                            alt="profilepicture"
                          />
                        </div>
                        <div className="card-tabs">
                          <form onSubmit={this.uploadPicture}>
                            <div className="file-field input-field">
                              {uploadStatus.status ===
                                constants.PICTURE_UPDATING && (
                                <div className="profile-Eclipsloader">
                                  <EllipsisLoaderComponent />
                                </div>
                              )}

                              {uploadStatus.status === undefined && (
                                <div className="profile-button-container">
                                  <div
                                    className="btn profile-btncolor"
                                    id="profile-buttondiv"
                                  >
                                    <input
                                      type="file"
                                      name="profilepix"
                                      id="img"
                                      onChange={this.displayImage}
                                    />
                                    <span className="profile-btnalign">
                                      change Photo
                                    </span>
                                  </div>
                                  <div id="profile-submitDiv">
                                    <button
                                      type="submit"
                                      className="btn profile-btncolor"
                                      id=""
                                      onClick={this.uploadPicture}
                                    >
                                      Upload photo
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

                            {uploadStatus.status ===
                              constants.UPDATE_SUCCESS && (
                              <span className="profile-sucessMessage">
                                Picture Uploaded Sucessfully.
                              </span>
                            )}
                            {uploadStatus.status === constants.UPDATE_ERROR && (
                              <span className="profile-centralize">
                                An Error Occured
                              </span>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                    <form
                      onSubmit={this.handleSubmit}
                      className="col s12 m6 l8"
                      id="profile-update_profile"
                    >
                      <div className="row">
                        <div className="input-field col s12">
                          <i className="material-icons prefix profile-color-ions">
                            account_circle
                          </i>
                          <input
                            id="icon_prefix"
                            type="text"
                            className="validate"
                            name="firstName"
                            defaultValue={firstName || 'Enter first Name'}
                          />
                        </div>
                        <div className="input-field col s12">
                          <i className="material-icons prefix profile-color-ions">
                            account_circle
                          </i>
                          <input
                            id="icon_telephone"
                            type="text"
                            className="validate"
                            name="lastName"
                            defaultValue={lastName || 'Enter last Name'}
                          />
                        </div>
                        <div className="input-field col s12">
                          <i className="material-icons prefix profile-color-ions">
                            favorite
                          </i>
                          <select
                            name="interest"
                            defaultValue={interests}
                            className="input-field"
                            required
                          >
                            <option>{interests}</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Arts">Arts</option>
                            <option value="Science">Science</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Technology">Technology</option>
                          </select>
                        </div>
                        <div className="input-field col s12">
                          <i className="material-icons prefix profile-color-ions">
                            mode_edit
                          </i>
                          <textarea
                            id="textarea1"
                            className="materialize-textarea"
                            name="bio"
                            defaultValue={bio || 'Biography'}
                          />
                        </div>

                        {updateStatus === constants.PROFILE_UPDATING && (
                          <EllipsisLoaderComponent />
                        )}
                        {updateStatus === '' && (
                          <button
                            className="btn profile-btncolor"
                            type="submit"
                            name="action"
                            id="profile-shiftupdate"
                          >
                            Update
                            <i className="material-icons right">send</i>
                          </button>
                        )}
                        {updateStatus.status === constants.PROFILE_UPDATING && (
                          <EllipsisLoaderComponent />
                        )}

                        {updateStatus.status ===
                          constants.PROFILE_UPDATE_SUCCESS && (
                          <span className="profile-sucessMessage2">
                            Profile Updated Sucessfully.
                          </span>
                        )}

                        {updateStatus.status ===
                          constants.PROFILE_UPDATE_ERROR && (
                          <span className="profile-centralize">
                            Profile Updated Sucessfully.
                          </span>
                        )}
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
          <div className="row profile-horizontalrule">
            <div className="col s12 m6 l4" />
            <div className="col s12 m6 l7">
              <hr />
            </div>
            <div className="col s12 m6 l1" />
          </div>
        </div>

        <div>
          <div className="row profile-move-top2">
            <div className="col l4" />
            <div className="col s12 m12 l8">
              <span className="profile-headlines" id="profile-topic">
                TOP FIVE ARTICLES
              </span>
              <div id="profile-topArticles">
                {profileData
                  ? profileData.articles.top.map(articles => {
                      return (
                        <p key={articles}>
                          <a href="#!">{articles.title}</a>
                        </p>
                      );
                    })
                  : topArticles}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
