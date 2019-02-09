import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './home';
import { Signup } from './signup';
import Footer from './footer';
import Navbar from './navBar/NavbarContainer';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signup" component={Signup} exact />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default App;
