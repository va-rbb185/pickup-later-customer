import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    fetchMenu,
    retrieveCartFromStorage,
    retrieveAuthenticationFromStorage,
    updateCustomerDetails
} from '../actions';
import { loginStatus } from '../enums';
import { convertPhone84To0 } from '../helpers';

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
        if (nextProps.authentication.login.status === loginStatus.LOGGED_IN) {
            const customerDetails = {
                name: '',
                phone: convertPhone84To0(nextProps.authentication.user.data['phone_number']),
                note: ''
            };
            this.props.updateCustomerDetails(customerDetails);
        }
        return false;
    }

    render() {
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

const mapStateToProps = ({ cart, authentication }) => ({
    cart,
    authentication
});

const actions = {
    fetchMenu,
    retrieveCartFromStorage,
    retrieveAuthenticationFromStorage,
    updateCustomerDetails
};

const ConnectedApp = connect(mapStateToProps, actions)(App);

export default ConnectedApp;
