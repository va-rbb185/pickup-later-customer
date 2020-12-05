import React from 'react';
import { connect } from 'react-redux';
import { showCartButton, hideCartButton, fetchOrderHistory } from '../actions';

const OrderHistory = ({ orderHistory, showCartButton, hideCartButton, fetchOrderHistory }) => {
    return (
        <div className="order-history inner page">
        </div>
    );
};

const mapStateToProps = ({ orderHistory }) => ({ orderHistory });

const mapDispatchToProps = {
    showCartButton,
    hideCartButton,
    fetchOrderHistory
};

const ConnectedOrderHistory = connect(mapStateToProps, mapDispatchToProps)(OrderHistory);

export default ConnectedOrderHistory;
