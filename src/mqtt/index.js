import { generateClientId } from '../helpers';
import mqttConfigurations from './mqttConfigurations';
import logMessages from './logMessages';

function establishConnection({ onMessageArrived, onConnectionLost }) {
    if (window.Paho) {
        const clientId = generateClientId(12);
        const client = new window.Paho.MQTT.Client(
            mqttConfigurations.HOST,
            mqttConfigurations.PORT,
            clientId
        );

        if (typeof onMessageArrived === 'function') {
            client.onMessageArrived = onMessageArrived;
        }

        if (typeof onConnectionLost === 'function') {
            client.onConnectionLost = onConnectionLost;
        }

        client.connect({
            userName: mqttConfigurations.USERNAME,
            password: mqttConfigurations.PASSWORD,
            onSuccess: () => {
                console.info(logMessages.SUCCESS);
                client.subscribe(mqttConfigurations.TOPIC);
            },
            onFailure: () => {
                console.error(logMessages.FAILURE);
            }
        });

        /* Attach the newly created MQTT client to
         * the global `window` object for later access to it */
        window.mqttClient = client;
    } else {
        throw new Error(logMessages.NOT_DEFINED);
    }
}

function closeConnection() {
    if (window.mqttClient && window.mqttClient.isConnected) {
        console.info(logMessages.CLOSING);
        window.mqttClient.disconnect();
    }
}

const mqttConnection = {
    establish: establishConnection,
    close: closeConnection
};

export default mqttConnection;
