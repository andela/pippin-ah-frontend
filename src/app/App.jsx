import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './home'
import { Signup } from './signup'
import Modal from './signup/Modal'

const App = () => (
  <Router>
    <Fragment>
      <Modal />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signup" component={Signup} exact />
      </Switch>
    </Fragment>
  </Router>
)

export default App
