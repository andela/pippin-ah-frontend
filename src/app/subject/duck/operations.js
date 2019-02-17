import axios from 'axios';
import { toast } from 'react-toastify';
import actions from './actions';
import constants from './constants';

const { setFetchArticleState, setFetchArticleError } = actions;
const category = window.location.pathname.split('/')[2];
const url = 'https://learnground-api-staging.herokuapp.com/api/v1/articles';

const doFetch = () => dispatch => {
  dispatch(setFetchArticleState(constants.FETCHING_ARTICLE));
  dispatch(setFetchArticleError(''));
  return (
    axios
      .get(url, {
        params: { category },
      })
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
