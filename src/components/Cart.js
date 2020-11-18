import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { showCartButton, hideCartButton, clearCart } from '../actions';
import { loginStatus } from '../enums';
import { formatPrice, calculateAmount, calculateOriginalAmount } from '../helpers';

import PageHeader from './PageHeader';
import ProductTile from './ProductTile';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.onClickClearCart = this.onClickClearCart.bind(this);
    }

    onClickClearCart() {
        const confirmation = window.confirm('Bạn có chắc chắn muốn xoá tất cả sản phẩm khỏi giỏ hàng?');
        if (confirmation) {
            this.props.clearCart();
        }
    }

    componentDidMount() {
        this.props.hideCartButton();
    }

    componentWillUnmount() {
        this.props.showCartButton();
    }

    render() {
        const cartAmount = calculateAmount(this.props.cart);
        const cartOriginalAmount = calculateOriginalAmount(this.props.cart);

        return (
            <div className="cart inner-page">
                <PageHeader>Giỏ hàng của bạn</PageHeader>
                <div className="products">
                    {this.props.cart.items.map(item => <ProductTile key={`product_${item.product.id}`} product={item.product} />)}
                </div>
                {
                    this.props.cart.amount === 0
                        ? <div className="empty-cart-msg">
                            Giỏ hàng không có sản phẩm nào.
                        </div>
                        : null
                }
                {
                    this.props.cart.amount !== 0
                        ? <div className="clear-cart">
                            <Button
                                basic
                                color="red"
                                icon="trash alternate"
                                content="Xoá tất cả"
                                onClick={this.onClickClearCart}
                            />
                        </div>
                        : null
                }
                <div className="cart-summary">
                    {
                        !this.props.isLoggedIn
                            ? <div className="invalid-msg">
                                <span>Vui lòng </span>
                                <Link to="/login" className="login-link">đăng nhập</Link>
                                <span> để đến bước tiếp theo.</span>
                            </div>
                            : null
                    }
                    {
                        this.props.hasOngoingOrder
                            ? <div className="invalid-msg">
                                Vui lòng hoàn tất đơn hàng đang thực hiện để có thể đặt đơn hàng mới.
                            </div>
                            : null
                    }
                    <div className="subtotal">
                        <div className="label">Tổng cộng:</div>
                        <div className="values">
                            <div className="value">{formatPrice(cartAmount)}</div>
                            {
                                cartAmount !== cartOriginalAmount
                                    ? <div className="original-value"><s>{formatPrice(cartOriginalAmount)}</s></div>
                                    : null
                            }
                        </div>
                    </div>
                    <Button
                        disabled={!this.props.isLoggedIn || this.props.hasOngoingOrder || this.props.cart.amount === 0}
                        color="green"
                        content="Nhập thông tin đơn hàng"
                        onClick={() => this.props.history.push('/checkout')}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ cart, authentication, orderConfirmation }) => ({
    cart,
    isLoggedIn: authentication.login.status === loginStatus.LOGGED_IN,
    hasOngoingOrder: !!orderConfirmation
});

const actions = {
    showCartButton,
    hideCartButton,
    clearCart
};

const CartWithRouter = withRouter(Cart);

const ConnectedCart = connect(mapStateToProps, actions)(CartWithRouter);

export default ConnectedCart;
