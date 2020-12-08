import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button, Modal, Select } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStickyNote, faHandPaper } from '@fortawesome/free-regular-svg-icons';
import { faHashtag, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { fetchOrder, updateOrder } from '../api';
import { PaymentMethod, PaymentStatus, OrderStatus, LoginStatus } from '../enums';
import { formatPrice, getDateTimeFromMilliseconds } from '../helpers';
import { showCartButton, hideCartButton, showSpinner, hideSpinner } from '../actions';

import PageHeader from './PageHeader';
import OrderProductTile from './OrderProductTile';
import OrderProgressBar from './OrderProgressBar';
import CustomBadge from './CustomBadge';

class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: null,
            modalVisible: false,
            cancellationReason: ''
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

    componentDidUpdate(prevProps) {
        if (this.props.orderHistory !== prevProps.orderHistory) {
            this.fetchTheOrder();
        }
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
                status,
                paymentMethod,
                paymentStatus,
                createdAt,
                orderAudits,
                cancelReason
            } = this.state.order;

            return (
                <div className="order-detail-page inner-page">
                    <PageHeader>Chi tiết đơn hàng</PageHeader>
                    <div className="see-order-history">
                        <Link to="/orders">{'<'}&nbsp;&nbsp;Xem Lịch sử mua hàng</Link>
                    </div>
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
                            <Card.Content className="order-status-header">
                                <Card.Header>Trạng thái đơn hàng</Card.Header>
                                <CustomBadge
                                    text={OrderStatus[status].title}
                                    backgroundColor={OrderStatus[status].indicatorColor}
                                />
                            </Card.Content>
                            <Card.Content>
                                <OrderProgressBar orderStatus={status} orderProgress={orderAudits} />
                                <div className="order-step-details">
                                    {[...orderAudits].reverse().map((item, index) => (
                                        <div
                                            key={`orderStepDetail_${index}`}
                                            className={`order-step-detail${item.status === OrderStatus.CANCELED.value ? ' cancelled' : ''}`}
                                        >
                                            <span>{OrderStatus[item.status].progressTitle}: <b>{getDateTimeFromMilliseconds(item.created_at)}</b></span>
                                            {item.status === OrderStatus.CANCELED.value && cancelReason
                                                ? <span>&nbsp;(Lý do: {cancelReason})</span>
                                                : null
                                            }
                                        </div>
                                    ))}
                                </div>
                            </Card.Content>
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
                    {status !== OrderStatus.COMPLETED.value && status !== OrderStatus.CANCELED.value
                        ? <div className="bottom-action">
                            <Button
                                className="cancel-order-btn"
                                disabled={
                                    typeof this.props.userId !== 'number'
                                    || (status !== OrderStatus.NEW.value && status !== OrderStatus.RECEIVED.value)
                                }
                                color={status === OrderStatus.NEW.value || status === OrderStatus.RECEIVED.value
                                    ? 'red'
                                    : 'grey'
                                }
                                content="Huỷ đơn hàng"
                                onClick={() => this.setState({ modalVisible: true })}
                            />
                            {status !== OrderStatus.NEW.value && status !== OrderStatus.RECEIVED.value
                                ? <div className="cancellation-description">
                                    Không thể huỷ đơn hàng sau khi đơn hàng đã được xác nhận.
                                </div>
                                : null
                            }
                        </div>
                        : null
                    }
                    <Modal
                        className="custom-modal"
                        closeIcon={true}
                        open={this.state.modalVisible}
                        onClose={() => this.setState({ modalVisible: false, cancellationReason: '' })}
                        onOpen={() => this.setState({ modalVisible: true })}
                    >
                        <Modal.Header>Huỷ đơn hàng</Modal.Header>
                        <Modal.Content>
                            <div className="cancellation-modal">
                                <div className="message">Vui lòng cho biết lý do huỷ đơn:</div>
                                <Select
                                    className="reason-select"
                                    placeholder="Chọn một lý do..."
                                    options={[
                                        {
                                            key: 1,
                                            value: 'Muốn đổi món',
                                            text: 'Muốn đổi món'
                                        },
                                        {
                                            key: 2,
                                            value: 'Không thể nhận hàng vào lúc này',
                                            text: 'Không thể nhận hàng vào lúc này'
                                        },
                                        {
                                            key: 3,
                                            value: 'Không còn muốn đặt nữa',
                                            text: 'Không còn muốn đặt nữa'
                                        },
                                        {
                                            key: 4,
                                            value: 'Khác',
                                            text: 'Khác'
                                        }
                                    ]}
                                    onChange={(event, data) => this.setState({ cancellationReason: data.value })}
                                />
                            </div>
                        </Modal.Content>
                        <Modal.Actions className="text-center">
                            <Button
                                negative
                                disabled={!this.state.cancellationReason}
                                content="Huỷ đơn hàng"
                                onClick={() => {
                                    if (
                                        typeof this.props.userId === 'number'
                                        && (status === OrderStatus.NEW.value || status === OrderStatus.RECEIVED.value)
                                        && this.state.cancellationReason
                                    ) {
                                        this.props.showSpinner();
                                        updateOrder({
                                            transactionNo,
                                            status: OrderStatus.CANCELED.value,
                                            cancelReason: this.state.cancellationReason
                                        })
                                            .then(() => console.log(`Successfully cancelled order ${transactionNo}.`))
                                            .catch(error => console.error(error))
                                            .finally(this.props.hideSpinner);
                                    }
                                    this.setState({ modalVisible: false, cancellationReason: '' });
                                }}
                            />
                        </Modal.Actions>
                    </Modal>
                </div>
            );
        }

        return null;
    }
}

const mapStateToProps = ({ authentication, orderHistory }) => ({
    userId: authentication.login.status === LoginStatus.LOGGED_IN ? authentication.user.data.id : null,
    orderHistory
});

const mapDispatchToProps = {
    showCartButton,
    hideCartButton,
    showSpinner,
    hideSpinner
};

const ConnectedOrderDetails = connect(mapStateToProps, mapDispatchToProps)(OrderDetails);

export default ConnectedOrderDetails;
