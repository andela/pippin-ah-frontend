import axios from 'axios';
import { toast } from 'react-toastify';
import actions from './actions';

const { viewUserProfile } = actions;
const url =
  'https://learnground-api-staging.herokuapp.com/api/v1/user/audu9habib';

const viewProfile = () => dispatch => {
  const token = localStorage.getItem('token');
  const defaultOptions = {
    headers: {
      Authorization: token,
    },
  };
  return axios
    .get(url, defaultOptions)
    .then(({ data }) => {
      dispatch(viewUserProfile(data));
    })
    .catch(({ response }) => {
      toast.error(response.data.error, {
        hideProgressBar: true,
      });
    });
};

export default viewProfile;
