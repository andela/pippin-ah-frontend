import axios from 'axios';
import { toast } from 'react-toastify';
import actions from './actions';
import constants from './constants';

const { setUpdatePasswordState, setUpdatePasswordError } = actions;
const resetToken = window.location.search.substring(1);
console.log('*****', resetToken);
// eslint-disable-next-line max-len
const url = `https://learnground-api-staging.herokuapp.com/api/v1/users/resetpassword/${resetToken}`;

const doPasswordUpdate = password => dispatch => {
  dispatch(setUpdatePasswordState(constants.UPDATING_PASSWORD));
  dispatch(setUpdatePasswordError(''));
  return (
    axios
      .post(url, { password })
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        dispatch(setUpdatePasswordState(constants.UPDATE_PASSWORD_SUCCESS));
      })
      .catch(({ response }) => {
        dispatch(setUpdatePasswordState(constants.UPDATE_PASSWORD_ERROR));
        dispatch(setUpdatePasswordError(response.data.error));
        toast.error(response.data.error, {
          hideProgressBar: true,
        });
      })
  );
};

export default doPasswordUpdate;
