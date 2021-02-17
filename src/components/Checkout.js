import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faUser, faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { formatPrice, makeOrder, calculateAmount, calculateDiscount } from '../helpers';
import { PaymentMethod, LoginStatus } from '../enums';
import { getVouchersOfUser, verifyVoucher } from '../api';
import {
    showCartButton,
    hideCartButton,
    updateCustomerDetails,
    updatePaymentMethod,
    createOrder,
    clearCart,
    showSpinner,
    hideSpinner
} from '../actions';

import PageHeader from './PageHeader';
import CheckoutProductTile from './CheckoutProductTile';
import CustomModal from './CustomModal';

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: this.props.customerDetails.name,
            customerPhone: this.props.customerDetails.phone,
            customerNote: this.props.customerDetails.note,
            currentlySelectedPayment: this.props.paymentMethod,
            usersPromos: [],
            selectedPromo: null,
            customerDetailModalOpen: false,
            paymentModalOpen: false,
            promoModalOpen: false
        };
        this.setOpenCustomerDetailModal = this.setOpenCustomerDetailModal.bind(this);
        this.setOpenPaymentModal = this.setOpenPaymentModal.bind(this);
        this.setOpenPromoModal = this.setOpenPromoModal.bind(this);
        this.setPaymentMethod = this.setPaymentMethod.bind(this);
        this.onSaveCustomerDetails = this.onSaveCustomerDetails.bind(this);
        this.onSubmitPaymentMethod = this.onSubmitPaymentMethod.bind(this);
        this.onPlaceOrder = this.onPlaceOrder.bind(this);
    }

    renderPromos() {
        return this.state.usersPromos.map(promo => (
            <li
                key={promo.id}
                className="promo"
                onClick={() => {
                    this.setOpenPromoModal(false);
                    this.props.showSpinner();

                    verifyVoucher({
                        userID: this.props.authentication.user.data.id,
                        voucherID: promo.code
                    })
                        .then(response => {
                            if (response && response.message === 'valid') {
                                this.setState({ selectedPromo: promo });
                            } else {
                                window.alert('Mã khuyến mãi không thể áp dụng cho đơn hàng này.');
                            }
                        })
                        .catch(error => console.error(error))
                        .finally(this.props.hideSpinner);
                }}
            >
                <h5 className="promo-name">{promo.name}</h5>
                <div className="promo-code">{promo.code}</div>
            </li>
        ));
    }

    setOpenCustomerDetailModal(open) {
        this.setState({ customerDetailModalOpen: open });
    }

    setOpenPaymentModal(open) {
        this.setState({ paymentModalOpen: open });
    }

    setOpenPromoModal(open) {
        this.setState({ promoModalOpen: open });
    }

    setPaymentMethod(paymentMethod) {
        this.setState({ currentlySelectedPayment: paymentMethod });
    }

    validateCustomerDetails(customerName, customerPhone) {
        let valid = true;
        let validationMessage = [];

        if (!customerName) {
            valid = false;
            validationMessage.push('Vui lòng không bỏ trống tên người nhận.');
        }
        if (!customerPhone) {
            valid = false;
            validationMessage.push('Vui lòng không bỏ trống số điện thoại.');
        }
        if (customerPhone && !new RegExp('^(?=0)[0-9]{10}$').test(customerPhone)) {
            valid = false;
            validationMessage.push('Vui lòng nhập số điện thoại hợp lệ.');
        }
        if (validationMessage.length > 0) {
            window.alert(validationMessage.join('\n'));
        }

        return valid;
    }

    onSaveCustomerDetails() {
        const { customerName, customerPhone, customerNote } = this.state;
        const valid = this.validateCustomerDetails(customerName, customerPhone);
        if (valid) {
            const customerDetails = {
                name: customerName,
                phone: customerPhone,
                note: customerNote
            };
            this.props.updateCustomerDetails(customerDetails);
            this.setOpenCustomerDetailModal(false);
        }
    }

    onSubmitPaymentMethod() {
        this.props.updatePaymentMethod(this.state.currentlySelectedPayment);
        this.setOpenPaymentModal(false);
    }

    onPlaceOrder() {
        const valid = this.validateCustomerDetails(
            this.props.customerDetails.name,
            this.props.customerDetails.phone
        );

        if (valid) {
            /* Start spinner for order placement */
            this.props.showSpinner();

            /* Make an order */
            const order = makeOrder(
                this.props.authentication,
                this.props.storeMenu,
                this.props.cart,
                this.props.customerDetails,
                this.props.paymentMethod,
                this.state.selectedPromo
            );

            /* Clear cart as order has been created */
            this.props.clearCart();

            /* Submit the order to server */
            this.props.createOrder(order);
        }
    }

    componentDidMount() {
        this.props.hideCartButton();
        if (this.props.authentication.login.status === LoginStatus.LOGGED_IN) {
            getVouchersOfUser(this.props.authentication.user.data.id)
                .then(response => this.setState({ usersPromos: response.vouchers }))
                .catch(error => console.log(error));
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.orderConfirmation && this.props.orderConfirmation !== prevProps.orderConfirmation) {
            const { qrText } = this.props.orderConfirmation;
            if (qrText) {
                window.location.replace(qrText);
            }
        }
    }

    componentWillUnmount() {
        this.props.showCartButton();
    }

    render() {
        if (this.props.orderConfirmation) {
            const {
                error,
                transactionNo: orderId,
                paymentMethod,
                paymentStatus,
                qrText,
                createdAt
            } = this.props.orderConfirmation;

            if (error) {
                return <Redirect to={{ pathname: '/order-confirmation', search: '?error=1' }} />;
            }

            if (paymentMethod === PaymentMethod.COD.value) {
                window.alert('Đặt đơn thành công. Bạn sẽ được chuyển đến trang chi tiết cho đơn hàng vừa đặt.');
                return (
                    <Redirect
                        to={{
                            pathname: '/order-confirmation',
                            search: `?orderId=${orderId}&paymentMethod=${PaymentMethod.COD}&paymentStatus=${paymentStatus}&qrText=${qrText}&createdAt=${createdAt}`
                        }}
                    />
                );
            }

            if (paymentMethod === PaymentMethod.MOMO.value && qrText) {
                window.alert('Đặt đơn thành công. Bạn sẽ được chuyển đến trang thanh toán MoMo cho đơn hàng vừa đặt.');
                return null;
            }
        }

        const orderSalePrice = calculateAmount(this.props.cart);
        const orderDiscount = calculateDiscount(orderSalePrice, this.state.selectedPromo);
        const orderDiscountedPrice = orderSalePrice - orderDiscount;
        const placeOrderAllowed = this.props.authentication.login.status === LoginStatus.LOGGED_IN
            && !!this.props.authentication.user.data
            && !this.props.orderConfirmation
            && this.props.cart.amount !== 0;

        return (
            <div className="checkout inner-page">
                <PageHeader>Thanh toán</PageHeader>
                <div className="checkout-content">
                    <div className="checkout-section customer-details">
                        <div className="section-header">Thông tin người nhận</div>
                        <div className="section-body" onClick={() => this.setOpenCustomerDetailModal(true)}>
                            <div className="customer-detail-listing">
                                <Form success>
                                    <div className="customer-field">
                                        <div className="field-icon">
                                            <FontAwesomeIcon icon={faUser} size="2x" />
                                        </div>
                                        <div className="field-data">
                                            <h5>Tên người nhận</h5>
                                            <span>{this.props.customerDetails.name || '<Chưa nhập>'}</span>
                                        </div>
                                    </div>
                                    <div className="customer-field">
                                        <div className="field-icon">
                                            <FontAwesomeIcon icon={faMobileAlt} size="2x" />
                                        </div>
                                        <div className="field-data">
                                            <h5>Số điện thoại</h5>
                                            <span>{this.props.customerDetails.phone || '<Chưa nhập>'}</span>
                                        </div>
                                    </div>
                                    <div className="customer-field">
                                        <div className="field-icon">
                                            <FontAwesomeIcon icon={faStickyNote} size="2x" />
                                        </div>
                                        <div className="field-data">
                                            <h5>Lưu ý</h5>
                                            <span>{this.props.customerDetails.note || '<Không có>'}</span>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-section order-summary">
                        <div className="section-header">Đơn hàng</div>
                        <div className="section-body">
                            <div className="edit-cart-link">
                                <Link to="/cart">Chỉnh sửa Giỏ hàng</Link>
                            </div>
                            <div className="checkout-product-tiles">
                                {this.props.cart.items.map(
                                    item => <CheckoutProductTile key={`checkoutProductTile_${item.product.id}`} cartItem={item} />
                                )}
                            </div>
                            <div className="summary">
                                <div className="summary-entry">
                                    <div className="summary-title">Tạm tính</div>
                                    <div className="summary-amount text-right">{formatPrice(orderSalePrice)}</div>
                                </div>
                                <div className="summary-entry">
                                    <div className="summary-title">Giảm giá</div>
                                    <div className="summary-amount text-right">- {formatPrice(orderDiscount)}</div>
                                </div>
                                <div className="summary-entry">
                                    <div className="summary-title">Tổng</div>
                                    <div className="summary-amount text-right">{formatPrice(orderDiscountedPrice)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-section payment">
                        <div className="section-header">Phương thức thanh toán</div>
                        <div className="section-body">
                            <div className="payment-inner">
                                <div className="payment-methods" onClick={() => this.setOpenPaymentModal(true)}>
                                    <span style={{ color: PaymentMethod[this.props.paymentMethod].indicatorColor }}>
                                        {PaymentMethod[this.props.paymentMethod].shortTitle}
                                    </span>
                                </div>
                                <div className="promos">
                                    <div className="promo-callout" onClick={() => this.setOpenPromoModal(true)}>
                                        {this.state.selectedPromo ? this.state.selectedPromo.name : 'Thêm mã khuyến mãi'}
                                    </div>
                                    {this.state.selectedPromo
                                        ? <div className="remove-promo" onClick={() => this.setState({ selectedPromo: null })}>x</div>
                                        : null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-placement">
                        {
                            !placeOrderAllowed
                                ? <div className="invalid-msg">
                                    Không thể đặt đơn hàng mới vào lúc này.
                                </div>
                                : null
                        }
                        <div className="subtotal">
                            <div className="label">Tổng cộng:</div>
                            <div className="values">
                                <div className="value">{formatPrice(orderDiscountedPrice)}</div>
                                {
                                    orderSalePrice !== orderDiscountedPrice
                                        ? <div className="original-value"><s>{formatPrice(orderSalePrice)}</s></div>
                                        : null
                                }
                            </div>
                        </div>
                        <Button
                            disabled={!placeOrderAllowed}
                            color="green"
                            content="Đặt hàng"
                            onClick={this.onPlaceOrder}
                        />
                    </div>
                </div>

                <CustomModal
                    open={this.state.customerDetailModalOpen}
                    header="Thông tin người nhận"
                    confirmation="Lưu"
                    onClose={() => this.setOpenCustomerDetailModal(false)}
                    onOpen={() => this.setOpenCustomerDetailModal(true)}
                    onConfirm={this.onSaveCustomerDetails}
                >
                    <div className="customer-detail-form">
                        <Form success noValidate>
                            <div className="customer-field">
                                <div className="field-icon">
                                    <FontAwesomeIcon icon={faUser} size="2x" />
                                </div>
                                <div className="field-data">
                                    <Form.Input
                                        type="text"
                                        placeholder="Tên người nhận"
                                        required={true}
                                        maxLength={50}
                                        value={this.state.customerName}
                                        onChange={event => this.setState({ customerName: event.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="customer-field">
                                <div className="field-icon">
                                    <FontAwesomeIcon icon={faMobileAlt} size="2x" />
                                </div>
                                <div className="field-data">
                                    <Form.Input
                                        readOnly={true}
                                        type="tel"
                                        placeholder="Số điện thoại"
                                        required={true}
                                        maxLength={10}
                                        pattern="^(?=0)[0-9]{10}$"
                                        value={this.state.customerPhone}
                                        onChange={event => this.setState({ customerPhone: event.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="customer-field">
                                <div className="field-icon">
                                    <FontAwesomeIcon icon={faStickyNote} size="2x" />
                                </div>
                                <div className="field-data">
                                    <Form.Input
                                        type="text"
                                        placeholder="Lưu ý"
                                        maxLength={50}
                                        value={this.state.customerNote}
                                        onChange={event => this.setState({ customerNote: event.target.value })}
                                    />
                                </div>
                            </div>
                        </Form>
                    </div>
                </CustomModal>
                <CustomModal
                    open={this.state.paymentModalOpen}
                    header="Phương thức thanh toán"
                    confirmation="Xác nhận"
                    onClose={() => this.setOpenPaymentModal(false)}
                    onOpen={() => this.setOpenPaymentModal(true)}
                    onConfirm={this.onSubmitPaymentMethod}
                >
                    <ul className="payment-method-list">
                        <li
                            className={`list-item${this.state.currentlySelectedPayment === PaymentMethod.MOMO.value ? ' selected' : ''}`}
                            onClick={() => this.setPaymentMethod(PaymentMethod.MOMO.value)}
                        >
                            <div className="payment-method-name">
                                <span>{PaymentMethod.MOMO.longTitle}</span>
                            </div>
                            <div className="checkmark">
                                <FontAwesomeIcon icon={faCheck} size="2x" />
                            </div>
                        </li>
                        <li
                            className={`list-item${this.state.currentlySelectedPayment === PaymentMethod.COD.value ? ' selected' : ''}`}
                            onClick={() => this.setPaymentMethod(PaymentMethod.COD.value)}
                        >
                            <div className="payment-method-name">
                                <span>{PaymentMethod.COD.longTitle}</span>
                            </div>
                            <div className="checkmark">
                                <FontAwesomeIcon icon={faCheck} size="2x" />
                            </div>
                        </li>
                    </ul>
                </CustomModal>
                <CustomModal
                    open={this.state.promoModalOpen}
                    header="Khuyến mãi/Giảm giá"
                    confirmation="Xác nhận"
                    noActions
                    onClose={() => this.setOpenPromoModal(false)}
                    onOpen={() => this.setOpenPromoModal(true)}
                >
                    <ul className="promo-list">
                        {this.state.usersPromos.length > 0
                            ? this.renderPromos()
                            : <li className="list-item">Không có mã khuyến mãi khả dụng.</li>
                        }
                    </ul>
                </CustomModal>
            </div>
        );
    }
}

const mapStateToProps = ({ authentication, storeMenu, cart, customerDetails, paymentMethod, orderConfirmation }) => ({
    authentication,
    storeMenu,
    cart,
    customerDetails,
    paymentMethod,
    orderConfirmation
});

const mapDispatchToProps = {
    showCartButton,
    hideCartButton,
    updateCustomerDetails,
    updatePaymentMethod,
    createOrder,
    clearCart,
    showSpinner,
    hideSpinner
};

const ConnectedCheckout = connect(mapStateToProps, mapDispatchToProps)(Checkout);

export default ConnectedCheckout;
