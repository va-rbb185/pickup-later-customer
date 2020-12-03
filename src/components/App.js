import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginStatus } from '../enums';
import { convertPhone84To0 } from '../helpers';
import {
    fetchMenu,
    retrieveCartFromStorage,
    retrieveAuthenticationFromStorage,
    updateCustomerDetails
} from '../actions';

import Spinner from './Spinner';
import CartButton from './CartButton';
import MQTTConnector from './MQTTConnector';
import Home from './Home';
import Search from './Search';
import ProductListingPage from './ProductListingPage';
import ProductDetailPage from './ProductDetailPage';
import Cart from './Cart';
import Login from './Login';
import Checkout from './Checkout';
import OrderConfirmation from './OrderConfirmation';
import OrderDetails from './OrderDetails';

class App extends React.Component {
    saveCartToStorage(nextCart) {
        const currentCart = this.props.cart;
        const shouldSave = nextCart.amount !== currentCart.amount;

        if (shouldSave) {
            window.localStorage.setItem('storedCart', JSON.stringify(nextCart));
        }
    }

    updateCustomerDetails(nextAuthentication) {
        const currentLoginStatus = this.props.authentication.login.status;
        const nextLoginStatus = nextAuthentication.login.status;
        const shouldUpdate = nextLoginStatus === LoginStatus.LOGGED_IN && nextLoginStatus !== currentLoginStatus;

        if (shouldUpdate) {
            const nextCustomerDetails = {
                name: nextAuthentication.user.data['user_name'],
                phone: convertPhone84To0(nextAuthentication.user.data['phone_number']),
                note: ''
            };
            this.props.updateCustomerDetails(nextCustomerDetails);
        }
    }

    saveOrderConfirmationToStorage(nextOrderConfirmation) {
        const currentOrderConfirmation = this.props.orderConfirmation;
        const shouldSave = !!nextOrderConfirmation && nextOrderConfirmation !== currentOrderConfirmation;

        if (shouldSave) {
            window.localStorage.setItem('storedOrderConfirmation', JSON.stringify(nextOrderConfirmation));
        }
    }

    componentDidMount() {
        this.props.fetchMenu();
        this.props.retrieveCartFromStorage();
        this.props.retrieveAuthenticationFromStorage();
        // this.props.retrieveOrderConfirmationFromStorage();
    }

    shouldComponentUpdate(nextProps) {
        this.saveCartToStorage(nextProps.cart);
        this.updateCustomerDetails(nextProps.authentication);
        this.saveOrderConfirmationToStorage(nextProps.orderConfirmation)
        return false;
    }

    render() {
        return (
            <BrowserRouter>
                <Spinner />
                <CartButton />
                <MQTTConnector />
                <div className="page">
                    <Route exact path="/" component={Home} />
                    <Route path="/search" component={Search} />
                    <Route path="/categories/:name" component={ProductListingPage} />
                    <Route path="/products/:categoryName/:productName" component={ProductDetailPage} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/login" component={Login} />
                    <Route path="/order-confirmation" component={OrderConfirmation} />
                    <Route path="/orders/:id" component={OrderDetails} />
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = ({ cart, authentication, orderConfirmation }) => ({
    cart,
    authentication,
    orderConfirmation
});

const mapDispatchToProps = {
    fetchMenu,
    retrieveCartFromStorage,
    retrieveAuthenticationFromStorage,
    updateCustomerDetails
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
