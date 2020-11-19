import React from 'react';
import { connect } from 'react-redux';
import { showCartButton, hideCartButton, hideSpinner } from '../actions';
import PageHeader from './PageHeader';

class OngoingOrder extends React.Component {
    componentDidMount() {
        this.props.hideCartButton();
        this.props.hideSpinner();
    }

    componentWillUnmount() {
        this.props.showCartButton();
    }

    renderOrderDetails() {
        if (this.props.ongoingOrder) {
            return (
                <div className="order-details">
                    <h1>Trang theo dõi đơn hàng đang thực hiện</h1>
                </div>
            );
        }
        return (
            <h1>Bạn chưa có đơn hàng đang thực hiện. Hãy đặt đơn hàng một đơn hàng mới đi nào!</h1>
        );
    }

    render() {
        return (
            <div className="ongoing-order inner-page">
                <PageHeader>Đơn hàng đang thực hiện</PageHeader>
                {this.renderOrderDetails()}
            </div>
        );
    }
}

const mapStateToProps = ({ ongoingOrder }) => ({ ongoingOrder });

const actions = {
    showCartButton,
    hideCartButton,
    hideSpinner
};

const ConnectedOngoingOrder = connect(mapStateToProps, actions)(OngoingOrder);

export default ConnectedOngoingOrder;
