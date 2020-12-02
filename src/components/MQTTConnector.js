import { useEffect } from 'react';
// import { connect } from 'react-redux';
import mqttConnection from '../mqtt';

const MQTTConnector = () => {
    useEffect(() => {
        /* Establish a connection to MQTT broker */
        mqttConnection.establish({
            onMessageArrived: message => {
                const payload = JSON.parse(message.payloadString);
                console.info('Parsed object: ', payload);
            },
            onConnectionLost: response => {
                if (response.errorCode !== 0) {
                    console.warn('MQTT connection lost: ' + response.errorMessage);
                }
            }
        });

        return () => {
            /* Disconnect client upon component unmount */
            mqttConnection.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};

export default MQTTConnector;
