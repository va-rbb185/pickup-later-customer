import React from 'react';
import { connect } from 'react-redux';
import { fetchOrder } from '../api';
import { formatPrice } from '../helpers';
import { showCartButton, hideCartButton } from '../actions';
import PageHeader from './PageHeader';

class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: null
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
            return (
                <div className="order-detail-page inner-page">
                    <PageHeader>Đơn hàng đang thực hiện</PageHeader>
                    <div className="order-details">
                        <Card fluid className="order-info">
                            <Card.Content>
                                <Card.Header>Thông tin đơn hàng</Card.Header>
                            </Card.Content>
                            <Card.Content>[Thông tin đơn hàng]</Card.Content>
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
                                    {/* {order.orderDetails.map(
                                        item => <OrderProductTile key={`orderProductTile_${item.product.id}`} item={item} />
                                    )} */}
                                </div>
                                <div className="summary">
                                    <div className="summary-entry">
                                        <div className="summary-title">Tổng tạm tính</div>
                                        <div className="summary-amount text-right">
                                            {formatPrice(order.totalAmount)}
                                        </div>
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>
                        <Card fluid className="payment-info">
                            <Card.Content>
                                <Card.Header>Thông tin thanh toán</Card.Header>
                            </Card.Content>
                            <Card.Content>[Thông tin thanh toán]</Card.Content>
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
