import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import CategoryListingPage from './CategoryListingPage';
import Search from './Search';

const App = () => {
    return (
        <BrowserRouter>
            <div className="page">
                <Route exact path="/" component={Home} />
                <Route path="/search" component={Search} />
                <Route path="/all-categories" component={CategoryListingPage} />
            </div>
        </BrowserRouter>
    );
};

export default App;
