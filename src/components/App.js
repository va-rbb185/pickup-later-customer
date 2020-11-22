import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginStatus } from '../enums';
import { convertPhone84To0 } from '../helpers';
import {
    fetchMenu,
    retrieveCartFromStorage,
    retrieveAuthenticationFromStorage,
    updateCustomerDetails,
    retrieveOngoingOrderFromStorage
} from '../actions';

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
import OngoingOrder from './OngoingOrder';

class App extends React.Component {
    saveCartToStorage(nextCart) {
        const currentCart = this.props.cart;
        const shouldSave = nextCart.amount !== currentCart.amount;

        if (shouldSave) {
            window.localStorage.setItem('storedCart', JSON.stringify(nextCart));
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

    saveOngoingOrderToStorage(nextOngoingOrder) {
        const currentOngoingOrder = this.props.ongoingOrder;
        const shouldSave = !!nextOngoingOrder && nextOngoingOrder !== currentOngoingOrder;

        if (shouldSave) {
            window.localStorage.setItem('storedOngoingOrder', JSON.stringify(nextOngoingOrder));
        }
    }

    componentDidMount() {
        this.props.fetchMenu();
        this.props.retrieveCartFromStorage();
        this.props.retrieveAuthenticationFromStorage();
        this.props.retrieveOngoingOrderFromStorage();
    }

    shouldComponentUpdate(nextProps) {
        this.saveCartToStorage(nextProps.cart);
        this.updateCustomerPhone(nextProps.authentication);
        this.saveOngoingOrderToStorage(nextProps.ongoingOrder);
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
                    <Route path="/ongoing-order" component={OngoingOrder} />
                </div>
                <CartButton />
                <Spinner />
            </BrowserRouter>
        );
    }
}

const mapStateToProps = ({ cart, authentication, ongoingOrder }) => ({
    cart,
    authentication,
    ongoingOrder
});

const mapDispatchToProps = {
    fetchMenu,
    retrieveCartFromStorage,
    retrieveAuthenticationFromStorage,
    updateCustomerDetails,
    retrieveOngoingOrderFromStorage
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
