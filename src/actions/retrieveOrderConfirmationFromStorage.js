import { RETRIEVE_ORDER_CONFIRMATION_FROM_STORAGE } from './types';

const retrieveOrderConfirmationFromStorage = () => {
    let orderConfirmation = null;
    const retrievedJson = window.localStorage.getItem('storedOrderConfirmation');

    if (retrievedJson) {
        orderConfirmation = JSON.parse(retrievedJson);
    }

    return {
        type: RETRIEVE_ORDER_CONFIRMATION_FROM_STORAGE,
        orderConfirmation
    };
};

export default retrieveOrderConfirmationFromStorage;
