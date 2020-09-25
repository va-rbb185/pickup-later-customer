/* Libraries */
import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';

/* Conponents */
import App from './components/App';

/* Static files */
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './static/css/app.css';

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
