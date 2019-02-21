import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './home';
import { Signup } from './signup';
import { Login } from './login';
import { Article, CreateArticle } from './article';
import Footer from './footer';
import Navbar from './navBar/NavbarComponent';
import { Subject } from './subject';
import ProfileComponent from './profile';
import { ResetPassword } from './resetPassword';
import { NewPassword } from './newPassword';
import SocialAuth from './login/SocialAuth';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/profile" component={ProfileComponent} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/subject" component={Subject} exact />
        <Route path="/articles" component={Article} exact />
        <Route path="/resetpassword" component={ResetPassword} exact />
        <Route path="/newpassword" component={NewPassword} exact />
        <Route path="/create-article" component={CreateArticle} exact />
        <Route path="/auth" component={SocialAuth} exact />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default App;
