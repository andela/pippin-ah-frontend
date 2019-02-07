import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './home'
import { Signup } from './signup'

const App = () => (
    <Router>
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/signup" component={Signup} exact />
        </Switch>
    </Router>
)

export default App
