import axios from 'axios';
import actions from './actions';
import constants from './constants';

const url = 'https://learnground-api-staging.herokuapp.com/api/v1/articles';
const { setCreateStatus } = actions;
const doCreateArticle = articleDetails => dispatch => {
  dispatch(setCreateStatus({ status: constants.CREATING }));
  const headers = {
    headers: { Authorization: localStorage.getItem('token') },
  };
  return axios
    .post(url, articleDetails, headers)
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

export default doCreateArticle;
