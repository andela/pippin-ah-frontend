import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './home';
import { Signup } from './signup';
import { Login } from './login';
import Article from './article';
import Footer from './footer';
import Navbar from './navBar/NavbarComponent';
import ProfileContainer from './profile';
import { Subject } from './subject';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/profile" component={ProfileContainer} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/subject" component={Subject} exact />
        <Route path="/articles" component={Article} exact />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default App;
