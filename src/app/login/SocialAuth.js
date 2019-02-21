import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { socialMediaLogin } from './duck/operations';
import constants from './duck/constants';

/* eslint-disable react/prefer-stateless-function */
class SocialAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    console.log(window.location);
    dispatch(socialMediaLogin(window.location.search));
  }

  render() {
    const { loginState } = this.props;

    console.log('This is the login state :', loginState);
    return (
      <div>{loginState === constants.LOGIN_SUCCESS && <Redirect to="/" />}</div>
    );
  }
}

const mapStateToProps = ({ login: { loginState, errorMessage } }) => {
  return { loginState, errorMessage };
};

export default connect(mapStateToProps)(SocialAuth);
