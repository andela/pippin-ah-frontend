import axios from 'axios';
import { toast } from 'react-toastify';
import actions from './actions';
import constants from './constants';

const { setFetchArticleState, setFetchArticleError } = actions;
// eslint-disable-next-line max-len
const url =
  'https://learnground-api-staging.herokuapp.com/api/v1/users/resetpassword';

const doFetch = email => dispatch => {
  dispatch(setFetchArticleState(constants.FETCHING_ARTICLE));
  dispatch(setFetchArticleError(''));
  return (
    axios
      .post(url, { email })
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        dispatch(setFetchArticleState(constants.FETCH_ARTICLE_SUCCESS));
      })
      .catch(({ response }) => {
        dispatch(setFetchArticleState(constants.FETCH_ARTICLE_ERROR));
        dispatch(setFetchArticleError(response.data.error));
        toast.error(response.data.error, {
          hideProgressBar: true,
        });
      })
  );
};

export default doFetch;
