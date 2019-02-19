/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Redirect } from 'react-router-dom';
import '../../style/profile.scss';
import profilepicture from '../../img/avatar.jpeg';
import constants from './duck/constants';
import { EllipsisLoaderComponent } from '../loaders';

class ProfileComponent extends React.Component {
  state = {
    imageSelected: '',
    imageUrl: '',
  };

  componentDidMount() {
    const { viewProfile } = this.props;
    viewProfile();
  }

  handleSubmit = event => {
    const { updateUserProfile, viewData } = this.props;
    event.preventDefault();
    const firstName =
      event.target.elements.firstName.value.trim() || viewData.firstName;
    const lastName =
      event.target.elements.lastName.value.trim() || viewData.lastName;
    const interest =
      event.target.elements.interest.value.trim() || viewData.interest;
    const bio = event.target.elements.bio.value.trim() || viewData.bio;

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
    const { viewData, uploadStatus } = this.props;
    const { imageSelected } = this.state;

    return (
      <div>
        <div className="container">
          <h2 className="center-align headlinesProfile"> PROFILE </h2>
        </div>
        <div className="row from-top">
          <div className="col s12 m1 l1" />
          <div className="col s12 m6 l3">
            <div className="card small">
              <div className="card-image">
                {viewData ? (
                  <img
                    src={viewData.imageUrl}
                    alt="profilepicture"
                    className="activator"
                  />
                ) : (
                  <h6>loading...</h6>
                )}{' '}
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  {viewData ? viewData.firstName : <h6>loading...</h6>}{' '}
                  {viewData ? viewData.lastName : <h6>loading...</h6>}
                  <i className="material-icons right">more_vert</i>
                </span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  You Are Viewing<i className="material-icons right">close</i>
                </span>
                <p>
                  {viewData ? viewData.firstName : <h6>loading...</h6>}{' '}
                  {viewData ? viewData.lastName : <h6>loading...</h6>}
                </p>
              </div>
            </div>
          </div>
          <div className="col s12 m5 l2 move-top" id="details">
            <div className="card small z-depth-0">
              <div className="card-content">
                Articles : &nbsp;&nbsp; &nbsp;{' '}
                {viewData ? viewData.articles.total : <h6>loading...</h6>}{' '}
                <br />
                <br /> <br />
                Following : &nbsp;{' '}
                {viewData ? viewData.following : <h6>loading...</h6>} <br />
                <br /> <br />
                Followers : &nbsp;{' '}
                {viewData ? viewData.followers : <h6>loading...</h6>} <br />
                <br /> <br />
                Mentor &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                {viewData ? viewData.isMentor : <h6>loading...</h6>}
                {/* <i className="material-icons prefix">check_box</i> */}
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>

          <div className="col s12 m12 l5 move-top">
            <div className="card small z-depth-0">
              <div className="card-content">
                <span className="headlines">BIOGRAPHY</span>
                <br />
                <span id="bio">
                  {viewData ? viewData.bio : <h6>loading ...</h6>}
                </span>
              </div>
              <a
                className="btn modal-trigger btncolor"
                href="#modal1"
                id="shift"
              >
                Update Profile
              </a>

              <div id="modal1" className="modal modal-fixed-footer">
                <div className="modal-content" id="cardpad">
                  <div className="row">
                    <div className="col s12 m6 l6">
                      <div className="card small">
                        <div className="card-image removespace">
                          <img
                            src={imageSelected || profilepicture}
                            alt="profilepicture"
                          />
                        </div>
                        <div className="card-tabs">
                          <form onSubmit={this.uploadPicture}>
                            <div className="file-field input-field">
                              <div className="btn btncolor" id="centralize">
                                <span>Change Photo</span>
                                <input
                                  type="file"
                                  name="profilepix"
                                  id="img"
                                  onChange={this.displayImage}
                                />

                                <br />
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="btn btncolor"
                              id="centralize"
                            >
                              Upload
                            </button>

                            {uploadStatus === constants.PICTURE_UPDATING && (
                              <EllipsisLoaderComponent />
                            )}
                            {uploadStatus === constants.UPDATE_SUCCESS && (
                              <span className="sucessMessage">
                                Picture Uploaded Sucessfully.
                              </span>
                            )}
                            {uploadStatus === constants.UPDATE_ERROR && (
                              <span className="centralize">
                                An Error Occured
                              </span>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                    <form
                      onSubmit={this.handleSubmit}
                      className="col s12 m6 l6"
                      id="update_profile"
                    >
                      <div className="row">
                        <div className="input-field col s12">
                          <i className="material-icons prefix color-ions">
                            account_circle
                          </i>
                          <input
                            id="icon_prefix"
                            type="text"
                            className="validate"
                            name="firstName"
                          />
                          <label htmlFor="icon_prefix">First Name</label>
                        </div>
                        <div className="input-field col s12">
                          <i className="material-icons prefix color-ions">
                            account_circle
                          </i>
                          <input
                            id="icon_telephone"
                            type="text"
                            className="validate"
                            name="lastName"
                          />
                          <label htmlFor="icon_telephone">Last Name</label>
                        </div>
                        <div className="input-field col s12">
                          <select
                            name="interest"
                            defaultValue=""
                            className="browser-default"
                            required
                          >
                            <option value="" disabled>
                              Select Category
                            </option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Arts">Arts</option>
                            <option value="Science">Science</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Technology">Technology</option>
                          </select>
                        </div>
                        <div className="input-field col s12">
                          <i className="material-icons prefix color-ions">
                            mode_edit
                          </i>
                          <textarea
                            id="textarea1"
                            className="materialize-textarea"
                            name="bio"
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
          <div className="row horizontalrule">
            <div className="col s12 m6 l4" />
            <div className="col s12 m6 l7">
              <hr />
            </div>
            <div className="col s12 m6 l1" />
          </div>
        </div>

        <div>
          <div className="row move-top2">
            <div className="col l4" />
            <div className="col s12 m12 l8">
              <span className="headlines" id="topic">
                TOP FIVE ARTICLES
              </span>
              <div id="topArticles">
                {viewData ? (
                  viewData.articles.top.map(articles => {
                    return (
                      <p key={articles.slug}>
                        <a href="#!">{articles.title}</a>
                      </p>
                    );
                  })
                ) : (
                  <h3>loading top articles wait...</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
