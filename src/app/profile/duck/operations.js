import axios from 'axios';
import { toast } from 'react-toastify';
import actions from './actions';

const { viewUserProfile, setUserProfile } = actions;
const url =
  'https://learnground-api-staging.herokuapp.com/api/v1/user/audu9habib';

export const viewProfile = () => dispatch => {
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

const url2 = 'https://learnground-api-staging.herokuapp.com/api/v1/profile';

export const updateUserProfile = (
  firstName,
  lastName,
  interest,
  bio,
) => dispatch => {
  const token = localStorage.getItem('token');
  const defaultOptions = {
    headers: {
      Authorization: token,
    },
  };
  return axios
    .patch(
      url2,
      {
        firstName,
        lastName,
        interest,
        bio,
      },
      defaultOptions,
    )
    .then(({ data }) => {
      dispatch(setUserProfile(data));
    })
    .catch(({ response }) => {
      toast.error(response.data.error, {
        hideProgressBar: true,
      });
    });
};

export default { viewProfile, updateUserProfile };
