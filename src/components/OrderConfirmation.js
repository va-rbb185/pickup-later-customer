import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { hideSpinner } from '../actions';
import PageHeader from './PageHeader';

class OrderConfirmation extends React.Component {
    componentDidMount() {
        this.props.hideSpinner();
    }

    render() {
        if (
            this.props.ongoingOrder
            && this.props.ongoingOrder.orderId
            && !this.props.ongoingOrder.orderConfirmation.error
        ) {
            return <Redirect to="/ongoing-order" />;
        }

        return (
            <div className="order-confirmation inner-page">
                <PageHeader noLogo>Xác nhận đơn hàng</PageHeader>
                <div className="icon">
                    <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
                </div>
                <div className="order-confirmation-msg">
                    <h3>Đặt đơn hàng không thành công. Vui lòng thử lại sau.</h3>
                </div>
                <div className="back-to-homepage">
                    <Button
                        color="grey"
                        content="Về trang chủ"
                        onClick={() => this.props.history.replace('/')}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ ongoingOrder }) => ({ ongoingOrder });
const actions = { hideSpinner };
const OrderConfirmationWithRouter = withRouter(OrderConfirmation);
const ConnectedOrderConfirmation = connect(mapStateToProps, actions)(OrderConfirmationWithRouter);

export default ConnectedOrderConfirmation;
