import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import CategoryListingPage from './CategoryListingPage';
import ProductListingPage from './ProductListingPage';
import ProductDetailPage from './ProductDetailPage';
import CardButton from './CartButton';
import Cart from './Cart';
import Login from './Login';

const App = () => {
    return (
        <BrowserRouter>
            <div className="page">
                <Route exact path="/" component={Home} />
                <Route path="/search" component={Search} />
                <Route path="/all-categories" component={CategoryListingPage} />
                <Route path="/product-list" component={ProductListingPage} />
                <Route path="/product-details" component={ProductDetailPage} />
                <Route path="/cart" component={Cart} />
                <Route path="/login" component={Login} />
            </div>
            <CardButton />
        </BrowserRouter>
    );
};

export default App;
