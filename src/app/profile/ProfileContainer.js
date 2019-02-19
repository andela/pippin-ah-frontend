import { connect } from 'react-redux';
import ProfileComponent from './ProfileComponent';
import { viewProfile, updateUserProfile, pictureUtils } from './duck';

export const mapStateToProps = ({
  profile: { viewData, profileData, uploadStatus },
}) => {
  return {
    viewData,
    profileData,
    uploadStatus,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    pictureUtils: imageUrl => dispatch(pictureUtils(imageUrl)),
    viewProfile: () => dispatch(viewProfile()),
    updateUserProfile: (firstName, lastName, interest, bio) =>
      dispatch(updateUserProfile(firstName, lastName, interest, bio)),
  };
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileComponent);

export default ProfileContainer;
