import axios from 'axios';
import { toast } from 'react-toastify';
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
      toast.error(response.data.error, {
        hideProgressBar: true,
      });
    });
};
