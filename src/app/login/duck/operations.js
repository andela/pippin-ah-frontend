import axios from 'axios';
import { toast } from 'react-toastify';
import setLoginState from './actions';
import constants from './constants';

const url = 'http://learnground-api-staging.herokuapp.com/api/v1/users/login';

const doLogin = (usernameOrEmail, password) => dispatch => {
  dispatch(setLoginState(constants.LOGGING_IN));
  return axios
    .post(url, { usernameOrEmail, password })
    .then(({ data }) => {
      dispatch(setLoginState(constants.LOGIN_SUCCESS));
    })
    .catch(error => {
      dispatch(setLoginState(constants.SIGNUP_ERROR));
      toast.error(error.response.data.error, {
        hideProgressBar: true,
      });
    });
};

export default doLogin;
