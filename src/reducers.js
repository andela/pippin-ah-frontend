import { combineReducers } from 'redux';
import { signupReducer } from './app/signup';
import { loginReducer } from './app/login';

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
});

export default rootReducer;
