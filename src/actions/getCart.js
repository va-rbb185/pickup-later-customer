import { getCart as getCartApi } from '../api';
import { GET_CART_SUCCESS, GET_CART_FAILURE } from './types';

const getCartSuccess = cart => ({
    type: GET_CART_SUCCESS,
    cart
});

const getCartFailure = error => ({
    type: GET_CART_FAILURE,
    error
});

const getCart = (cartNo, onCompletion) => dispatch => {
    getCartApi(cartNo)
        .then(response => {
            if (response.cart)
                dispatch(getCartSuccess(response.cart));
            else dispatch(getCartFailure(response));
        })
        .catch(error => dispatch(getCartFailure(error)))
        .finally(() => {
            if (typeof onCompletion === 'function') onCompletion();
        });
};

export default getCart;
