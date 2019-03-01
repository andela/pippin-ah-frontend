/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Modal, Button } from 'react-materialize';
import jwtDecode from 'jwt-decode';
import './profile.scss';
import profilepicture from '../../img/avatar.jpeg';
import { ProfileEdit } from './ProfileEdit';

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
    const {
      uploadStatus,
      updateStatus,
      data,
      loginData,
      profileData,
    } = this.props;
    const { imageSelected } = this.state;
    const { newProfileUrl } = uploadStatus;
    const token = localStorage.getItem('token');
    const mentor = jwtDecode(token).isMentor;
    const returnedData = data || loginData;
    const profileUrl = returnedData.imageUrl
      ? returnedData.imageUrl
      : profilepicture;

    return (
      <div>
        <div className="container">
          <h2 className="center-align profile-headlinesProfile"> PROFILE </h2>
        </div>
        <div className="row profile-from-top">
          <div className="col s12 m1 l1" />
          <div className="col s12 m6 l3">
            <div className="card small">
              <div className="card-image profile.card .card-image">
                <img
                  id="profile-image-size"
                  src={
                    !newProfileUrl || newProfileUrl === 'null'
                      ? profileUrl
                      : newProfileUrl
                  }
                  alt="profilepicture"
                  className="activator "
                />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  {!profileData || profileData === 'null'
                    ? returnedData.firstName || ''
                    : profileData.data.firstName}
                  &nbsp;
                  {!profileData || profileData === 'null'
                    ? returnedData.lastName || ''
                    : profileData.data.lastName}
                  <i className="material-icons right">more_vert</i>
                </span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  You Are Viewing
                  <i className="material-icons right">close</i>
                </span>
                <p>
                  {!profileData || profileData === 'null'
                    ? returnedData.firstName || ''
                    : profileData.data.firstName}
                  &nbsp;
                  {!profileData || profileData === 'null'
                    ? returnedData.lastName || ''
                    : profileData.data.lastName}
                </p>
              </div>
            </div>
          </div>
          <div className="col s12 m5 l2 profile-move-top" id="profile-details">
            <div className="card small z-depth-0">
              <div className="card-content">
                Articles : &nbsp;&nbsp; &nbsp;{' '}
                {!returnedData.articles.total ||
                returnedData.articles.total === 'null'
                  ? 0
                  : returnedData.articles.total}
                <br />
                <br /> <br />
                Following : &nbsp;{' '}
                {!returnedData.following || returnedData.following === 'null'
                  ? 0
                  : returnedData.following}{' '}
                <br />
                <br /> <br />
                Followers : &nbsp;{' '}
                {!returnedData.followers || returnedData.followers === 'null'
                  ? 0
                  : returnedData.followers}{' '}
                <br />
                <br /> <br />
                Mentor :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {mentor === false ? (
                  'False'
                ) : (
                  <i className="material-icons prefix">check</i>
                )}
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
                  {!profileData || profileData === 'null'
                    ? returnedData.bio || 'Biography'
                    : profileData.data.bio}
                </span>
              </div>
              <Modal
                trigger={
                  <Button className="profile-btncolor">UPDATE PROFILE</Button>
                }
              >
                <ProfileEdit
                  imageSelected={imageSelected}
                  profilepicture={profilepicture}
                  uploadPicture={this.uploadPicture}
                  uploadStatus={uploadStatus}
                  displayImage={this.displayImage}
                  handleSubmit={this.handleSubmit}
                  profileData={profileData}
                  returnedData={returnedData}
                  updateStatus={updateStatus}
                />
              </Modal>
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
                {returnedData.articles.top
                  ? returnedData.articles.top.map(articles => {
                      return (
                        <p key={articles}>
                          <a href="#!">{articles.title}</a>
                        </p>
                      );
                    })
                  : 'You Have No Articles Yet'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
