import { createOrder as createOrderApi } from '../api';
import {
    CREATE_ORDER_START,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE
} from './types';

const createOrderStart = () => ({ type: CREATE_ORDER_START });

const createOrderSuccess = (response) => ({
    type: CREATE_ORDER_SUCCESS,
    orderConfirmation: response
});

const createOrderFailure = (error) => ({
    type: CREATE_ORDER_FAILURE,
    error
});

const createOrder = order => dispatch => {
    console.info('Order placement started.');
    dispatch(createOrderStart());

    createOrderApi(order)
        .then(response => {
            const action = createOrderSuccess(response);
            console.info('Order placement succeeded. Updated state:', action.orderConfirmation);
            dispatch(action);
        })
        .catch(error => {
            const action = createOrderFailure(error);
            console.error('Order placement failed.', action.error);
            dispatch(action);
        });
};

export default createOrder;
