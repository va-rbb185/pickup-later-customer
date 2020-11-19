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

    render() {
        return (
            <div className="ongoing-order inner-page">
                <PageHeader>Đơn hàng đang thực hiện</PageHeader>
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

const ConnectedOngoingOrder = connect(mapStateToProps, actions)(OngoingOrder);

export default ConnectedOngoingOrder;
