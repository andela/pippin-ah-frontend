import { connect } from 'react-redux'
import { operations } from './duck'
import SignupComponent from './SignupComponent'

// const mapStateToProps = state => {
//   const { signupState } = state.signup;
//   r
// }
const mapStateToProps = state => {
    return {
        signupState: state.signup.signupState,
        errorMessage: state.signup.errorMessage,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        signupUser: (email, username, password) =>
            dispatch(operations.doSignUp(email, username, password)),
    }
}
const SignupContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignupComponent)

export default SignupContainer
