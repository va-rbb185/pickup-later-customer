import {
    getCart as getCartApi,
    updateCart as updateCartApi
} from '../api';
import { UPDATE_CART_SUCCESS, UPDATE_CART_FAILURE } from './types';

const updateCartSuccess = cart => ({
    type: UPDATE_CART_SUCCESS,
    cart
});

const updateCartFailure = error => ({
    type: UPDATE_CART_FAILURE,
    error
});

const updateCart = (cartNo, cart, onCompletion) => dispatch => {
    updateCartApi(cartNo, { cart })
        .then(response => {
            if (response.cartNo) return getCartApi(response.cartNo);
            return null;
        })
        .then(response => {
            if (response && response.cart)
                dispatch(updateCartSuccess(response.cart));
            else dispatch(updateCartFailure(response));

        })
        .catch(error => dispatch(updateCartFailure(error)))
        .finally(() => {
            if (typeof onCompletion === 'function') onCompletion();
        });
};

export default updateCart;
