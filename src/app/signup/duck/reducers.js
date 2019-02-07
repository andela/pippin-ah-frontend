import types from './types'
import constants from './constants'

const INITIAL_STATE = {
    signupState: constants.SIGNUP_ERROR,
    errorMessage: '',
}
const signupReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_SIGNUP_STATE: {
            const { signupState, errorMessage } = action
            return {
                ...state,
                signupState,
                errorMessage,
            }
        }
        default:
            return state
    }
}

export default signupReducer
