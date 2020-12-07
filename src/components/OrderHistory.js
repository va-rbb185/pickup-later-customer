import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { LoginStatus, OrderStatus } from '../enums';
import { getDateTimeFromMilliseconds, formatPrice, getOrderQuantity, getBriefDescription } from '../helpers';
import { showCartButton, hideCartButton, fetchOrderHistory } from '../actions';
import PageHeader from './PageHeader';

const OrderHistory = ({ userId, orderHistory, fetchOrderHistory, showCartButton, hideCartButton }) => {
    let history = useHistory();

    useEffect(() => {
        hideCartButton();
        document.body.classList.add('white-smoke-bg');
        return () => {
            showCartButton();
            document.body.classList.remove('white-smoke-bg');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (typeof userId === 'number') {
            fetchOrderHistory(userId, {
                page: 1,
                perPage: 100
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    return (
        <div className="order-history inner-page">
            <PageHeader>Lịch sử mua hàng</PageHeader>
            <div className="order-list">
                {
                    orderHistory
                        ? orderHistory.records.map(item => {
                            const linkToOrderDetails = `/orders/${item.transactionNo}`;
                            return (
                                <div key={`orderHistoryItem_${item.transactionNo}`} className="order-item">
                                    <div className="order-item-content">
                                        <div className="total-quantity">
                                            <Button
                                                basic
                                                className="btn-quantity"
                                                onClick={() => history.push(linkToOrderDetails)}
                                            >
                                                <span>{getOrderQuantity(item.orderDetails)}</span>
                                            </Button>
                                        </div>
                                        <div className="details">
                                            <div className="order-id">
                                                <Link to={linkToOrderDetails}>{item.transactionNo}</Link>
                                            </div>
                                            <div className="brief-description">{getBriefDescription(item.orderDetails)}</div>
                                            <div className="order-total-amount">{formatPrice(item.totalAmount)}</div>
                                            <div className="creation-time">{getDateTimeFromMilliseconds(item.createdAt)}</div>
                                        </div>
                                        <div className="status">
                                            <div
                                                className="status-badge"
                                                style={{ backgroundColor: OrderStatus[item.status].indicatorColor }}
                                            >
                                                {OrderStatus[item.status].title}
                                            </div>
                                        </div>
                                    </div>
                                </div>);
                        })
                        : null
                }
            </div>
        </div>
    );
};

const mapStateToProps = ({ authentication, orderHistory }) => ({
    userId: authentication.login.status === LoginStatus.LOGGED_IN ? authentication.user.data.id : null,
    orderHistory
});

const mapDispatchToProps = {
    showCartButton,
    hideCartButton,
    fetchOrderHistory
};

const ConnectedOrderHistory = connect(mapStateToProps, mapDispatchToProps)(OrderHistory);

export default ConnectedOrderHistory;
