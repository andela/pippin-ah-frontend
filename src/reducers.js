import { combineReducers } from 'redux';
import { signupReducer } from './app/signup';

const rootReducer = combineReducers({
  signup: signupReducer,
});

export default rootReducer;
