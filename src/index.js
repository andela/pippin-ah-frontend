import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import App from './app/App'

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer autoClose={4000} pauseOnFocusLoss={false} />
  </Provider>,
  document.getElementById('app'),
)
