import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginStatus } from '../enums';
import { convertPhone84To0 } from '../helpers';
import {
    fetchMenu,
    retrieveCartFromStorage,
    retrieveAuthenticationFromStorage,
    retrieveOrderConfirmationFromStorage,
    updateCustomerDetails,
    showSpinner,
    hideSpinner,
    getCart
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
import OrderHistory from './OrderHistory';
import OrderDetails from './OrderDetails';

class App extends React.Component {
    getCartFromServer(nextAuthentication) {
        const currentLoginStatus = this.props.authentication.login.status;
        const nextLoginStatus = nextAuthentication.login.status;
        const shouldGet = nextLoginStatus !== currentLoginStatus
            && nextLoginStatus === LoginStatus.LOGGED_IN
            && !!nextAuthentication.user.data.cartNo;

        if (shouldGet) {
            this.props.showSpinner();
            this.props.getCart(nextAuthentication.user.data.cartNo, this.props.hideSpinner);
        }
    }

    updateCustomerDetails(nextAuthentication) {
        const currentLoginStatus = this.props.authentication.login.status;
        const nextLoginStatus = nextAuthentication.login.status;
        const shouldUpdate = nextLoginStatus === LoginStatus.LOGGED_IN && nextLoginStatus !== currentLoginStatus;

        if (shouldUpdate) {
            const nextCustomerDetails = {
                name: nextAuthentication.user.data.userName,
                phone: convertPhone84To0(nextAuthentication.user.data.phoneNumber),
                note: ''
            };
            this.props.updateCustomerDetails(nextCustomerDetails);
        }
    }

    saveOrderConfirmationToStorage(nextOrderConfirmation) {
        const currentOrderConfirmation = this.props.orderConfirmation;
        const shouldSave = nextOrderConfirmation !== currentOrderConfirmation;

        if (shouldSave) {
            if (nextOrderConfirmation) {
                window.localStorage.setItem('storedOrderConfirmation', JSON.stringify(nextOrderConfirmation));
            } else {
                window.localStorage.removeItem('storedOrderConfirmation');
            }
        }
    }

    componentDidMount() {
        this.props.fetchMenu();
        this.props.retrieveAuthenticationFromStorage();
        this.props.retrieveOrderConfirmationFromStorage();
    }

    shouldComponentUpdate(nextProps) {
        this.getCartFromServer(nextProps.authentication);
        this.updateCustomerDetails(nextProps.authentication);
        this.saveOrderConfirmationToStorage(nextProps.orderConfirmation);
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
                    <Route exact path="/orders" component={OrderHistory} />
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
    retrieveOrderConfirmationFromStorage,
    updateCustomerDetails,
    showSpinner,
    hideSpinner,
    getCart
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
