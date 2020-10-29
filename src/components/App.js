import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    fetchMenu,
    retrieveCartFromStorage,
    retrieveAuthenticationFromStorage
} from '../actions';

import Home from './Home';
import Search from './Search';
import CategoryListingPage from './CategoryListingPage';
import ProductListingPage from './ProductListingPage';
import ProductDetailPage from './ProductDetailPage';
import CartButton from './CartButton';
import Cart from './Cart';
import Account from './Account';
import Checkout from './Checkout';

class App extends React.Component {
    saveCartToStorage(cart) {
        const prevCart = this.props.cart;
        if (cart.amount !== prevCart.amount) {
            window.localStorage.setItem('storedCart', JSON.stringify(cart));
            return true;
        }
        return false;
    }

    componentDidMount() {
        /*
         * Start Spinner here
         * Stop `Spinner` in Home's componentDidUpdate() method
         */
        this.props.fetchMenu();
        this.props.retrieveCartFromStorage();
        this.props.retrieveAuthenticationFromStorage();
    }

    shouldComponentUpdate(nextProps) {
        /*
         * Detects changes in `cart` state
         * Saves cart to `localStorage` whenever it is updated in store
         * App component is never re-rendered under any circumstances
         */
        this.saveCartToStorage(nextProps.cart);
        return false;
    }

    render() {
        console.log('App rendered.');
        return (
            <BrowserRouter>
                <div className="page">
                    <Route exact path="/" component={Home} />
                    <Route path="/search" component={Search} />
                    <Route path="/all-categories" component={CategoryListingPage} />
                    <Route path="/product-list" component={ProductListingPage} />
                    <Route path="/product-details" component={ProductDetailPage} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/account" component={Account} />
                </div>
                <CartButton />
            </BrowserRouter>
        );
    }
}

const mapStateToProps = ({ cart }) => ({ cart });

const actions = {
    fetchMenu,
    retrieveCartFromStorage,
    retrieveAuthenticationFromStorage
};

const ConnectedApp = connect(mapStateToProps, actions)(App);

export default ConnectedApp;
