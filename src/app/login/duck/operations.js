import axios from 'axios';
import { toast } from 'react-toastify';
import actions from './actions';
import constants from './constants';

const { setLoginState, setLoginError } = actions;
const url = 'https://learnground-api-staging.herokuapp.com/api/v1/users/login';

const doLogin = (usernameOrEmail, password) => dispatch => {
  dispatch(setLoginState(constants.LOGGING_IN));
  dispatch(setLoginError(''));
  return axios
    .post(url, { usernameOrEmail, password })
    .then(({ data }) => {
      localStorage.setItem('token', data.token);

      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('lastName', data.lastName);
      localStorage.setItem('bio', data.bio);
      localStorage.setItem('interests', data.interests);
      localStorage.setItem('followers', data.followers);
      localStorage.setItem('following', data.following);
      localStorage.setItem('imageUrl', data.imageUrl);
      localStorage.setItem('topArticles', data.articles.top);
      localStorage.setItem('totalArticles', data.articles.total);

      dispatch(setLoginState(constants.LOGIN_SUCCESS, data));
    })
    .catch(({ response }) => {
      dispatch(setLoginState(constants.LOGIN_ERROR));
      dispatch(setLoginError(response.data.error));
      toast.error(response.data.error, {
        hideProgressBar: true,
      });
    });
};

export default doLogin;
