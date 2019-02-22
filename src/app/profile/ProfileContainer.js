import { connect } from 'react-redux';
import ProfileComponent from './ProfileComponent';
import { updateUserProfile, pictureUtils } from './duck';

export const mapStateToProps = ({
  profile: { profileData, uploadStatus, updateStatus },
  signup: { data },
  login: { loginData },
}) => {
  return {
    profileData,
    uploadStatus,
    updateStatus,
    data,
    loginData,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    pictureUtils: imageUrl => dispatch(pictureUtils(imageUrl)),
    updateUserProfile: (firstName, lastName, interest, bio) =>
      dispatch(updateUserProfile(firstName, lastName, interest, bio)),
  };
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileComponent);

export default ProfileContainer;
