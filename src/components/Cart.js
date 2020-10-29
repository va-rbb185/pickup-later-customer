import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { showCartButton, hideCartButton } from '../actions';
import { loginStatus } from '../enums';

import PageHeader from './PageHeader';
import ProductTile from './ProductTile';

class Cart extends React.Component {
    calculateSubtotal() {
        let subtotal = 0;
        this.props.cart.items.forEach(item => {
            subtotal += item.quantity * item.product.salePrice;
        });
        return subtotal;
    }

    componentDidMount() {
        this.props.hideCartButton();
    }

    componentWillUnmount() {
        this.props.showCartButton();
    }

    render() {
        return (
            <div className="cart inner-page">
                <PageHeader>Giỏ hàng của bạn</PageHeader>
                <div className="products">
                    {this.props.cart.items.map(item => <ProductTile key={`product_${item.product.id}`} product={item.product} />)}
                </div>
                <div className="cart-summary">
                    <div className="subtotal">
                        <div className="subtotal-label">Tổng cộng:</div>
                        <div className="subtotal-value">{this.calculateSubtotal()} đ</div>
                    </div>
                    <Button
                        color="green"
                        disabled={!this.props.isLoggedIn}
                        onClick={() => this.props.history.push('/checkout')}
                    >
                        {this.props.isLoggedIn ? 'Tiến hành Thanh toán' : 'Vui lòng đăng nhập để thanh toán'}
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ cart, authentication }) => ({
    cart,
    isLoggedIn: authentication.login.status === loginStatus.LOGGED_IN
});
const actions = {
    showCartButton,
    hideCartButton
};
const CartWithRouter = withRouter(Cart);
const ConnectedCart = connect(mapStateToProps, actions)(CartWithRouter);

export default ConnectedCart;
