import React from 'react';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import ReactDOM from 'react-dom';
import '../node_modules/materialize-css/dist/js/materialize.min';
import './style/index.scss';
import App from './app/App';

ReactDOM.render(<App />, document.getElementById('app'));
