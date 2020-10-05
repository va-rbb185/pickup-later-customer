/* Libraries */
import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';

/* Components */
import App from './components/App';

/* App styles */
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './static/css/app.css';

ReactDOM.render(<App />, document.getElementById('app'));
