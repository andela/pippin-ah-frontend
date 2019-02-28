import axios from 'axios';
import actions from './actions';
import constants from './constants';

const { setLoginState, setLoginError } = actions;
const baseUrl = 'http://localhost:3000/api/v1';
// const baseUrl = 'http://learnground-api-staging.herokuapp.com/api/v1';
const url = `${baseUrl}/users/login`;

export const googleUrl = `${baseUrl}/users/google`;
export const twitterUrl = `${baseUrl}/users/twitter`;
export const facebookUrl = `${baseUrl}/users/facebook`;

export const doLogin = (usernameOrEmail, password) => dispatch => {
  dispatch(setLoginState(constants.LOGGING_IN));
  dispatch(setLoginError(''));
  return axios
    .post(url, { usernameOrEmail, password })
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      dispatch(setLoginState(constants.LOGIN_SUCCESS));
    })
    .catch(({ response }) => {
      dispatch(setLoginState(constants.LOGIN_ERROR));
      dispatch(setLoginError(response.data.error));
    });
};

export const updateLoginState = state => dispatch => {
  if (state === 'success') {
    dispatch(setLoginState(constants.LOGIN_SUCCESS));
  }
};

export const socialMediaLogin = params => dispatch => {
  const paramToUse = params.split('&');
  let socialMediaType;
  if (paramToUse[0] === '?facebook') {
    socialMediaType = 'facebook';
  } else if (paramToUse[0] === '?google') {
    socialMediaType = 'google';
  }

  const redirectUrl = `http://localhost:3000/api/v1/users/${socialMediaType}/redirect?${
    paramToUse[1]
  }`;
  return axios
    .get(redirectUrl)
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      dispatch(setLoginState(constants.LOGIN_SUCCESS));
    })
    .catch(error => {
      console.log('An error occured: ', error);
      dispatch(setLoginState(constants.LOGIN_ERROR));
      dispatch(setLoginError(error));
    });
};
