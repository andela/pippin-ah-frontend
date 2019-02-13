import { connect } from 'react-redux';
import ProfileComponent from './ProfileComponent';
import { viewProfile } from './duck';

const mapStateToProps = ({ profile: { viewData, profileData } }) => {
  return { viewData, profileData };
};

const mapDispatchToProps = dispatch => {
  return {
    viewProfile: () => dispatch(viewProfile()),
  };
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileComponent);

export default ProfileContainer;
