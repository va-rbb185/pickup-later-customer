import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import {
    showCartButton,
    hideCartButton,
    showSpinner,
    hideSpinner,
    updateCart,
    updateCartNo
} from '../actions';
import { LoginStatus } from '../enums';
import { formatPrice, calculateAmount, calculateOriginalAmount, clearCart } from '../helpers';

import PageHeader from './PageHeader';
import ProductTile from './ProductTile';
import CustomModal from './CustomModal';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shareCartModalOpen: false
        };
        this.cartNoFromQueryString = new URLSearchParams(this.props.location.search).get('cartNo');
        this.onClickClearCart = this.onClickClearCart.bind(this);
    }

    onClickClearCart() {
        if (this.props.cartNo
            && window.confirm('Bạn có chắc chắn muốn xoá tất cả sản phẩm khỏi giỏ hàng?')) {
            this.props.showSpinner();
            this.props.updateCart(this.props.cartNo, clearCart(), this.props.hideSpinner);
        }
    }

    componentDidMount() {
        this.props.hideCartButton();
        if (this.cartNoFromQueryString) {
            this.props.updateCartNo(this.cartNoFromQueryString);
        }
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
                    {this.props.cart.items.map(
                        item => <ProductTile key={`product_${item.product.id}`} product={item.product} />
                    )}
                </div>
                {
                    this.props.cart.amount === 0
                        ? <div className="empty-cart-msg">
                            Giỏ hàng không có sản phẩm nào.
                        </div>
                        : null
                }
                <div className="cart-actions">
                    {
                        this.props.cart.amount !== 0
                            ? <Button
                                basic
                                color="red"
                                icon="trash alternate"
                                content="Xoá tất cả"
                                onClick={this.onClickClearCart}
                            />
                            : null
                    }
                    <Button
                        basic
                        color="orange"
                        icon="share square"
                        content="Chia sẻ giỏ hàng"
                    />
                </div>
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
                                Vui lòng hoàn tất đơn hàng đang thực hiện trước khi đặt đơn hàng mới.
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
                        as={Link}
                        to="/checkout"
                        className="proceed-to-checkout-btn"
                        disabled={!this.props.isLoggedIn || this.props.hasOngoingOrder || this.props.cart.amount === 0}
                        color="green"
                        content="Nhập thông tin đơn hàng"
                    />
                </div>
                <CustomModal
                    open={this.state.shareCartModalOpen}
                    header="Chia sẻ giỏ hàng"
                    confirmation="Xác nhận"
                    onClose={() => this.setState({ shareCartModalOpen: false })}
                    onOpen={() => this.setState({ shareCartModalOpen: true })}
                    onConfirm={() => this.setState({ shareCartModalOpen: false })}
                >
                    Chia sẻ giỏ hàng
                </CustomModal>
            </div>
        );
    }
}

const mapStateToProps = ({ cart, cartNo, authentication, orderConfirmation }) => {
    const isLoggedIn = authentication.login.status === LoginStatus.LOGGED_IN;
    return {
        cart,
        isLoggedIn,
        cartNo: isLoggedIn ? authentication.user.data.cartNo : cartNo,
        hasOngoingOrder: !!orderConfirmation && !orderConfirmation.error
    };
};

const mapDispatchToProps = {
    showCartButton,
    hideCartButton,
    showSpinner,
    hideSpinner,
    updateCart,
    updateCartNo
};

const CartWithRouter = withRouter(Cart);
const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(CartWithRouter);

export default ConnectedCart;
