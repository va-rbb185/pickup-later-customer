import { useEffect } from 'react';
import { connect } from 'react-redux';
import mqttConnection from '../mqtt';
import { LoginStatus } from '../enums';
import { fetchOrderHistory } from '../actions';

const MQTTConnector = ({ userId, fetchOrderHistory }) => {
    useEffect(() => {
        /* Establish a connection to MQTT broker */
        mqttConnection.establish({
            onMessageArrived: message => {
                const action = JSON.parse(message.payloadString);
                const { type } = action;
                if (type === 'UPDATE_ORDER_STATUS' && userId !== -1) {
                    fetchOrderHistory(userId, {
                        page: 1,
                        perPage: 100
                    });
                }
            },
            onConnectionLost: response => {
                if (response.errorCode !== 0) {
                    console.warn('MQTT connection lost: ' + response.errorMessage);
                }
            }
        });

        return () => {
            /* Disconnect MQTT client when component unmounts */
            mqttConnection.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};

const mapStateToProps = ({ authentication }) => ({
    userId: authentication.login.status === LoginStatus.LOGGED_IN ? authentication.user.data.id : -1
});

const mapDispatchToProps = { fetchOrderHistory };

const ConnectedMQTTConnector = connect(mapStateToProps, mapDispatchToProps)(MQTTConnector);

export default ConnectedMQTTConnector;
