import { useEffect } from 'react';
import { connect } from 'react-redux';
import mqttConnection from '../mqtt';
import { LoginStatus, OrderStatus } from '../enums';
import { fetchOrderHistory, deleteOrderConfirmation } from '../actions';

const MQTTConnector = ({ userId, fetchOrderHistory, deleteOrderConfirmation }) => {
    const onMessageArrived = message => {
        console.info('Message arrived: ' + message.payloadString);
        const action = JSON.parse(message.payloadString);
        if (action.type === 'UPDATE_ORDER_STATUS' && typeof userId === 'number') {
            fetchOrderHistory(userId, {
                page: 1,
                perPage: 100
            });
            if (action.payload.orderStatus.status === OrderStatus.COMPLETED.value) {
                deleteOrderConfirmation();
            }
        }
    };

    const onConnectionLost = response => {
        if (response.errorCode !== 0) {
            console.warn('MQTT connection lost: ' + response.errorMessage);
        }
    };

    useEffect(() => {
        mqttConnection.establish({
            onMessageArrived: null,
            onConnectionLost: onConnectionLost
        });
        return () => {
            /* Disconnect MQTT client from the broker when component unmounts */
            mqttConnection.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (window.mqttClient) {
            window.mqttClient.onMessageArrived = onMessageArrived;
        }
    });

    return null;
};

const mapStateToProps = ({ authentication }) => ({
    userId: authentication.login.status === LoginStatus.LOGGED_IN ? authentication.user.data.id : null
});

const mapDispatchToProps = {
    fetchOrderHistory,
    deleteOrderConfirmation
};

const ConnectedMQTTConnector = connect(mapStateToProps, mapDispatchToProps)(MQTTConnector);

export default ConnectedMQTTConnector;
