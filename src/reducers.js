import { combineReducers } from 'redux';
import { signupReducer } from './app/signup';
import { loginReducer } from './app/login';
import { profileReducer } from './app/profile';
import { resetPasswordReducer } from './app/resetPassword';
import { newPasswordReducer } from './app/newPassword';
import {
  createArticleReducer,
  fetchArticleReducer,
  bookmarkArticleReducer,
} from './app/article';

const appReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  profile: profileReducer,
  resetPassword: resetPasswordReducer,
  updatePassword: newPasswordReducer,
  createArticle: createArticleReducer,
  fetchArticle: fetchArticleReducer,
  bookmarkArticle: bookmarkArticleReducer,
});

const rootReducer = (state, action) => {
  if (
    action.loginState === 'LOGGED_OUT' ||
    action.signupState === 'LOGGED_OUT'
  ) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
