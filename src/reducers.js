import { combineReducers } from 'redux';
import { signupReducer } from './app/signup';
import { loginReducer } from './app/login';

const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
});

export default rootReducer;
