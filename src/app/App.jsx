import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './home';
import { Signup } from './signup';
import Footer from './footer/Footer';

const App = () => (
  <Router>
    <Fragment>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signup" component={Signup} exact />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default App;
