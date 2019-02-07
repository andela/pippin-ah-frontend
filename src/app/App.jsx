import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './home'

const App = () => (
    <Router>
        <Switch>
            <Route path="/" component={Home} />
        </Switch>
    </Router>
)

export default App