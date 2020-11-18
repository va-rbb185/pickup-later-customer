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
import Spinner from './Spinner';
import Cart from './Cart';
import Login from './Login';
import Checkout from './Checkout';
import OrderConfirmation from './OrderConfirmation';

class App extends React.Component {
    saveCartToStorage(cart) {
        const prevCart = this.props.cart;
        const shouldSave = cart.amount !== prevCart.amount;

        if (shouldSave) {
            window.localStorage.setItem('storedCart', JSON.stringify(cart));
        }
    }

    updateCustomerPhone(nextAuthentication) {
        const currentLoginStatus = this.props.authentication.login.status;
        const nextLoginStatus = nextAuthentication.login.status;
        const shouldUpdate = nextLoginStatus === loginStatus.LOGGED_IN && nextLoginStatus !== currentLoginStatus;

        if (shouldUpdate) {
            const nextCustomerDetails = {
                name: '',
                phone: convertPhone84To0(nextAuthentication.user.data['phone_number']),
                note: ''
            };
            this.props.updateCustomerDetails(nextCustomerDetails);
        }
    }

    componentDidMount() {
        this.props.fetchMenu();
        this.props.retrieveCartFromStorage();
        this.props.retrieveAuthenticationFromStorage();
    }

    shouldComponentUpdate(nextProps) {
        this.saveCartToStorage(nextProps.cart);
        this.updateCustomerPhone(nextProps.authentication);
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
                    <Route path="/login" component={Login} />
                    <Route path="/order-confirmation" component={OrderConfirmation} />
                </div>
                <CartButton />
                <Spinner />
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
