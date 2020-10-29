import { cart as initialCart } from '../store/initialState';
import { RETRIEVE_CART_FROM_STORAGE } from './types';

const retrieveCartFromStorage = () => {
    const retrievedJson = window.localStorage.getItem('storedCart');
    const retrieveCart = retrievedJson ? JSON.parse(retrievedJson) : initialCart;
    return {
        type: RETRIEVE_CART_FROM_STORAGE,
        cart: retrieveCart
    };
};

export default retrieveCartFromStorage;
