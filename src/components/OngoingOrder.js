
/* 
 * Since there are uncertainties about the data,
 * the development of this page temporarily stopped
 * until data used in this page is fully confirmed
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { showCartButton, hideCartButton } from '../actions';
import { formatPrice } from '../helpers';
import { LoginStatus } from '../enums';

import PageHeader from './PageHeader';
import CheckoutProductTile from './CheckoutProductTile';

const OngoingOrder = ({ ongoingOrder, showCartButton, hideCartButton }) => {
    useEffect(() => {
        document.body.classList.add('white-smoke-bg');
        hideCartButton();

        return () => {
            document.body.classList.remove('white-smoke-bg');
            showCartButton();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function renderOrderDetails() {
        if (ongoingOrder) {
            // Remember to check `ongoingOrder.orderConfirmation.error` for failed order
            return (
                <div className="order-details">
                    <Card fluid className="order-info">
                        <Card.Content>
                            <Card.Header>Thông tin đơn hàng</Card.Header>
                        </Card.Content>
                        <Card.Content>[Thông tin đơn hàng]</Card.Content>
                    </Card>
                    <Card fluid className="order-status">
                        <Card.Content>
                            <Card.Header>Trạng thái đơn hàng</Card.Header>
                        </Card.Content>
                        <Card.Content>[Trạng thái đơn hàng]</Card.Content>
                    </Card>
                    <Card fluid className="order-details">
                        <Card.Content>
                            <Card.Header>Chi tiết đơn hàng</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <div className="checkout-product-tiles">
                                {ongoingOrder.cart.items.map(
                                    item => <CheckoutProductTile key={`checkoutProductTile_${item.product.id}`} cartItem={item} />
                                )}
                            </div>
                            <div className="summary">
                                <div className="summary-entry">
                                    <div className="summary-title">Tổng tạm tính</div>
                                    <div className="summary-amount text-right">
                                        {formatPrice(ongoingOrder.orderConfirmation.totalAmount)}
                                    </div>
                                </div>
                            </div>
                        </Card.Content>
                    </Card>
                    <Card fluid className="payment-info">
                        <Card.Content>
                            <Card.Header>Thông tin thanh toán</Card.Header>
                        </Card.Content>
                        <Card.Content>[Thông tin thanh toán]</Card.Content>
                    </Card>
                </div>
            );
        }

        return (
            <div className="no-order-yet">
                <div className="icon">
                    <FontAwesomeIcon icon={faCartPlus} size="4x" />
                </div>
                <div className="no-order-yet-msg">
                    <h3>Bạn chưa có đơn hàng đang thực hiện. Hãy đặt đơn hàng một đơn hàng mới!</h3>
                </div>
                <div className="back-to-homepage">
                    <Button
                        as={Link}
                        to="/"
                        color="green"
                        content="Về trang chủ"
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="ongoing-order inner-page">
            <PageHeader>Đơn hàng đang thực hiện</PageHeader>
            {renderOrderDetails()}
        </div>
    );
};

const mapStateToProps = ({ authentication, ongoingOrder }) => {
    const isLoggedIn = authentication.login.status === LoginStatus.LOGGED_IN;
    let userHasOngoingOrder = false;

    if (isLoggedIn) {
        const userId = authentication.user.data['id'];
        userHasOngoingOrder = !!ongoingOrder && userId === ongoingOrder.orderConfirmation.userId;
    }

    return {
        isLoggedIn,
        userHasOngoingOrder,
        ongoingOrder
    };
};

const mapDispatchToProps = {
    showCartButton,
    hideCartButton
};

const ConnectedOngoingOrder = connect(mapStateToProps, mapDispatchToProps)(OngoingOrder);

export default ConnectedOngoingOrder;
