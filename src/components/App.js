import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';

const App = () => {
    return (
        <BrowserRouter>
            <div className="page">
                <Route exact path="/" component={Home} />
            </div>
        </BrowserRouter>
    );
};

export default App;
