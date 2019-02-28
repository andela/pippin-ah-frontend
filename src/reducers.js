import { combineReducers } from 'redux';
import { signupReducer } from './app/signup';
import { loginReducer } from './app/login';
import { resetPasswordReducer } from './app/resetPassword';
import { newPasswordReducer } from './app/newPassword';
import {
  createArticleReducer,
  fetchArticleReducer,
  bookmarkArticleReducer,
} from './app/article';

const rootReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  resetPassword: resetPasswordReducer,
  updatePassword: newPasswordReducer,
  createArticle: createArticleReducer,
  fetchArticle: fetchArticleReducer,
  bookmarkArticle: bookmarkArticleReducer,
});

export default rootReducer;
