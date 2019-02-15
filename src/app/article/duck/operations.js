import axios from 'axios';

const url = 'https://learnground-api-staging.herokuapp.com/api/v1/articles';

const doCreateArticle = articleDetails => dispatch => {
  return axios
    .post(url, articleDetails)
    .then(({ data }) => {
      console.log(data);
    })
    .catch(({ response }) => {
      console.log(response.data.error);
    });
};

export default { doCreateArticle };
