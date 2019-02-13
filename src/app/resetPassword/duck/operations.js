import axios from 'axios';
import { toast } from 'react-toastify';
import actions from './actions';
import constants from './constants';

const { setResetState, setResetError } = actions;
// eslint-disable-next-line max-len
const url =
  'https://learnground-api-staging.herokuapp.com/api/v1/users/resetpassword';

const doReset = email => dispatch => {
  dispatch(setResetState(constants.RESETTING));
  dispatch(setResetError(''));
  return (
    axios
      .post(url, { email })
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        dispatch(setResetState(constants.RESET_SUCCESS));
        console.log('@@@@@@', data);
      })
      .catch(({ response }) => {
        dispatch(setResetState(constants.RESET_ERROR));
        dispatch(setResetError(response.data.error));
        toast.error(response.data.error, {
          hideProgressBar: true,
        });
      })
  );
};

export default doReset;
