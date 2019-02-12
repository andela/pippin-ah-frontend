import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './home';
import { Signup } from './signup';
import { Login } from './login';
import Footer from './footer';
import Navbar from './navBar/NavbarComponent';
import { Subject } from './subject';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/subject" component={Subject} exact />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default App;
