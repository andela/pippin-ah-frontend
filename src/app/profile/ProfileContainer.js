import { connect } from 'react-redux';
import ProfileComponent from './ProfileComponent';
import { viewProfile, updateUserProfile } from './duck';

const mapStateToProps = ({ profile: { viewData, profileData } }) => {
  return { viewData, profileData };
};

const mapDispatchToProps = dispatch => {
  return {
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
