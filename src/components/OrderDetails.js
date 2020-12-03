import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faStickyNote, faHandPaper } from '@fortawesome/free-regular-svg-icons';
import { faHashtag, faPhone } from '@fortawesome/free-solid-svg-icons';
import { fetchOrder } from '../api';
import { PaymentMethod, PaymentStatus } from '../enums';
import { formatPrice, getDateTimeFromMilliseconds } from '../helpers';
import { showCartButton, hideCartButton } from '../actions';
import { order as orderFromJSON } from '../json';

import PageHeader from './PageHeader';
import OrderProductTile from './OrderProductTile';

class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: orderFromJSON.data
        };
    }

    fetchTheOrder() {
        fetchOrder(this.props.match.params.id)
            .then(response => this.setState({ order: response.data }))
            .catch(error => console.error(error));
    }

    componentDidMount() {
        document.body.classList.remove('white-smoke-bg');
        this.props.hideCartButton();
        this.fetchTheOrder();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.orderHistory !== this.props.orderHistory) {
            this.fetchTheOrder();
        }
        return nextState.order !== this.state.order;
    }

    componentWillUnmount() {
        document.body.classList.remove('white-smoke-bg');
        this.props.showCartButton();
    }

    render() {
        if (this.state.order) {
            const {
                transactionNo,
                totalAmount,
                orderDetails,
                userName,
                phoneNumber,
                note,
                paymentMethod,
                paymentStatus,
                createdAt
            } = this.state.order;

            return (
                <div className="order-detail-page inner-page">
                    <PageHeader>Đơn hàng đang thực hiện</PageHeader>
                    <div className="order-details">
                        <Card fluid className="order-info">
                            <Card.Content>
                                <Card.Header>Thông tin đơn hàng</Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <div className="order-info-entries">
                                    <div className="order-info-entry">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faHashtag} size="1x" />
                                        </div>
                                        <div className="content">{transactionNo}</div>
                                    </div>
                                    <div className="order-info-entry">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faClock} size="1x" />
                                        </div>
                                        <div className="content">{getDateTimeFromMilliseconds(createdAt)}</div>
                                    </div>
                                    <div className="order-info-entry">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faUser} size="1x" />
                                        </div>
                                        <div className="content">{userName}</div>
                                    </div>
                                    <div className="order-info-entry">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faPhone} size="1x" />
                                        </div>
                                        <div className="content">{phoneNumber}</div>
                                    </div>
                                    <div className="order-info-entry">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faStickyNote} size="1x" />
                                        </div>
                                        <div className="content">{note || '<Không có>'}</div>
                                    </div>
                                    <div className="order-info-entry">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faHandPaper} size="1x" />
                                        </div>
                                        <div className="content">Nhận hàng tại quầy</div>
                                    </div>
                                </div>
                            </Card.Content>
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
                                <div className="order-product-tiles">
                                    {orderDetails.map(
                                        item => <OrderProductTile key={`orderProductTile_${item.productId}`} orderProduct={item} />
                                    )}
                                </div>
                                <div className="summary">
                                    <div className="summary-entry">
                                        <div className="summary-title">Tổng tạm tính</div>
                                        <div className="summary-amount text-right">{formatPrice(totalAmount)}</div>
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>
                        <Card fluid className="payment-info">
                            <Card.Content>
                                <Card.Header>Thông tin thanh toán</Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <div className="payment-info-entries">
                                    <div className="order-info-entry">
                                        <span>Số tiền phải trả:</span>
                                        <span>&nbsp;</span>
                                        <span className="order-amount">{formatPrice(totalAmount)}</span>
                                    </div>
                                    <div className="order-info-entry">
                                        <span>Thanh toán bằng:</span>
                                        <span>&nbsp;</span>
                                        <span
                                            className="payment-method"
                                            style={{ color: PaymentMethod[paymentMethod].indicatorColor }}
                                        >
                                            {PaymentMethod[paymentMethod].shortTitle}
                                        </span>
                                        <span>&nbsp;</span>
                                        <span
                                            className="payment-status"
                                            style={{ color: PaymentStatus[paymentStatus].indicatorColor }}
                                        >
                                            ({PaymentStatus[paymentStatus].title})
                                        </span>
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>
                    </div>
                </div>
            );
        }

        return null;
    }
}

const mapStateToProps = ({ orderHistory }) => ({ orderHistory });

const mapDispatchToProps = {
    showCartButton,
    hideCartButton
};

const ConnectedOrderDetails = connect(mapStateToProps, mapDispatchToProps)(OrderDetails);

export default ConnectedOrderDetails;
