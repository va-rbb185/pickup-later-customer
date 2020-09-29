import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import CategoryListingPage from './CategoryListingPage';
import ProductListingPage from './ProductListingPage';

const App = () => {
    return (
        <BrowserRouter>
            <div className="page">
                <Route exact path="/" component={Home} />
                <Route path="/search" component={Search} />
                <Route path="/all-categories" component={CategoryListingPage} />
                <Route path="/product-list" component={ProductListingPage} />
            </div>
        </BrowserRouter>
    );
};

export default App;
