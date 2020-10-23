import { cart as initialCart } from '../store/initialState';
import { RETRIEVE_CART_FROM_STORAGE } from './types';

export default () => {
    const retrievedCartJSON = localStorage.getItem('storedCart');
    const cart = retrievedCartJSON ? JSON.parse(retrievedCartJSON) : initialCart;
    return {
        type: RETRIEVE_CART_FROM_STORAGE,
        cart
    };
};
