import React from 'react';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import thunk from 'redux-thunk';
import '../node_modules/materialize-css/dist/js/materialize.min';
import App from './app/App';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer autoClose={4000} pauseOnFocusLoss={false} />
  </Provider>,
  document.getElementById('app'),
);
