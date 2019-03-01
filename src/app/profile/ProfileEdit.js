import React from 'react';
import { EllipsisLoaderComponent } from '../loaders';
import constants from './duck/constants';

export const ProfileEdit = ({
  imageSelected,
  profilepicture,
  uploadPicture,
  uploadStatus,
  displayImage,
  handleSubmit,
  profileData,
  returnedData,
  updateStatus,
}) => {
  return (
    <div>
      <div id="cardpad">
        <div className="row">
          <div className="col s12 m6 l4">
            <div className="card small">
              <div className="card-image profile-removespace">
                <img
                  id="profile-image-card2"
                  src={imageSelected || profilepicture}
                  alt="profilepicture"
                />
              </div>
              <div className="card-tabs">
                <form onSubmit={uploadPicture}>
                  <div className="file-field input-field">
                    {uploadStatus.status === constants.PICTURE_UPDATING && (
                      <div className="profile-Eclipsloader">
                        <EllipsisLoaderComponent />
                      </div>
                    )}

                    {(uploadStatus.status === undefined ||
                      uploadStatus.status === constants.UPDATE_SUCCESS) && (
                      <div className="profile-button-container">
                        <div
                          className="btn profile-btncolor"
                          id="profile-buttondiv"
                        >
                          <input
                            type="file"
                            name="profilepix"
                            id="img"
                            onChange={displayImage}
                          />
                          change img
                        </div>
                        <div id="profile-submitDiv">
                          <button
                            type="submit"
                            className="btn profile-btncolor"
                            id=""
                            onClick={uploadPicture}
                          >
                            Upload photo
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {uploadStatus.status === constants.UPDATE_SUCCESS && (
                    <span className="profile-sucessMessage2" id="hideMe">
                      Picture Uploaded Sucessfully.
                    </span>
                  )}
                  {uploadStatus.status === constants.UPDATE_ERROR && (
                    <span className="profile-centralize">An Error Occured</span>
                  )}
                </form>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
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
                  defaultValue={
                    !profileData || profileData === 'null'
                      ? returnedData.firstName || ''
                      : profileData.data.firstName
                  }
                  placeholder="first Name"
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
                  defaultValue={
                    !profileData || profileData === 'null'
                      ? returnedData.lastName || ''
                      : profileData.data.lastName
                  }
                  placeholder="last Name"
                />
              </div>
              <div className="input-field select-field">
                <i className="material-icons prefix profile-color-ions">
                  favorite
                </i>
                <select name="interests" className="select-dropdown">
                  <option selected="selected">
                    {!profileData || profileData === 'null'
                      ? 'Choose Interests'
                      : profileData.data.interests[
                          profileData.data.interests.length - 1
                        ]}
                  </option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Technology">Technology</option>
                  <option value="Science">Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Arts">Arts</option>
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
                  defaultValue={
                    !profileData || profileData === 'null'
                      ? returnedData.bio || ''
                      : profileData.data.bio
                  }
                  placeholder="Biography"
                />
              </div>
              <div className="profile-Eclipsloader2">
                {updateStatus === constants.PROFILE_UPDATING && (
                  <EllipsisLoaderComponent />
                )}
              </div>
              {(updateStatus === '' ||
                updateStatus.status === constants.PROFILE_UPDATE_SUCCESS) && (
                <div id="learnground">
                  <button
                    className="btn profile-btncolor"
                    type="submit"
                    name="action"
                    id="profile-shiftupdate"
                  >
                    Update
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              )}
              {updateStatus.status === constants.PROFILE_UPDATE_SUCCESS && (
                <span className="profile-sucessMessage3" id="hideMe">
                  Profile Updated Sucessfully.
                </span>
              )}
              {updateStatus.status === constants.PROFILE_UPDATE_ERROR && (
                <span className="profile-centralize">
                  An error Ocuured while updating....
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
