import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './home';
import { Login } from './login';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
    </Switch>
  </Router>
);

export default App;
