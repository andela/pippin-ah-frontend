/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import '../../style/profile.scss';
import profilepicture from '../../img/students.jpeg';

class ProfileComponent extends React.Component {
  componentDidMount() {
    const { viewProfile } = this.props;

    viewProfile();
  }

  handleSubmit = event => {
    const { updateUserProfile } = this.props;
    event.preventDefault();
    const firstName = event.target.elements.firstName.value.trim();
    const lastName = event.target.elements.lastName.value.trim();
    const interest = event.target.elements.interest.value.trim();
    const bio = event.target.elements.bio.value.trim();

    updateUserProfile(firstName, lastName, interest, bio);
  };

  render() {
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
                <img
                  src={profilepicture}
                  alt="profilepicture"
                  className="activator"
                />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  {this.props.viewData ? (
                    this.props.viewData.firstName
                  ) : (
                    <h6>loading...</h6>
                  )}
                  <i className="material-icons right">more_vert</i>
                </span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  You Are Viewing<i className="material-icons right">close</i>
                </span>
                <p>SARAH GOBLIN PROFILE</p>
              </div>
            </div>
          </div>
          <div className="col s12 m5 l2 move-top" id="details">
            <div className="card small z-depth-0">
              <div className="card-content">
                Interest : &nbsp; Mathematics <br />
                <br /> <br />
                Articles : &nbsp;&nbsp; &nbsp;{' '}
                {this.props.viewData ? (
                  this.props.viewData.articles.total
                ) : (
                  <h6>loading...</h6>
                )}{' '}
                <br />
                <br /> <br />
                Following : &nbsp;{' '}
                {this.props.viewData ? (
                  this.props.viewData.following
                ) : (
                  <h6>loading...</h6>
                )}{' '}
                <br />
                <br /> <br />
                Followers : &nbsp;{' '}
                {this.props.viewData ? (
                  this.props.viewData.followers
                ) : (
                  <h6>loading...</h6>
                )}{' '}
                <br />
                <br /> <br />
                {false && 'Mentor'}
                Mentor &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                {this.props.viewData ? (
                  this.props.viewData.isMentor
                ) : (
                  <h6>loading...</h6>
                )}
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
                  {this.props.viewData ? (
                    this.props.viewData.bio
                  ) : (
                    <h6>loading product please wait...</h6>
                  )}
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
                    <form
                      onSubmit={this.handleSubmit}
                      className="col s12 m6 l6"
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
                          />
                          <label htmlFor="icon_telephone">Last Name</label>
                        </div>
                        <div className="input-field col s12">
                          <i className="material-icons prefix color-ions">
                            favorite
                          </i>
                          <input
                            id="icon_telephone"
                            type="text"
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
                {this.props.viewData ? (
                  this.props.viewData.articles.top.map(articles => {
                    return (
                      <p>
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
