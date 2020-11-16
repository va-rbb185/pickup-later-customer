import { RETRIEVE_CART_FROM_STORAGE } from './types';

const retrieveCartFromStorage = () => {
    let cart = {
        amount: 0,
        items: []
    };
    const retrievedJson = window.localStorage.getItem('storedCart');
    if (retrievedJson) {
        cart = JSON.parse(retrievedJson);
    }
    return {
        type: RETRIEVE_CART_FROM_STORAGE,
        cart
    };
};

export default retrieveCartFromStorage;
