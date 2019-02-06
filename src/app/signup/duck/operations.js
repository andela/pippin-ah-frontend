import axios from 'axios'
import setSignupState from './actions'
import constants from './constants'

const signupUrl = 'http://learnground-api-staging.herokuapp.com/api/v1/users'

const doSignUp = (email, username, password) => dispatch => {
    dispatch(setSignupState(constants.SIGNING_UP))
    return axios
        .post(signupUrl, {
            username,
            email,
            password,
        })
        .then(({ data }) => {
            console.log(data.message)
        })
        .catch(error => {
            console.log(error.response.data)
        })
}

export default { doSignUp }
