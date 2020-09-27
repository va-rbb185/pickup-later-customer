import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import CategoryListingPage from './CategoryListingPage';

const App = () => {
    return (
        <BrowserRouter>
            <div className="page">
                <Route exact path="/" component={Home} />
                <Route path="/all-categories" component={CategoryListingPage} />
            </div>
        </BrowserRouter>
    );
};

export default App;
