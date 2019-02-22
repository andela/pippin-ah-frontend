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
      localStorage.setItem('profileData', data);
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
