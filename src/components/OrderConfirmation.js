import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { hideSpinner } from '../actions';
import PageHeader from './PageHeader';

const OrderConfirmation = ({ orderConfirmation, hideSpinner }) => {
    let history = useHistory();
    useEffect(() => {
        hideSpinner();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (orderConfirmation && !orderConfirmation.error) {
        return <Redirect to={`/orders/${orderConfirmation.transactionNo}`} />;
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
                    onClick={() => history.replace('/')}
                />
            </div>
        </div>
    );
};

const mapStateToProps = ({ orderConfirmation }) => ({ orderConfirmation });
const mapDispatchToProps = { hideSpinner };
const ConnectedOrderConfirmation = connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);

export default ConnectedOrderConfirmation;
