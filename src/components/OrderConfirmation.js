import React from 'react';
import { connect } from 'react-redux';
import { showCartButton, hideCartButton, hideSpinner } from '../actions';
import PageHeader from './PageHeader';

class OrderConfirmation extends React.Component {
    componentDidMount() {
        this.props.hideCartButton();
        this.props.hideSpinner();
    }

    componentWillUnmount() {
        this.props.showCartButton();
    }

    render() {
        return (
            <div className="order-confirmation inner-page">
                <PageHeader>Xác nhận đơn hàng</PageHeader>
                <h1>Trang theo dõi đơn hàng đang thực hiện</h1>
            </div>
        );
    }
}

const mapStateToProps = ({ orderConfirmation }) => ({ orderConfirmation });

const actions = {
    showCartButton,
    hideCartButton,
    hideSpinner
};

const ConnectedOrderConfirmation = connect(mapStateToProps, actions)(OrderConfirmation);

export default ConnectedOrderConfirmation;
