import axios from 'axios';
import { toast } from 'react-toastify';
import actions from './actions';
import constants from './constants';

const { setSignupState, setSignupError } = actions;
const signupUrl = 'https://learnground-api-staging.herokuapp.com/api/v1/users';
const doSignUp = (email, username, password) => dispatch => {
  dispatch(setSignupState(constants.SIGNING_UP));
  dispatch(setSignupError(''));
  return axios
    .post(signupUrl, {
      username,
      email,
      password,
    })
    .then(data => {
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
      dispatch(setSignupState(constants.SIGNUP_SUCCESS, data));
    })
    .catch(({ response }) => {
      dispatch(setSignupState(constants.SIGNUP_ERROR));
      dispatch(setSignupError(response.data.error));
      toast.error(response.data.error, {
        hideProgressBar: true,
      });
    });
};

export default doSignUp;
