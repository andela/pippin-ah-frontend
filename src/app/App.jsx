import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './home';
import { Signup } from './signup';
import { Login } from './login';
import Footer from './footer';

const App = () => (
  <Router>
    <Fragment>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/login" component={Login} exact />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default App;
