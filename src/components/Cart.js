import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import ProductTile from './ProductTile';
// import Recommendation from './Recommendation';
import { showCartButton, hideCartButton } from '../actions';

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
                <PageHeader pageTitle="Giỏ hàng của bạn" />
                <div className="products">
                    {this.props.cart.items.map(item => <ProductTile key={`product_${item.product.id}`} product={item.product} />)}
                </div>
                {/* <Recommendation /> */}
                <div className="cart-summary">
                    <div className="subtotal">
                        <div className="subtotal-label">Tổng cộng:</div>
                        <div className="subtotal-value">{this.calculateSubtotal()} đ</div>
                    </div>
                    <Button color="green" onClick={() => this.props.history.push('/checkout')}>Tiến hành Thanh toán</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ cart }) => ({ cart });
const actions = {
    showCartButton,
    hideCartButton
};
const CartWithRouter = withRouter(Cart);
const ConnectedCart = connect(mapStateToProps, actions)(CartWithRouter);

export default ConnectedCart;
