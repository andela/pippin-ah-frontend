import { combineReducers } from 'redux';
import { signupReducer } from './app/signup';
import { loginReducer } from './app/login';
import { profileReducer } from './app/profile';

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  profile: profileReducer,
});

export default rootReducer;
