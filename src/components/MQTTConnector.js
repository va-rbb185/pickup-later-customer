import { useEffect } from 'react';
import { connect } from 'react-redux';
import mqttConnection from '../mqtt';
import { LoginStatus, OrderStatus } from '../enums';
import { fetchOrderHistory, deleteOrderConfirmation, getCart } from '../actions';

const MQTTConnector = ({ userId, fetchOrderHistory, deleteOrderConfirmation, getCart }) => {
    const onMessageArrived = message => {
        console.info('Message arrived: ' + message.payloadString, `userId=${userId}`);
        const action = JSON.parse(message.payloadString);
        const { type, payload } = action;

        if (type === 'UPDATE_ORDER_STATUS' && typeof userId === 'number') {
            fetchOrderHistory(userId, {
                page: 1,
                perPage: 100
            });
            if (payload.orderStatus.status === OrderStatus.COMPLETED.value || payload.orderStatus.status === OrderStatus.CANCELED.value) {
                deleteOrderConfirmation();
            }
        } else if (type === 'UPDATE_CART' && payload.cartNo) {
            console.log(payload.cartNo);
            getCart(payload.cartNo);
        }
    };

    useEffect(() => {
        mqttConnection.establish({
            onMessageArrived: onMessageArrived,
            onConnectionLost: response => {
                if (response.errorCode !== 0) {
                    console.warn('MQTT connection lost: ' + response.errorMessage);
                }
            }
        });
        return () => {
            /* Disconnect MQTT client from the broker when component unmounts */
            mqttConnection.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (typeof userId === 'number' && window.mqttClient) {
            window.mqttClient.onMessageArrived = onMessageArrived;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    return null;
};

const mapStateToProps = ({ authentication }) => ({
    userId: authentication.login.status === LoginStatus.LOGGED_IN ? authentication.user.data.id : null
});

const mapDispatchToProps = {
    fetchOrderHistory,
    deleteOrderConfirmation,
    getCart
};

const ConnectedMQTTConnector = connect(mapStateToProps, mapDispatchToProps)(MQTTConnector);

export default ConnectedMQTTConnector;
