import types from './types'

const setSignupState = signupState => ({
    type: types.SET_SIGNUP_STATE,
    signupState,
})

export default setSignupState
