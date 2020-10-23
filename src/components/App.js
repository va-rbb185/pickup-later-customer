import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMenu, retrieveCartFromStorage } from '../actions';

import Home from './Home';
import Search from './Search';
import CategoryListingPage from './CategoryListingPage';
import ProductListingPage from './ProductListingPage';
import ProductDetailPage from './ProductDetailPage';
import CardButton from './CartButton';
import Cart from './Cart';
import Login from './Login';
import Checkout from './Checkout';

class App extends React.Component {
    saveCartToStorage(cart) {
        const prevCart = this.props.cart;
        const hasCartChanged = cart.amount !== prevCart.amount;
        if (hasCartChanged) {
            window.localStorage.setItem('storedCart', JSON.stringify(cart));
        }
    }

    componentDidMount() {
        this.props.fetchMenu();
        this.props.retrieveCartFromStorage();
    }

    shouldComponentUpdate(nextProps) {
        this.saveCartToStorage(nextProps.cart);
        return false;
    }

    render() {
        console.info('App rendered.');
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
                </div>
                <CardButton />
            </BrowserRouter>
        );
    }
}

const mapStateToProps = ({ cart }) => ({ cart });
const actions = { fetchMenu, retrieveCartFromStorage };
const ConnectedApp = connect(mapStateToProps, actions)(App);

export default ConnectedApp;
