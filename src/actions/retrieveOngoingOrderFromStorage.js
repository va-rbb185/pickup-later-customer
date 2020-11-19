import { RETRIEVE_ONGOING_ORDER_FROM_STORAGE } from './types';

const retrieveOngoingOrderFromStorage = () => {
    let ongoingOrder = null;
    const retrievedJson = window.localStorage.getItem('storedOngoingOrder');

    if (retrievedJson) {
        ongoingOrder = JSON.parse(retrievedJson);
    }

    return {
        type: RETRIEVE_ONGOING_ORDER_FROM_STORAGE,
        ongoingOrder
    };
};

export default retrieveOngoingOrderFromStorage;
