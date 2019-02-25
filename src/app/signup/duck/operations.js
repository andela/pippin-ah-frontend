import axios from 'axios';
import { toast } from 'react-toastify';
import actions from './actions';
import { actions as loginActions } from '../../login/duck';
import constants from './constants';

const { setSignupState, setSignupError } = actions;
const { setLoginState } = loginActions;
const baseUrl = process.env.API_URL;
const doSignUp = (email, username, password) => dispatch => {
  dispatch(setSignupState(constants.SIGNING_UP));
  dispatch(setSignupError(''));
  return axios
    .post(`${baseUrl}users`, {
      username,
      email,
      password,
    })
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      dispatch(setSignupState(constants.SIGNUP_SUCCESS));
      dispatch(setLoginState(constants.LOGIN_SUCCESS));
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
