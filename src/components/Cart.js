import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Input } from 'semantic-ui-react';
import {
    showCartButton,
    hideCartButton,
    showSpinner,
    hideSpinner,
    updateCart,
    updateCartNo,
    fetchMenu
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
        const urlParams = new URLSearchParams(props.location.search);
        this.cartNoFromQueryString = urlParams.get('cartNo');
        this.storeToken = urlParams.get('storeToken');
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
        if (this.storeToken) {
            this.props.showSpinner();
            this.props.fetchMenu(this.storeToken, this.props.hideSpinner);
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
                        onClick={() => this.setState({ shareCartModalOpen: true })}
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
                    confirmation="OK"
                    onClose={() => this.setState({ shareCartModalOpen: false })}
                    onOpen={() => this.setState({ shareCartModalOpen: true })}
                    onConfirm={() => this.setState({ shareCartModalOpen: false })}
                >
                    <div className="share-cart-modal-content">
                        <div className="share-cart-message">Chia sẻ liên kết bên dưới để cùng những người bạn đóng góp vào giỏ hàng:</div>
                        <Input
                            className="share-cart-link"
                            icon="linkify"
                            iconPosition="left"
                            label={{
                                tag: false,
                                content: 'Sao chép',
                                onClick: () => {
                                    document.querySelector('.share-cart-link input').select();
                                    document.execCommand('copy');
                                }
                            }}
                            labelPosition="right"
                            value={`${window.location.protocol}//${window.location.host}/cart?cartNo=${this.props.cartNo}&storeToken=${this.props.storeToken}`}
                            readOnly={true}
                        />
                    </div>
                </CustomModal>
            </div>
        );
    }
}

const mapStateToProps = ({ cart, cartNo, authentication, orderConfirmation, storeMenu }) => {
    const isLoggedIn = authentication.login.status === LoginStatus.LOGGED_IN;
    return {
        cart,
        isLoggedIn,
        cartNo: isLoggedIn ? authentication.user.data.cartNo : cartNo,
        hasOngoingOrder: !!orderConfirmation && !orderConfirmation.error,
        storeToken: !!storeMenu.storeId ? storeMenu.token : ''
    };
};

const mapDispatchToProps = {
    showCartButton,
    hideCartButton,
    showSpinner,
    hideSpinner,
    updateCart,
    updateCartNo,
    fetchMenu
};

const CartWithRouter = withRouter(Cart);
const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(CartWithRouter);

export default ConnectedCart;
