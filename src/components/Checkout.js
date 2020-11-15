import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { faMobileAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faUser, faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatPrice, makeOrder, calculateAmount, calculateOriginalAmount } from '../helpers';
import { paymentMethods } from '../enums';
import {
    showCartButton,
    hideCartButton,
    updateCustomerDetails,
    updatePaymentMethod,
    createOrder
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
            customerDetailModalOpen: false,
            paymentModalOpen: false,
            promoModelOpen: false
        };
        this.setOpenCustomerDetailModal = this.setOpenCustomerDetailModal.bind(this);
        this.setOpenPaymentModal = this.setOpenPaymentModal.bind(this);
        this.setOpenPromoModal = this.setOpenPromoModal.bind(this);
        this.setPaymentMethod = this.setPaymentMethod.bind(this);
        this.onSaveCustomerDetails = this.onSaveCustomerDetails.bind(this);
        this.onSubmitPaymentMethod = this.onSubmitPaymentMethod.bind(this);
        this.onPlaceOrder = this.onPlaceOrder.bind(this);
    }

    setOpenCustomerDetailModal(open) {
        this.setState({ customerDetailModalOpen: open });
    }

    setOpenPaymentModal(open) {
        this.setState({ paymentModalOpen: open });
    }

    setOpenPromoModal(open) {
        this.setState({ promoModelOpen: open });
    }

    setPaymentMethod(paymentMethod) {
        this.setState({ currentlySelectedPayment: paymentMethod });
    }

    validateCustomerDetails(customerName, customerPhone) {
        let valid = true;
        let validationMessage = '';

        if (!customerName) {
            valid = false;
            validationMessage += 'Vui lòng không bỏ trống Tên người nhận.\n';
        }
        if (!customerPhone) {
            validationMessage += 'Vui lòng không bỏ trống Số điện thoại.\n';
            valid = false;
        }
        if (customerPhone && !new RegExp('^(?=0)[0-9]{10}$').test(customerPhone)) {
            validationMessage += 'Vui lòng nhập Số điện thoại hợp lệ.';
            valid = false;
        }

        if (validationMessage) {
            alert(validationMessage);
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
            const order = makeOrder(
                this.props.authentication,
                this.props.storeMenu,
                this.props.cart,
                this.props.customerDetails,
                this.props.paymentMethod
            );
            console.log('Created order:', order);

            /* Submit created order to server */
            this.props.createOrder(order);
        }
    }

    componentDidMount() {
        this.props.hideCartButton();
    }

    componentWillUnmount() {
        this.props.showCartButton();
    }

    render() {
        const orderSalePrice = calculateAmount(this.props.cart);
        const orderOriginalPrice = calculateOriginalAmount(this.props.cart);

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
                                            <span>{this.props.customerDetails.note || 'Không có'}</span>
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
                                    <div className="summary-title">Tổng tạm tính</div>
                                    <div className="summary-amount text-right">{formatPrice(orderSalePrice)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-section payment">
                        <div className="section-header">Phương thức thanh toán</div>
                        <div className="section-body">
                            <div className="payment-inner">
                                <div className="payment-methods" onClick={() => this.setOpenPaymentModal(true)}>
                                    <span>{paymentMethods[this.props.paymentMethod].shortTitle}</span>
                                </div>
                                <div className="promos" onClick={() => this.setOpenPromoModal(false)}>
                                    <span>Khuyến mãi/Giảm giá</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-placement">
                        <div className="subtotal">
                            <div className="label">Tổng cộng:</div>
                            <div className="values">
                                <div className="value">{formatPrice(orderSalePrice)}</div>
                                {
                                    orderSalePrice !== orderOriginalPrice
                                        ? <div className="original-value"><s>{formatPrice(orderOriginalPrice)}</s></div>
                                        : null
                                }
                            </div>
                        </div>
                        <Button color="green" onClick={this.onPlaceOrder}>Đặt đơn</Button>
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
                        <Form success>
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
                                        type="text"
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
                            className={`list-item${this.state.currentlySelectedPayment === paymentMethods.MOMO.stringValue ? ' selected' : ''}`}
                            onClick={() => this.setPaymentMethod(paymentMethods.MOMO.stringValue)}
                        >
                            <div className="payment-method-name">
                                <span>{paymentMethods.MOMO.longTitle}</span>
                            </div>
                            <div className="checkmark">
                                <FontAwesomeIcon icon={faCheck} size="2x" />
                            </div>
                        </li>
                        <li
                            className={`list-item${this.state.currentlySelectedPayment === paymentMethods.COD.stringValue ? ' selected' : ''}`}
                            onClick={() => this.setPaymentMethod(paymentMethods.COD.stringValue)}
                        >
                            <div className="payment-method-name">
                                <span>{paymentMethods.COD.longTitle}</span>
                            </div>
                            <div className="checkmark">
                                <FontAwesomeIcon icon={faCheck} size="2x" />
                            </div>
                        </li>
                    </ul>
                </CustomModal>
                <CustomModal
                    open={this.state.promoModelOpen}
                    header="Khuyến mãi/Giảm giá"
                    confirmation="Xác nhận"
                    onClose={() => this.setOpenPromoModal(false)}
                    onOpen={() => this.setOpenPromoModal(true)}
                    onConfirm={() => this.setOpenPromoModal(false)}
                >
                    <ul className="promo-list">
                        <li className="list-item">Hiện không có mã khuyến mãi khả dụng.</li>
                    </ul>
                </CustomModal>
            </div>
        );
    }
}

const mapStateToProps = ({ authentication, storeMenu, cart, customerDetails, paymentMethod }) => ({
    authentication,
    storeMenu,
    cart,
    customerDetails,
    paymentMethod
});

const actions = {
    showCartButton,
    hideCartButton,
    updateCustomerDetails,
    updatePaymentMethod,
    createOrder
};

const ConnectedCheckout = connect(mapStateToProps, actions)(Checkout);

export default ConnectedCheckout;
