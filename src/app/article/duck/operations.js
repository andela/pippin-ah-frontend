import axios from 'axios';
import actions from './actions';
import constants from './constants';

const baseUrl = process.env.API_URL;
const { setCreateStatus, setSingleFetchStatus } = actions;
const doCreateArticle = articleDetails => dispatch => {
  dispatch(setCreateStatus({ status: constants.CREATING }));
  const headers = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  return axios
    .post(`${baseUrl}articles`, articleDetails, headers)
    .then(({ data }) => {
      dispatch(
        setCreateStatus({
          status: constants.CREATE_SUCCESS,
          data: data.slug,
        }),
      );
    })
    .catch(({ response }) => {
      dispatch(
        setCreateStatus({
          status: constants.CREATE_ERROR,
          data: response.data.error,
        }),
      );
    });
};

const doFetchArticle = () => dispatch => {
  const headers = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  return axios
    .get(`${baseUrl}articles`, headers)
    .then(({ data }) => {
      dispatch(
        setSingleFetchStatus({
          status: constants.FETCHING_SINGLE,
          data,
        }),
      );
    })
    .catch(({ response }) => {
      dispatch(
        setCreateStatus({
          status: constants.CREATE_ERROR,
          data: response.data.error,
        }),
      );
    });
};

export { doCreateArticle, doFetchArticle };
