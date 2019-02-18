import { combineReducers } from 'redux';
import { signupReducer } from './app/signup';
import { loginReducer } from './app/login';
import { profileReducer } from './app/profile';
import { resetPasswordReducer } from './app/resetPassword';
import { newPasswordReducer } from './app/newPassword';

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  profile: profileReducer,
  resetPassword: resetPasswordReducer,
  updatePassword: newPasswordReducer,
});

export default rootReducer;
