import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { showCartButton, hideCartButton } from '../actions';
import PageHeader from './PageHeader';

const OngoingOrder = ({ ongoingOrder, showCartButton, hideCartButton }) => {
    let history = useHistory();
    useEffect(() => {
        hideCartButton();
        return () => {
            showCartButton();
        };
    }, [showCartButton, hideCartButton]);

    const renderOrderDetails = () => {
        if (ongoingOrder) {
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
                        onClick={() => history.replace('/')}
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
}

const mapStateToProps = ({ ongoingOrder }) => ({ ongoingOrder });

const mapDispatchToProps = {
    showCartButton,
    hideCartButton
};

const ConnectedOngoingOrder = connect(mapStateToProps, mapDispatchToProps)(OngoingOrder);

export default ConnectedOngoingOrder;
