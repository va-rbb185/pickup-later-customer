import {
    getCart as getCartApi,
    createCart as createCartApi
} from '../api';
import { CREATE_CART_SUCCESS, CREATE_CART_FAILURE } from './types';

const createCartSuccess = cart => ({
    type: CREATE_CART_SUCCESS,
    cart
});

const createCartFailure = error => ({
    type: CREATE_CART_FAILURE,
    error
});

const createCart = (product, authentication, onCompletion, saveCartNo) => dispatch => {
    createCartApi({
        userId: authentication.user.data.id,
        userName: authentication.user.data.userName,
        phoneNumber: authentication.user.data.phoneNumber,
        cart: {
            amount: 1,
            items: [{
                quantity: 1,
                product
            }]
        }
    })
        .then(response => {
            if (response.cartNo) {
                if (typeof saveCartNo === 'function') saveCartNo(response.cartNo);
                return getCartApi(response.cartNo);
            }
            return null;
        })
        .then(response => {
            if (response && response.cart)
                dispatch(createCartSuccess(response.cart));
            else dispatch(createCartFailure(response));
        })
        .catch(error => dispatch(createCartFailure(error)))
        .finally(() => {
            if (typeof onCompletion === 'function') onCompletion();
        });
};

export default createCart;
