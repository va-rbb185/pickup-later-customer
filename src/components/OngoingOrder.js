import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { showCartButton, hideCartButton } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import PageHeader from './PageHeader';

class OngoingOrder extends React.Component {
    componentDidMount() {
        this.props.hideCartButton();
    }

    componentWillUnmount() {
        this.props.showCartButton();
    }

    renderOrderDetails() {
        if (this.props.ongoingOrder) {
            // Remember to check `ongoingOrder.orderConfirmation.error` for failed order
            return (
                <div className="order-details">
                    <h3>Trang theo dõi đơn hàng đang thực hiện.</h3>
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
                        color="green"
                        content="Về trang chủ"
                        onClick={() => this.props.history.replace('/')}
                    />
                </div>
            </div>
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

const mapDispatchToProps = {
    showCartButton,
    hideCartButton
};

const ConnectedOngoingOrder = connect(mapStateToProps, mapDispatchToProps)(OngoingOrder);

export default ConnectedOngoingOrder;
