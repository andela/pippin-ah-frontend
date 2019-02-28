import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { socialMediaLogin } from './duck/operations';
import constants from './duck/constants';
import { RingLoaderComponent } from '../loaders';
/* eslint-disable react/prefer-stateless-function */
class SocialAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.authLogin(window.location.search);
  }

  render() {
    const { loginState } = this.props;

    return (
      <>
        <div className="centerDiv">
          {loginState !== constants.LOGIN_SUCCESS && (
            <div>
              <RingLoaderComponent />
              <p>Logging in...</p>
            </div>
          )}
        </div>
        <div>
          {loginState === constants.LOGIN_SUCCESS && <Redirect to="/" />}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authLogin: params => {
      dispatch(socialMediaLogin(params));
    },
  };
};

const mapStateToProps = ({ login: { loginState, errorMessage } }) => {
  return { loginState, errorMessage };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocialAuth);
