import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMenu } from '../actions';

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
    isStoreMenuEmpty() {
        return Object.keys(this.props.storeMenu).length === 0;
    }

    componentDidMount() {
        if (this.isStoreMenuEmpty()) {
            this.props.fetchMenu();
        }
    }

    render() {
        console.info('App rendered/re-rendered. All component props:', this.props);
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

const mapStateToProps = state => ({ storeMenu: state.storeMenu });
const ConnectedApp = connect(
    mapStateToProps,
    { fetchMenu }
)(App);

export default ConnectedApp;
